import { useSyncExternalStore } from 'react';

// src/api/session.ts
var state = { accessToken: null, refreshToken: null, hydrated: false };
var storage = null;
var listeners = /* @__PURE__ */ new Set();
function setState(next) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}
async function persist(action) {
  try {
    await action();
  } catch {
  }
}
var session = {
  getState: () => state,
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  async hydrate(tokenStorage) {
    storage = tokenStorage;
    let tokens = null;
    try {
      tokens = await tokenStorage.load();
    } catch {
      tokens = null;
    }
    setState({ accessToken: tokens?.accessToken ?? null, refreshToken: tokens?.refreshToken ?? null, hydrated: true });
  },
  setTokens(tokens) {
    setState({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    return persist(() => storage?.save(tokens));
  },
  clear() {
    setState({ accessToken: null, refreshToken: null });
    return persist(() => storage?.clear());
  }
};
var getAccessToken = () => state.accessToken;
function useSession(selector) {
  return useSyncExternalStore(
    session.subscribe,
    () => selector(state),
    () => selector(state)
  );
}
var useHasSession = () => useSession((s) => !!s.accessToken);

// src/api/client.ts
var config = null;
function configureApiClient(next) {
  config = next;
}
function getConfig() {
  if (!config) throw new Error("configureApiClient() must be called before making API requests.");
  return config;
}
var getApiBaseUrl = () => getConfig().baseUrl;
var doFetch = (input, init) => (getConfig().fetch ?? fetch)(input, init);
var ApiClientError = class extends Error {
  constructor(status, code, message, details = []) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
};
function reportApiError(error) {
  if (error instanceof ApiClientError && error.silent) return;
  getConfig().onError?.(error);
}
function baseHeaders(token, json) {
  const headers = { ...getConfig().headers ?? {} };
  if (json) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
var refreshPromise = null;
async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken } = session.getState();
      if (!refreshToken) return false;
      try {
        const res = await doFetch(`${getApiBaseUrl()}/auth/refresh`, {
          method: "POST",
          headers: baseHeaders(null, true),
          body: JSON.stringify({ refreshToken })
        });
        const envelope = await res.json();
        if (!envelope.success) return false;
        await session.setTokens(envelope.data);
        return true;
      } catch {
        return false;
      }
    })();
  }
  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}
function forceReauth() {
  void session.clear();
  getConfig().onSessionExpired?.();
  const error = new ApiClientError(401, "SESSION_EXPIRED", "Your session has expired. Please log in again.");
  error.silent = true;
  throw error;
}
async function withSessionRefresh(accessToken, run) {
  try {
    return await run(accessToken);
  } catch (error) {
    const isExpiredToken = error instanceof ApiClientError && error.status === 401;
    if (!isExpiredToken || !accessToken) throw error;
    const refreshed = await refreshSession();
    if (!refreshed) forceReauth();
    return run(session.getState().accessToken);
  }
}
async function parseFullEnvelope(res) {
  let envelope;
  try {
    envelope = await res.json();
  } catch {
    throw new ApiClientError(res.status, "INVALID_RESPONSE", "The server returned an unexpected response.");
  }
  if (!envelope.success) {
    const details = envelope.error.details;
    const firstDetailMessage = envelope.error.code === "VALIDATION_ERROR" && Array.isArray(details) && details.length > 0 && typeof details[0]?.message === "string" ? details[0].message : void 0;
    throw new ApiClientError(res.status, envelope.error.code, firstDetailMessage ?? envelope.error.message, details);
  }
  return envelope;
}
async function runReported(accessToken, run) {
  try {
    return await withSessionRefresh(accessToken, run);
  } catch (error) {
    reportApiError(error);
    throw error;
  }
}
function apiRequest(path, options = {}) {
  const { method = "GET", body, accessToken } = options;
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers: baseHeaders(token, true),
      body: body !== void 0 ? JSON.stringify(body) : void 0
    });
    return (await parseFullEnvelope(res)).data;
  });
}
var apiGet = (path, accessToken) => apiRequest(path, { method: "GET", accessToken });
var apiPost = (path, body, accessToken) => apiRequest(path, { method: "POST", body, accessToken });
var apiPut = (path, body, accessToken) => apiRequest(path, { method: "PUT", body, accessToken });
var apiPatch = (path, body, accessToken) => apiRequest(path, { method: "PATCH", body, accessToken });
var apiDelete = (path, accessToken) => apiRequest(path, { method: "DELETE", accessToken });
function apiGetPaginated(path, accessToken) {
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, { method: "GET", headers: baseHeaders(token, true) });
    const envelope = await parseFullEnvelope(res);
    return {
      rows: envelope.data,
      meta: envelope.meta ?? { page: 1, limit: envelope.data.length, total: envelope.data.length }
    };
  });
}
function apiUpload(path, formData, accessToken) {
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, {
      method: "POST",
      headers: baseHeaders(token, false),
      body: formData
    });
    return (await parseFullEnvelope(res)).data;
  });
}
function apiFetchRaw(path, accessToken, init = {}) {
  return doFetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: { ...baseHeaders(accessToken, false), ...init.headers ?? {} }
  });
}
function buildQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== null && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export { ApiClientError, apiDelete, apiFetchRaw, apiGet, apiGetPaginated, apiPatch, apiPost, apiPut, apiRequest, apiUpload, buildQuery, configureApiClient, getAccessToken, getApiBaseUrl, session, useHasSession, useSession };
