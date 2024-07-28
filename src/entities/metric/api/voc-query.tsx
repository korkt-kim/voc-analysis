import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, getAllContent, Model, QueryParams, VOC } from '@/shared'

export const useGetTotalVocCount = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: vocQueryKeys.getCount(model, query),
    queryFn: () =>
      axios.request<{ items: VOC[]; total: number }>({
        url: model ? `/api/${model}/issues` : '/api/issues',
        method: 'get',
        params: query,
        ...config,
      }),
  })
}

export const useGetInfiniteVocs = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: vocQueryKeys.getMany(model, query),
    queryFn: () =>
      axios.request<{ items: VOC[]; total: number }>({
        url: model ? `/api/${model}/issues` : '/api/issues',
        method: 'get',
        params: query,
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

export const useGetAllVocs = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: vocQueryKeys.getAll(model, query),
    queryFn: () =>
      getAllContent({
        http: axios,
        maxTries: 1,
        queryResult: axios.request<{ items: VOC[]; total: number }>({
          url: model ? `/api/${model}/issues` : '/api/issues',
          method: 'get',
          params: { ...query, limit: 100 },
          ...config,
        }),
      }),
  })
}

export const useGetVoc = (id: string, config?: AxiosRequestConfig) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: vocQueryKeys.getOne(id),
    queryFn: () =>
      axios.request<VOC>({
        url: `/api/issue/${id}`,
        method: 'get',

        ...config,
      }),
  })
}

export const vocQueryKeys = {
  all: ['voc'] as const,
  getCount: (model?: Model, query?: QueryParams) =>
    [...vocQueryKeys.all, 'getCount', model, query] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...vocQueryKeys.all, 'getMany', model, query] as const,
  getAll: (model?: Model, query?: QueryParams) =>
    [...vocQueryKeys.all, 'getAll', model, query] as const,
  getOne: (id: string) => [...vocQueryKeys.all, 'getOne', id] as const,
}
