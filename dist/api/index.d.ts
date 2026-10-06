export { A as ApiClientConfig, a as ApiClientError, P as PaginationMeta, b as apiDelete, c as apiFetchRaw, d as apiGet, e as apiGetPaginated, f as apiPatch, g as apiPost, h as apiPut, i as apiRequest, j as apiUpload, k as buildQuery, l as configureApiClient, m as getApiBaseUrl } from '../client-DE_OHF35.js';
import { T as TokenPair } from '../auth-CNLc-JqU.js';
import { QueryClient } from '@tanstack/react-query';

interface TokenStorage {
    load(): Promise<TokenPair | null> | TokenPair | null;
    save(tokens: TokenPair): Promise<void> | void;
    clear(): Promise<void> | void;
}
interface SessionState {
    accessToken: string | null;
    refreshToken: string | null;
    /** False until hydrate() has read persisted tokens — gate auth redirects on this. */
    hydrated: boolean;
}
declare const session: {
    getState: () => SessionState;
    subscribe(listener: () => void): () => void;
    hydrate(tokenStorage: TokenStorage): Promise<void>;
    setTokens(tokens: TokenPair): Promise<void>;
    clear(): Promise<void>;
};
declare const getAccessToken: () => string | null;
declare function useSession<T>(selector: (s: SessionState) => T): T;
declare const useHasSession: () => boolean;

interface MutationToastMeta {
    loading?: string;
    success?: string | ((data: unknown, variables: unknown) => string);
    error?: string | ((error: unknown, variables: unknown) => string);
}
declare module "@tanstack/react-query" {
    interface Register {
        mutationMeta: MutationToastMeta;
    }
}
interface ToastAdapter {
    loading?: (message: string) => string | number;
    success: (message: string, id?: string | number) => void;
    error: (message: string, id?: string | number) => void;
}
declare function createQueryClient(toast?: ToastAdapter, overrides?: {
    staleTime?: number;
    retry?: number;
}): QueryClient;

export { type MutationToastMeta, type SessionState, type ToastAdapter, type TokenStorage, createQueryClient, getAccessToken, session, useHasSession, useSession };
