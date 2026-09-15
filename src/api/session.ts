import { useSyncExternalStore } from "react";
import type { TokenPair } from "../types/auth";

// Platform supplies persistence: localStorage on web, SecureStore on native.
export interface TokenStorage {
  load(): Promise<TokenPair | null> | TokenPair | null;
  save(tokens: TokenPair): Promise<void> | void;
  clear(): Promise<void> | void;
}

export interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  /** False until hydrate() has read persisted tokens — gate auth redirects on this. */
  hydrated: boolean;
}

let state: SessionState = { accessToken: null, refreshToken: null, hydrated: false };
let storage: TokenStorage | null = null;
const listeners = new Set<() => void>();

function setState(next: Partial<SessionState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

async function persist(action: () => Promise<void> | void | undefined) {
  try {
    await action();
  } catch {
    // In-memory session stays authoritative for this run; a failed write only
    // means the user may need to log in again after a restart.
  }
}

export const session = {
  getState: () => state,

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  async hydrate(tokenStorage: TokenStorage) {
    storage = tokenStorage;
    let tokens: TokenPair | null = null;
    try {
      tokens = await tokenStorage.load();
    } catch {
      tokens = null;
    }
    setState({ accessToken: tokens?.accessToken ?? null, refreshToken: tokens?.refreshToken ?? null, hydrated: true });
  },

  setTokens(tokens: TokenPair) {
    setState({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    return persist(() => storage?.save(tokens));
  },

  clear() {
    setState({ accessToken: null, refreshToken: null });
    return persist(() => storage?.clear());
  },
};

export const getAccessToken = () => state.accessToken;

export function useSession<T>(selector: (s: SessionState) => T): T {
  return useSyncExternalStore(
    session.subscribe,
    () => selector(state),
    () => selector(state)
  );
}

export const useHasSession = () => useSession((s) => !!s.accessToken);
