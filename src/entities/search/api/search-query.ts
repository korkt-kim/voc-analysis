import { useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, HistoroyOfSearch, Model, QueryParams } from '@/shared'

export const useGetSearchHistory = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: searchQueryKeys.getMany(model, query),
    queryFn: () =>
      axios.request<HistoroyOfSearch[]>({
        url: model ? `/${model}/history/search` : '/history/search',
        method: 'get',
        params: query,
        ...config,
      }),
  })
}

export const searchQueryKeys = {
  all: ['search'] as const,
  getMany: (model?: Model, query?: QueryParams) =>
    [...searchQueryKeys.all, 'getMany', model, query] as const,
}
