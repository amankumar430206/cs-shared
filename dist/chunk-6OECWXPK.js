import { QueryClient, MutationCache } from '@tanstack/react-query';

// src/api/queryClient.ts
function resolveMessage(value, args) {
  return typeof value === "function" ? value(...args) : value;
}
function createQueryClient(toast, overrides = {}) {
  const pendingToastIds = /* @__PURE__ */ new WeakMap();
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: overrides.retry ?? 1,
        staleTime: overrides.staleTime ?? 3e4,
        refetchOnWindowFocus: false
      }
    },
    mutationCache: new MutationCache({
      onMutate: (_variables, mutation) => {
        const meta = mutation.meta;
        if (meta?.loading && toast?.loading) pendingToastIds.set(mutation, toast.loading(meta.loading));
      },
      onSuccess: (data, variables, _onMutateResult, mutation) => {
        const meta = mutation.meta;
        const message = resolveMessage(meta?.success, [data, variables]);
        if (message) toast?.success(message, pendingToastIds.get(mutation));
      },
      onError: (error, variables, _onMutateResult, mutation) => {
        const meta = mutation.meta;
        const message = resolveMessage(meta?.error, [error, variables]);
        if (message) toast?.error(message, pendingToastIds.get(mutation));
      },
      onSettled: (_data, _error, _variables, _onMutateResult, mutation) => {
        pendingToastIds.delete(mutation);
      }
    })
  });
}

// src/api/device.ts
function generateDeviceId() {
  const c = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rand()}-${rand()}${rand()}`;
}

export { createQueryClient, generateDeviceId };
