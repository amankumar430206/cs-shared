// Platform-neutral port of cs-web/src/lib/apiClient.ts. Every cs-api response uses the envelope:
//   success: { success: true, data, meta, requestId }
//   error:   { success: false, error: { code, message, details }, requestId }
// UI side effects (toasts, navigation) are injected via configureApiClient().
import { session } from "./session";

export interface ApiClientConfig {
  baseUrl: string;
  /** Called for every failed request except a silent session-expiry. */
  onError?: (error: unknown) => void;
  /** Called once refresh fails; the session is already cleared. */
  onSessionExpired?: () => void;
  /** Extra headers on every request, e.g. X-Client-Platform / X-App-Version. */
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

let config: ApiClientConfig | null = null;

export function configureApiClient(next: ApiClientConfig) {
  config = next;
}

function getConfig(): ApiClientConfig {
  if (!config) throw new Error("configureApiClient() must be called before making API requests.");
  return config;
}

export const getApiBaseUrl = () => getConfig().baseUrl;

const doFetch: typeof fetch = (input, init) => (getConfig().fetch ?? fetch)(input, init);

export class ApiClientError extends Error {
  code: string;
  status: number;
  details: unknown[];
  silent?: boolean;

  constructor(status: number, code: string, message: string, details: unknown[] = []) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
  requestId: string;
}

interface ApiErrorEnvelope {
  success: false;
  error: { code: string; message: string; details: unknown[] };
  requestId: string;
}

type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;

function reportApiError(error: unknown) {
  if (error instanceof ApiClientError && error.silent) return;
  getConfig().onError?.(error);
}

function baseHeaders(token: string | null | undefined, json: boolean): Record<string, string> {
  const headers: Record<string, string> = { ...(getConfig().headers ?? {}) };
  if (json) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// Concurrent 401s share one in-flight refresh instead of racing their own.
let refreshPromise: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken } = session.getState();
      if (!refreshToken) return false;
      try {
        const res = await doFetch(`${getApiBaseUrl()}/auth/refresh`, {
          method: "POST",
          headers: baseHeaders(null, true),
          body: JSON.stringify({ refreshToken }),
        });
        const envelope: ApiEnvelope<{ accessToken: string; refreshToken: string }> = await res.json();
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

function forceReauth(): never {
  void session.clear();
  getConfig().onSessionExpired?.();
  const error = new ApiClientError(401, "SESSION_EXPIRED", "Your session has expired. Please log in again.");
  error.silent = true;
  throw error;
}

// Only requests that sent a token are eligible for refresh-and-retry-once, which
// naturally excludes /auth/login, /auth/register, /auth/refresh itself, etc.
async function withSessionRefresh<T>(
  accessToken: string | null | undefined,
  run: (token: string | null | undefined) => Promise<T>
): Promise<T> {
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

async function parseFullEnvelope<T>(res: Response): Promise<ApiSuccessEnvelope<T>> {
  let envelope: ApiEnvelope<T>;
  try {
    envelope = await res.json();
  } catch {
    throw new ApiClientError(res.status, "INVALID_RESPONSE", "The server returned an unexpected response.");
  }

  if (!envelope.success) {
    // validate middleware's top-level message is always the generic "Validation failed.";
    // the readable per-field message only lives in details[0].message.
    const details = envelope.error.details;
    const firstDetailMessage =
      envelope.error.code === "VALIDATION_ERROR" &&
      Array.isArray(details) &&
      details.length > 0 &&
      typeof (details[0] as { message?: unknown })?.message === "string"
        ? (details[0] as { message: string }).message
        : undefined;
    throw new ApiClientError(res.status, envelope.error.code, firstDetailMessage ?? envelope.error.message, details);
  }

  return envelope;
}

async function runReported<T>(accessToken: string | null | undefined, run: (token: string | null | undefined) => Promise<T>) {
  try {
    return await withSessionRefresh(accessToken, run);
  } catch (error) {
    reportApiError(error);
    throw error;
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function apiRequest<T>(
  path: string,
  options: { method?: Method; body?: unknown; accessToken?: string | null } = {}
): Promise<T> {
  const { method = "GET", body, accessToken } = options;
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers: baseHeaders(token, true),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return (await parseFullEnvelope<T>(res)).data;
  });
}

export const apiGet = <T>(path: string, accessToken?: string | null) => apiRequest<T>(path, { method: "GET", accessToken });

export const apiPost = <T>(path: string, body?: unknown, accessToken?: string | null) =>
  apiRequest<T>(path, { method: "POST", body, accessToken });

export const apiPut = <T>(path: string, body?: unknown, accessToken?: string | null) =>
  apiRequest<T>(path, { method: "PUT", body, accessToken });

export const apiPatch = <T>(path: string, body?: unknown, accessToken?: string | null) =>
  apiRequest<T>(path, { method: "PATCH", body, accessToken });

export const apiDelete = <T>(path: string, accessToken?: string | null) =>
  apiRequest<T>(path, { method: "DELETE", accessToken });

// Pagination lives in the envelope's top-level `meta`, which apiGet drops.
export function apiGetPaginated<T>(path: string, accessToken?: string | null): Promise<{ rows: T[]; meta: PaginationMeta }> {
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, { method: "GET", headers: baseHeaders(token, true) });
    const envelope = await parseFullEnvelope<T[]>(res);
    return {
      rows: envelope.data,
      meta: envelope.meta ?? { page: 1, limit: envelope.data.length, total: envelope.data.length },
    };
  });
}

// No Content-Type: the runtime sets the multipart boundary. On React Native, append
// files as `formData.append("file", { uri, name, type } as unknown as Blob)`.
export function apiUpload<T>(path: string, formData: FormData, accessToken?: string | null): Promise<T> {
  return runReported(accessToken, async (token) => {
    const res = await doFetch(`${getApiBaseUrl()}${path}`, {
      method: "POST",
      headers: baseHeaders(token, false),
      body: formData,
    });
    return (await parseFullEnvelope<T>(res)).data;
  });
}

/** Unwrapped fetch against the API base for callers that treat non-2xx as data (no error reporting, no refresh). */
export function apiFetchRaw(path: string, accessToken?: string | null, init: RequestInit = {}) {
  return doFetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: { ...baseHeaders(accessToken, false), ...((init.headers as Record<string, string>) ?? {}) },
  });
}

export function buildQuery(params: Record<string, string | number | boolean | undefined | null>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
