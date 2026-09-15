import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientError, apiGet, apiGetPaginated, configureApiClient } from "../src/api/client";
import { session, type TokenStorage } from "../src/api/session";

const BASE = "http://api.test/api/v1";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const rejection = (promise: Promise<unknown>) =>
  promise.then(
    () => {
      throw new Error("Expected the request to reject.");
    },
    (e: ApiClientError) => e
  );

const ok = (data: unknown, meta?: unknown) => json({ success: true, data, meta, requestId: "r" });
const fail = (status: number, code: string, message: string, details: unknown[] = []) =>
  json({ success: false, error: { code, message, details }, requestId: "r" }, status);

function memoryStorage(initial: { accessToken: string; refreshToken: string } | null = null): TokenStorage & {
  saved: unknown[];
  cleared: number;
} {
  const store = { saved: [] as unknown[], cleared: 0 };
  return {
    ...store,
    load: () => initial,
    save(tokens) {
      this.saved.push(tokens);
    },
    clear() {
      this.cleared += 1;
    },
  };
}

let fetchMock: ReturnType<typeof vi.fn>;
let onError: ReturnType<typeof vi.fn>;
let onSessionExpired: ReturnType<typeof vi.fn>;

beforeEach(async () => {
  fetchMock = vi.fn();
  onError = vi.fn();
  onSessionExpired = vi.fn();
  configureApiClient({
    baseUrl: BASE,
    fetch: fetchMock as unknown as typeof fetch,
    onError,
    onSessionExpired,
    headers: { "X-Client-Platform": "test" },
  });
  await session.hydrate(memoryStorage({ accessToken: "old-access", refreshToken: "refresh-1" }));
});

describe("api client", () => {
  it("unwraps data and sends auth + platform headers", async () => {
    fetchMock.mockResolvedValueOnce(ok({ id: "u1" }));

    await expect(apiGet("/auth/me", "old-access")).resolves.toEqual({ id: "u1" });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${BASE}/auth/me`);
    expect(init.headers).toMatchObject({ Authorization: "Bearer old-access", "X-Client-Platform": "test" });
  });

  it("surfaces the first validation detail message", async () => {
    fetchMock.mockResolvedValueOnce(
      fail(422, "VALIDATION_ERROR", "Validation failed.", [{ message: "You can select up to 10 cities." }])
    );

    const error = await rejection(apiGet("/campaigns", "old-access"));
    expect(error).toBeInstanceOf(ApiClientError);
    expect(error.message).toBe("You can select up to 10 cities.");
    expect(onError).toHaveBeenCalledOnce();
  });

  it("refreshes once for concurrent 401s and retries with the new token", async () => {
    fetchMock.mockImplementation(async (url: string, init: RequestInit) => {
      if (url.endsWith("/auth/refresh")) return ok({ accessToken: "new-access", refreshToken: "refresh-2" });
      const auth = (init.headers as Record<string, string>).Authorization;
      return auth === "Bearer new-access" ? ok({ path: url }) : fail(401, "UNAUTHORIZED", "expired");
    });

    const [a, b] = await Promise.all([apiGet("/a", "old-access"), apiGet("/b", "old-access")]);

    expect(a).toEqual({ path: `${BASE}/a` });
    expect(b).toEqual({ path: `${BASE}/b` });
    expect(fetchMock.mock.calls.filter(([url]) => url.endsWith("/auth/refresh"))).toHaveLength(1);
    expect(session.getState()).toMatchObject({ accessToken: "new-access", refreshToken: "refresh-2" });
    expect(onError).not.toHaveBeenCalled();
  });

  it("clears the session silently when refresh fails", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.endsWith("/auth/refresh") ? fail(401, "INVALID_REFRESH", "nope") : fail(401, "UNAUTHORIZED", "expired")
    );

    const error = await rejection(apiGet("/a", "old-access"));

    expect(error.code).toBe("SESSION_EXPIRED");
    expect(error.silent).toBe(true);
    expect(onSessionExpired).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
    expect(session.getState().accessToken).toBeNull();
  });

  it("does not attempt a refresh for unauthenticated requests", async () => {
    fetchMock.mockResolvedValueOnce(fail(401, "INVALID_CREDENTIALS", "Wrong password"));

    const error = await rejection(apiGet("/auth/login"));

    expect(error.code).toBe("INVALID_CREDENTIALS");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("returns pagination meta from the envelope", async () => {
    fetchMock.mockResolvedValueOnce(ok([{ id: 1 }], { page: 2, limit: 20, total: 41 }));

    await expect(apiGetPaginated("/campaigns?page=2", "old-access")).resolves.toEqual({
      rows: [{ id: 1 }],
      meta: { page: 2, limit: 20, total: 41 },
    });
  });
});

describe("session", () => {
  it("hydrates from storage and persists changes", async () => {
    const storage = memoryStorage({ accessToken: "a", refreshToken: "r" });
    await session.hydrate(storage);
    expect(session.getState()).toEqual({ accessToken: "a", refreshToken: "r", hydrated: true });

    const listener = vi.fn();
    const unsubscribe = session.subscribe(listener);
    await session.setTokens({ accessToken: "a2", refreshToken: "r2" });
    await session.clear();
    unsubscribe();

    expect(storage.saved).toEqual([{ accessToken: "a2", refreshToken: "r2" }]);
    expect(storage.cleared).toBe(1);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
