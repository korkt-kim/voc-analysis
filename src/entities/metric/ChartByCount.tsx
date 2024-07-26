import { Flex, Select, Table } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useMemo, useState } from 'react'

import {
  ChartCard,
  ChartSelectOptions,
  DurationSelectOptions,
  groupDataBy,
  useGetChartOption,
  useMetricStore,
  useOverviewStore,
  VOC,
} from '@/shared'

import { useGetAllVocs } from './api/voc-query'

export const ChartByCount = () => {
  const { selectedModel } = useMetricStore()
  const { dateRange } = useOverviewStore()
  const [timeUnit, setTimeUnit] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  )

  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'table'>(
    'bar'
  )
  const { data: rawData } = useGetAllVocs(
    selectedModel === 'total' ? undefined : selectedModel,
    { startDate: dateRange.start, endDate: dateRange.end }
  )

  const data = useMemo(() => {
    if (!rawData) {
      return []
    }

    const values = groupDataBy(
      rawData.items,
      timeUnit === 'monthly' ? 'month' : timeUnit === 'weekly' ? 'week' : 'day'
    )

    return values.map(value => ({
      category: value.category,
      value: [{ name: 'Issues', value: (value.value as VOC[]).length }],
    }))
  }, [rawData, timeUnit])

  const getOptions = useGetChartOption(chartType, data)

  return (
    <ChartCard title='Number of Total Issues' style={{ height: 500 }}>
      <Flex justify='end'>
        <Select
          defaultValue={ChartSelectOptions[0].value}
          options={Array.from(ChartSelectOptions)}
          style={{ width: 120 }}
          onChange={setChartType}
        />

        <Select
          defaultValue={DurationSelectOptions[0].value}
          options={Array.from(DurationSelectOptions)}
          style={{ width: 120, marginLeft: 16 }}
          onChange={setTimeUnit}
        />
      </Flex>
      {chartType === 'table' ? (
        <Table {...getOptions()} />
      ) : (
        <ReactECharts
          option={getOptions()}
          notMerge
          lazyUpdate
          style={{ height: 400 }}
        />
      )}
    </ChartCard>
  )
}
