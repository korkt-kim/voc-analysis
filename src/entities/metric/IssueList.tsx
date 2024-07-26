import { Button, Table, TableProps } from 'antd'
import Link from 'next/link'
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
        {
          title: 'Title',
          dataIndex: 'title',
          render: (title, record) => {
            return (
              <Link
                href={{
                  pathname: '/issues/[issueId]',
                  query: { issueId: record.id, from: '/issues' },
                }}>
                {title}
              </Link>
            )
          },
        },
        {
          title: 'Tag',
          dataIndex: 'tags',
          render: item => {
            return item.join(', ')
          },
        },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Model', dataIndex: 'carModel' },
        { title: 'Label', dataIndex: 'label' },
        { title: 'Sentiment', dataIndex: 'sentiment' },
        { title: 'Asignee', dataIndex: 'assignee' },
        { title: 'Created At', dataIndex: 'createdAt' },
        { title: 'Created By', dataIndex: 'author' },
      ],
    }
  }, [data])

  return <Table {...tableProps} />
}
