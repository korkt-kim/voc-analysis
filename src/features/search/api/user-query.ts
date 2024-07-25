import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, Model, QueryParams, User } from '@/shared'

export const useGetInfiniteUsers = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: asigneeQueryKeys.getMany(model, query),
    queryFn: ({ pageParam }) =>
      axios.request<User[]>({
        url: model ? `/${model}/users` : '/users',
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

export const asigneeQueryKeys = {
  all: ['asignee'] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...asigneeQueryKeys.all, 'getMany', model, query] as const,
}
