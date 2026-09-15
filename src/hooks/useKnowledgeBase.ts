import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiPost, apiPut } from "../api/client";
import type { KbArticle, KbCategory } from "../types/knowledgeBase";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export interface KbFilters {
  category?: KbCategory;
  search?: string;
}

export function useKbArticlesQuery(page: number, filters: KbFilters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["knowledge-base", page, filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (filters.category) query.set("category", filters.category);
      if (filters.search) query.set("search", filters.search);
      return apiGetPaginated<KbArticle>(`/knowledge-base?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken,
  });
}

export function useKbArticleQuery(id: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["knowledge-base", "article", id],
    queryFn: () => apiGet<KbArticle>(`/knowledge-base/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id,
  });
}

export interface CreateKbArticleInput {
  category: KbCategory;
  title: string;
  body: string;
  published?: boolean;
}

export function useCreateKbArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateKbArticleInput) => apiPost<KbArticle>("/knowledge-base", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] }),
  });
}

export function useUpdateKbArticleMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateKbArticleInput>) =>
      apiPut<KbArticle>(`/knowledge-base/${id}`, input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] }),
  });
}

export function useDeleteKbArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/knowledge-base/${id}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] }),
  });
}
