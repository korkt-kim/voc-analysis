import { ArrowUpOutlined } from '@ant-design/icons'
import { Card, Statistic } from 'antd'

import { ChartCard, useMetricStore, useOverviewStore } from '@/shared'

import { useGetTotalVocCount } from './api/voc-query'

export const TotalVocFound = () => {
  const { selectedModel } = useMetricStore()
  const { dateRange } = useOverviewStore()

  const { data, isLoading } = useGetTotalVocCount(
    selectedModel === 'total' ? undefined : selectedModel,
    {
      startDate: dateRange.start,
      endDate: dateRange.end,
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
