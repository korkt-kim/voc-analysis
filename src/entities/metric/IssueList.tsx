import { Table, TableProps } from 'antd'
import { useMemo } from 'react'

import { useMetricStore, useOverviewStore } from '@/shared'

import { useGetAllVocs } from './api/voc-query'

export const IssueList = () => {
  const { selectedModel } = useMetricStore()
  const { dateRange } = useOverviewStore()
  const { data } = useGetAllVocs(
    selectedModel === 'total' ? undefined : selectedModel,
    { startDate: dateRange.start, endDate: dateRange.end }
  )

  const tableProps = useMemo<TableProps>(() => {
    return {
      dataSource: data?.items,
      pagination: { position: ['bottomCenter'], pageSize: 10 },
      rowKey: item => item.id,
      columns: [
        { title: 'Title', dataIndex: 'title' },
        {
          title: 'Tag',
          dataIndex: 'tags',
          render: item => {
            return item.join(', ')
          },
        },
        { title: 'Model', dataIndex: 'carModel' },
        { title: 'Label', dataIndex: 'label' },
        { title: 'Created At', dataIndex: 'createdAt' },
        { title: 'Created By', dataIndex: 'author' },
      ],
    }
  }, [data])

  return <Table {...tableProps} />
}
