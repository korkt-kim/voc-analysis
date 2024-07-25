import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, Model, QueryParams, User } from '@/shared'
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

export const tagQueryKeys = {
  all: ['tag'] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...tagQueryKeys.all, 'getMany', model, query] as const,
}
