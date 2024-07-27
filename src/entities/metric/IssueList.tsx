import { Table, TableProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useGetAllTags } from '@/features/search/api/tag-query'
import { useGetAllUsers } from '@/features/search/api/user-query'
import { Sentiments, SentimentTag, useMetricStore } from '@/shared'

import { useGetAllVocs } from './api/voc-query'

export interface IssueListProps {
  dateRange?: {
    start: string
    end: string
  }
  filter?: (string | number)[][]
  searchText?: string | string[] | undefined
}

export const IssueList = ({
  dateRange,
  filter,
  searchText,
}: IssueListProps) => {
  const { selectedModel } = useMetricStore()
  const { asPath } = useRouter()

  const { data } = useGetAllVocs(
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
                  query: { issueId: record.id, from: asPath },
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
        {
          title: 'Sentiment',
          dataIndex: 'sentiment',
          render: (sentiment: (typeof Sentiments)[number]) => {
            return <SentimentTag sentiment={sentiment} />
          },
        },
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
  }, [data?.items, asPath, tags?.items, users?.items])

  return <Table {...tableProps} />
}
