import { describe, expect, it } from "vitest";
import { ApiClientError } from "../src/api/client";
import { shouldRetryQuery } from "../src/api/queryClient";

describe("shouldRetryQuery", () => {
  it("never retries a client error, rate limits included", () => {
    expect(shouldRetryQuery(0, new ApiClientError(429, "TOO_MANY_REQUESTS", "slow down"), 1)).toBe(false);
    expect(shouldRetryQuery(0, new ApiClientError(403, "FORBIDDEN", "no"), 1)).toBe(false);
  });
  it("retries a server or network failure up to the limit", () => {
    expect(shouldRetryQuery(0, new ApiClientError(503, "UNAVAILABLE", "x"), 1)).toBe(true);
    expect(shouldRetryQuery(1, new ApiClientError(503, "UNAVAILABLE", "x"), 1)).toBe(false);
    expect(shouldRetryQuery(0, new TypeError("Network request failed"), 1)).toBe(true);
  });
});
