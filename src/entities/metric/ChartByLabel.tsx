import { Col, Flex, Row, Select, Table } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useMemo, useState } from 'react'

import {
  ChartCard,
  ChartSelectOptions as _ChartSelectOptions,
  DurationSelectOptions,
  groupDataBy,
  useChartValueFilterOption,
  useGetChartOption,
  useMetricStore,
  useOverviewStore,
} from '@/shared'
import { ChartValueFilter } from '@/shared/ui/ChartValueFilter'

import { useGetAllVocs } from './api/voc-query'

const ChartSelectOptions = _ChartSelectOptions.filter(
  option => option.value !== 'pie'
)

export const ChartByLabel = () => {
  const { selectedModel } = useMetricStore()
  const { dateRange } = useOverviewStore()
  const [timeUnit, setTimeUnit] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  )

  const [chartType, setChartType] = useState<'bar' | 'line' | 'table'>('bar')

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
      timeUnit === 'monthly' ? 'month' : timeUnit === 'weekly' ? 'week' : 'day',
      'label'
    )

    return values.map(value => ({
      category: value.category,
      value: Object.keys(value.value).map(key => {
        return {
          name: key,
          value: (value.value as { [key: string]: typeof rawData.items })[key]
            .length,
        }
      }),
    }))
  }, [rawData, timeUnit])

  const chartValueFilterOption = useChartValueFilterOption({
    data,
  })

  const getChartOptions = useGetChartOption(
    chartType,
    data.map(item => ({
      category: item.category,
      value: item.value.filter(v =>
        chartValueFilterOption.checkedKeys?.includes(v.name)
      ),
    }))
  )

  return (
    <ChartCard title='Number of Labels'>
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
    </ChartCard>
  )
}
// {
//   /* <Col span={6}>
//         <ChartCard title='Label Filter'>
//           <ChartValueFilter {...chartValueFilterOption} />
//         </ChartCard>
//       </Col> */
// }
