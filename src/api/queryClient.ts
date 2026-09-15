import { MutationCache, QueryClient } from "@tanstack/react-query";

// Opt-in per mutation via `meta.toast`-style fields; the platform supplies how a toast is shown.
export interface MutationToastMeta {
  loading?: string;
  success?: string | ((data: unknown, variables: unknown) => string);
  error?: string | ((error: unknown, variables: unknown) => string);
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: MutationToastMeta;
  }
}

export interface ToastAdapter {
  loading?: (message: string) => string | number;
  success: (message: string, id?: string | number) => void;
  error: (message: string, id?: string | number) => void;
}

function resolveMessage<T extends unknown[]>(value: string | ((...args: T) => string) | undefined, args: T) {
  return typeof value === "function" ? value(...args) : value;
}

export function createQueryClient(toast?: ToastAdapter, overrides: { staleTime?: number; retry?: number } = {}) {
  const pendingToastIds = new WeakMap<object, string | number>();

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: overrides.retry ?? 1,
        staleTime: overrides.staleTime ?? 30_000,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onMutate: (_variables, mutation) => {
        const meta = mutation.meta as MutationToastMeta | undefined;
        if (meta?.loading && toast?.loading) pendingToastIds.set(mutation, toast.loading(meta.loading));
      },
      onSuccess: (data, variables, _onMutateResult, mutation) => {
        const meta = mutation.meta as MutationToastMeta | undefined;
        const message = resolveMessage(meta?.success, [data, variables]);
        if (message) toast?.success(message, pendingToastIds.get(mutation));
      },
      onError: (error, variables, _onMutateResult, mutation) => {
        const meta = mutation.meta as MutationToastMeta | undefined;
        const message = resolveMessage(meta?.error, [error, variables]);
        if (message) toast?.error(message, pendingToastIds.get(mutation));
      },
      onSettled: (_data, _error, _variables, _onMutateResult, mutation) => {
        pendingToastIds.delete(mutation);
      },
    }),
  });
}
