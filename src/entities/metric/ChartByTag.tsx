import { Flex, Select, Table } from 'antd'
import ReactECharts from 'echarts-for-react'
import { omit } from 'lodash-es'
import { useMemo, useState } from 'react'

import { useGetAllTags } from '@/features/search/api/tag-query'
import {
  ChartSelectOptions as _ChartSelectOptions,
  DurationSelectOptions,
  groupDataBy,
  useChartValueFilterOption,
  useGetChartOption,
  useMetricStore,
} from '@/shared'

import { useGetAllVocs } from './api/voc-query'

const ChartSelectOptions = _ChartSelectOptions.filter(
  option => option.value !== 'pie'
)

export interface ChartByTagProps {
  dateRange?: {
    start: string
    end: string
  }
  filter?: (string | number)[][]
  searchText?: string | string[] | undefined
}

export const ChartByTag = ({
  dateRange,
  filter,
  searchText,
}: ChartByTagProps) => {
  const { selectedModel } = useMetricStore()

  const [timeUnit, setTimeUnit] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  )

  const [chartType, setChartType] = useState<'bar' | 'line' | 'table'>('bar')

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

  const { data: tags } = useGetAllTags()

  const data = useMemo(() => {
    if (!rawData) {
      return []
    }

    const flatData = rawData.items.reduce(
      (acc, item) => {
        item.tags.forEach(tag => {
          acc.push({ ...omit(item, 'tags'), tag })
        })

        return acc
      },
      [] as { tag: string; createdAt: string }[]
    )

    const values = groupDataBy(
      flatData,
      timeUnit === 'monthly' ? 'month' : timeUnit === 'weekly' ? 'week' : 'day',
      'tag'
    )

    return values.map(value => ({
      category: value.category,
      value: Object.keys(value.value).map(key => {
        return {
          name: key,
          value: (value.value as { [key: string]: typeof flatData })[key]
            .length,
        }
      }),
    }))
  }, [rawData, timeUnit])
  const chartValueFilterOption = useChartValueFilterOption({
    data,
  })
  //
  const getChartOptions = useGetChartOption(
    chartType,
    data.map(item => ({
      category: item.category,
      value: item.value
        .filter(v => chartValueFilterOption.checkedKeys?.includes(v.name))
        .map(v => ({
          name: tags?.items.find(tag => tag.id === v.name)?.tagName ?? '',
          value: v.value,
        })),
    }))
  )

  return (
    <>
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
        <Table {...getChartOptions()} />
      ) : (
        <ReactECharts option={getChartOptions()} notMerge lazyUpdate />
      )}
    </>
  )
}
