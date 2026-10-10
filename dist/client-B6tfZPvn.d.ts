interface ApiClientConfig {
    baseUrl: string;
    /** Called for every failed request except a silent session-expiry. */
    onError?: (error: unknown) => void;
    /** Called once refresh fails; the session is already cleared. */
    onSessionExpired?: () => void;
    /** Extra headers on every request, e.g. X-Client-Platform / X-App-Version. */
    headers?: Record<string, string>;
    fetch?: typeof fetch;
    /** Used by apiUpload only. React Native + Expo's fetch rejects `{ uri, name, type }` file parts, so mobile supplies an XHR-based one. */
    uploadFetch?: typeof fetch;
}
declare function configureApiClient(next: ApiClientConfig): void;
declare const getApiBaseUrl: () => string;
declare class ApiClientError extends Error {
    code: string;
    status: number;
    details: unknown[];
    silent?: boolean;
    constructor(status: number, code: string, message: string, details?: unknown[]);
}
interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
}
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
declare function apiRequest<T>(path: string, options?: {
    method?: Method;
    body?: unknown;
    accessToken?: string | null;
}): Promise<T>;
declare const apiGet: <T>(path: string, accessToken?: string | null) => Promise<T>;
declare const apiPost: <T>(path: string, body?: unknown, accessToken?: string | null) => Promise<T>;
declare const apiPut: <T>(path: string, body?: unknown, accessToken?: string | null) => Promise<T>;
declare const apiPatch: <T>(path: string, body?: unknown, accessToken?: string | null) => Promise<T>;
declare const apiDelete: <T>(path: string, accessToken?: string | null) => Promise<T>;
declare function apiGetPaginated<T>(path: string, accessToken?: string | null): Promise<{
    rows: T[];
    meta: PaginationMeta;
}>;
declare function apiUpload<T>(path: string, formData: FormData, accessToken?: string | null): Promise<T>;
/** Unwrapped fetch against the API base for callers that treat non-2xx as data (no error reporting, no refresh). */
declare function apiFetchRaw(path: string, accessToken?: string | null, init?: RequestInit): Promise<Response>;
declare function buildQuery(params: Record<string, string | number | boolean | undefined | null>): string;

export { type ApiClientConfig as A, type PaginationMeta as P, ApiClientError as a, apiDelete as b, apiFetchRaw as c, apiGet as d, apiGetPaginated as e, apiPatch as f, apiPost as g, apiPut as h, apiRequest as i, apiUpload as j, buildQuery as k, configureApiClient as l, getApiBaseUrl as m };
