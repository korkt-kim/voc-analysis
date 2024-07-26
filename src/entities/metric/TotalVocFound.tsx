import { Statistic } from 'antd'
import { useRouter } from 'next/router'

import { ChartCard, useMetricStore, useOverviewStore } from '@/shared'

import { useGetTotalVocCount } from './api/voc-query'

export const TotalVocFound = () => {
  const { selectedModel } = useMetricStore()
  const {
    query: { searchText },
  } = useRouter()
  const { dateRange, filter } = useOverviewStore()

  const { data, isLoading } = useGetTotalVocCount(
    selectedModel === 'total' ? undefined : selectedModel,
    {
      startDate: dateRange.start,
      endDate: dateRange.end,
      tags: filter.find(item => item[0] === 'tags')?.[1],
      assignee: filter.find(item => item[0] === 'asignees')?.[1],
      author: filter.find(item => item[0] === 'authors')?.[1],
      sentiment: filter.find(item => item[0] === '"sentiments"')?.[1],
      search: searchText,
    }
  )

  return (
    <ChartCard>
      <Statistic
        title='Total Found'
        value={data?.data.total}
        loading={isLoading}
      />
    </ChartCard>
  )
}
