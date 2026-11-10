import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientError, apiRequest, configureApiClient } from "../src/api/client";

const fail = (status: number) =>
  new Response(JSON.stringify({ success: false, error: { code: "X", message: "Nope", details: [] }, requestId: "r" }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

let onError: ReturnType<typeof vi.fn>;

beforeEach(() => {
  onError = vi.fn();
  configureApiClient({ baseUrl: "http://api.test/api/v1", fetch: vi.fn().mockResolvedValue(fail(409)) as unknown as typeof fetch, onError });
});

describe("apiRequest silent", () => {
  it("still rejects but does not report the error to the app (autosave, hints)", async () => {
    await expect(apiRequest("/kyc/draft/me", { method: "PUT", body: {}, silent: true })).rejects.toBeInstanceOf(ApiClientError);
    expect(onError).not.toHaveBeenCalled();
  });

  it("reports the error as before when not silent", async () => {
    await expect(apiRequest("/kyc/draft/me", { method: "PUT", body: {} })).rejects.toBeInstanceOf(ApiClientError);
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
