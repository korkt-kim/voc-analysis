import { Col, Flex, Input, Row, theme } from 'antd'
import { ChangeEventHandler, useCallback, useState } from 'react'

import {
  ChartByCount,
  ChartByLabel,
  ChartByTag,
  IssueList,
  SentimentSemiPieChart,
  Summary,
  TotalVocFound,
} from '@/entities'
import { ChartCard, useInsightStore } from '@/shared'

export interface InsightSearchSectionProps {}

export const InsightSearchSection = () => {
  const [value, setValue] = useState('')
  const {
    showInsight,
    action: { setShowInsight },
  } = useInsightStore()

  const { token } = theme.useToken()
  const onSearch = useCallback(() => {
    setShowInsight(value)
  }, [value, setShowInsight])

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      setValue(e.target.value)
    },
    [setValue]
  )

  return (
    <Flex vertical gap='small'>
      <Flex justify='center'>
        <div style={{ minWidth: 500, width: '50%' }}>
          <Input.Search
            value={value}
            onChange={onChange}
            placeholder='인사이트를 얻기위한 메세지를 입력해주세요. ex) 2024년 부정적인 이슈들 모음'
            onSearch={onSearch}
          />
        </div>
      </Flex>
      {showInsight && (
        <>
          <ChartCard
            title='Summary'
            styles={{ body: { overflow: 'auto', height: 200 } }}>
            <Summary />
          </ChartCard>
          <Row gutter={token.margin}>
            <Col span={6}>
              <div style={{ marginBottom: token.margin }}>
                <TotalVocFound />
              </div>

              <ChartCard title='Sentiments' style={{ height: 370 }}>
                <SentimentSemiPieChart />
              </ChartCard>
            </Col>
            <Col span={18}>
              <ChartCard title='Total Issues(EA)' style={{ height: 500 }}>
                <ChartByCount />
              </ChartCard>
            </Col>
          </Row>
          <ChartCard title='Tags(EA)'>
            <ChartByTag />
          </ChartCard>
          <ChartCard title='Labels(EA)'>
            <ChartByLabel />
          </ChartCard>
          <IssueList />
        </>
      )}
    </Flex>
  )
}
