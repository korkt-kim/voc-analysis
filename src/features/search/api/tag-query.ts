import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, getAllContent, Model, QueryParams } from '@/shared'
import { Tag } from '@/shared/mocks/handlers/tag'

export const useGetInfiniteTags = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: tagQueryKeys.getMany(model, query),
    queryFn: ({ pageParam }) =>
      axios.request<Tag[]>({
        url: model ? `/${model}/tags` : '/tags',
        method: 'get',
        params: { ...query, ...pageParam },
        ...config,
      }),
    initialPageParam: { page: 1 },
    getNextPageParam: (_0, _1, lastPageParam) => ({
      ...lastPageParam,
      page: lastPageParam.page + 1,
    }),
    getPreviousPageParam: (_0, _1, lastPageParam) => ({
      ...lastPageParam,
      page: lastPageParam.page - 1,
    }),
  })
}

export const useGetAllTags = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: tagQueryKeys.getAll(model, query),
    queryFn: () =>
      getAllContent({
        http: axios,
        maxTries: 1,
        queryResult: axios.request<{ items: Tag[] }>({
          url: model ? `/${model}/tags` : '/tags',
          method: 'get',
          params: { ...query, limit: 100 },
          ...config,
        }),
      }),
  })
}

export const tagQueryKeys = {
  all: ['tag'] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...tagQueryKeys.all, 'getMany', model, query] as const,
  getAll: (model?: Model, query?: QueryParams) =>
    [...tagQueryKeys.all, 'getAll', model, query] as const,
}
