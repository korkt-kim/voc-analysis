import { Divider, Skeleton } from 'antd'
import dayjs from 'dayjs'

import { SentimentTag } from '@/shared'

import { useGetVoc } from './api/voc-query'

export const VocDetail = ({ issueId }: { issueId: string }) => {
  const { data: voc, isPending } = useGetVoc(issueId)

  const content =
    isPending || !voc?.data ? (
      <>
        <Skeleton active />
      </>
    ) : (
      <>
        <div
          style={{
            marginBottom: '2rem',
            minHeight: '5rem',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            padding: '1rem',
          }}>
          <h2
            style={{
              marginBottom: '0.5rem',
              wordBreak: 'break-word',
              fontSize: '1.125rem',
              fontWeight: '600',
            }}>
            {voc.data.title}
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#6b7280',
              fontSize: '0.875rem',
            }}>
            <span>
              생성자: {voc.data.author}
              <Divider type='vertical' />
              담당자: {voc.data.assignee}
              <Divider type='vertical' />
              진행상황: {voc.data.status}
              <Divider type='vertical' />
              예상 감정: <SentimentTag sentiment={voc.data.sentiment} />
              <Divider type='vertical' />
              분류: {voc.data.label}
            </span>
            <span>
              {dayjs(voc.data.createdAt).format('YYYY.MM.DD HH:mm:ss')}
            </span>
          </div>
        </div>
        <div
          style={{
            borderBottom: '1px solid #e5e7eb',
            padding: '0 1rem 2rem 1rem',
          }}>
          <div
            style={{
              maxWidth: '100%',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            }}>
            {voc.data.detail}
          </div>
        </div>
      </>
    )

  return <>{content}</>
}
