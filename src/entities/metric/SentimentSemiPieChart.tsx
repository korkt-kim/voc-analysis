import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'

import { groupDataBy, useGetChartOption, useMetricStore, VOC } from '@/shared'

import { useGetAllVocs } from './api/voc-query'

export interface SentimentSemiPieChartProps {
  dateRange?: {
    start: string
    end: string
  }
  filter?: (string | number)[][]
  searchText?: string | string[] | undefined
}

export const SentimentSemiPieChart = ({
  dateRange,
  filter,
  searchText,
}: SentimentSemiPieChartProps) => {
  const { selectedModel } = useMetricStore()

  const { data: rawData } = useGetAllVocs(
    selectedModel === 'total' ? undefined : selectedModel,
    {
      startDate: dateRange?.start,
      endDate: dateRange?.end,
      tags: filter?.find(item => item[0] === 'tags')?.[1],
      assignee: filter?.find(item => item[0] === 'asignees')?.[1],
      author: filter?.find(item => item[0] === 'authors')?.[1],
      sentiment: filter?.find(item => item[0] === '"sentiments"')?.[1],
      search: searchText,
    }
  )

  const data = useMemo(() => {
    if (!rawData) {
      return []
    }

    const values = groupDataBy(rawData.items, 'sentiment')

    return values.map(value => ({
      category: value.category,
      value: [{ name: 'Issues', value: (value.value as VOC[]).length }],
    }))
  }, [rawData])

  const getChartOptions = useGetChartOption(
    'semi-pie',
    data.map(item => ({
      category: item.category,

      value: [
        {
          name: item.value[0].name,
          value: item.value[0].value,
        },
      ],
    })),
    {
      critical: 'red',
      negative: 'orange',
      neutral: 'grey',
      positive: 'green',
    }
  )

  return <ReactECharts option={getChartOptions()} notMerge lazyUpdate />
}
