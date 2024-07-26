import { Table, TableProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useGetAllTags } from '@/features/search/api/tag-query'
import { useGetAllUsers } from '@/features/search/api/user-query'
import { useMetricStore, useOverviewStore } from '@/shared'

import { useGetAllVocs } from './api/voc-query'

export const IssueList = () => {
  const { selectedModel } = useMetricStore()
  const {
    query: { searchText },
  } = useRouter()
  const { dateRange, filter } = useOverviewStore()
  const { data } = useGetAllVocs(
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
  const { data: users } = useGetAllUsers()
  const { data: tags } = useGetAllTags()

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
          render: (tagIds: string[]) => {
            return tagIds
              .map(tagId => tags?.items.find(tag => tag.id === tagId)?.tagName)
              .join(', ')
          },
        },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Model', dataIndex: 'carModel' },
        { title: 'Label', dataIndex: 'label' },
        { title: 'Sentiment', dataIndex: 'sentiment' },
        {
          title: 'Asignee',
          dataIndex: 'assignee',
          render: assigneeId => {
            return users?.items.find(user => user.id === assigneeId)?.username
          },
        },
        { title: 'Created At', dataIndex: 'createdAt' },
        {
          title: 'Created By',
          dataIndex: 'author',
          render: authorId => {
            return users?.items.find(user => user.id === authorId)?.username
          },
        },
      ],
    }
  }, [data?.items, users?.items])

  return <Table {...tableProps} />
}
