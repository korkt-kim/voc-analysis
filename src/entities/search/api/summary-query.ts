import { useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { axios, Model, QueryParams } from '@/shared'

export const useGetSummary = (
  model?: Model,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: summaryQueryKeys.getOne(model, query),
    queryFn: () =>
      new Promise((resolve, reject) => {
        const events: string[] = []
        const eventSource = new EventSource(
          model ? `/api/${model}/history/summary` : '/api/history/summary'
        )

        eventSource.onmessage = event => {
          console.log('message')
          events.push(event.data)
        }

        eventSource.onerror = error => {
          console.log('Error')

          resolve(events)
        }

        eventSource.onopen = () => {
          setTimeout(() => {
            eventSource.close()
            resolve(events)
          }, 3000) // Wait for all events to be received
        }
      }),
  })
}

export const summaryQueryKeys = {
  all: ['summary'] as const,
  getOne: (model?: Model, query?: QueryParams) =>
    [...summaryQueryKeys.all, 'getOne', model, query] as const,
}
