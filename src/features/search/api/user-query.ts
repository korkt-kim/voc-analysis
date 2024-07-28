import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, getAllContent, Model, QueryParams, User } from '@/shared'

export const useGetInfiniteUsers = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: userQueryKeys.getMany(model, query),
    queryFn: ({ pageParam }) =>
      axios.request<User[]>({
        url: model ? `/api/${model}/users` : '/api/users',
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

export const useGetAllUsers = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: userQueryKeys.getAll(model, query),
    queryFn: () =>
      getAllContent({
        http: axios,
        maxTries: 1,
        queryResult: axios.request<{ items: User[] }>({
          url: model ? `/api/${model}/users` : '/api/users',
          method: 'get',
          params: { ...query, limit: 100 },
          ...config,
        }),
      }),
  })
}

export const userQueryKeys = {
  all: ['user'] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...userQueryKeys.all, 'getMany', model, query] as const,
  getAll: (model?: Model, query?: QueryParams) =>
    [...userQueryKeys.all, 'getAll', model, query] as const,
}
