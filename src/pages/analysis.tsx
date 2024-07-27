import { Col, Flex, Row, Spin, theme } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  ChartByCount,
  ChartByLabel,
  ChartByTag,
  SentimentSemiPieChart,
  TotalVocFound,
} from '@/entities'
import { ChartCard, useBreakPoint, useOverviewStore } from '@/shared'
import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Analysis'

export default function Home(): NextPageWithLayout {
  const { breakPoint } = useBreakPoint()
  const { token } = theme.useToken()
  const { dateRange, filter } = useOverviewStore()
  const {
    query: { searchText },
  } = useRouter()

  if (!breakPoint) {
    return (
      <Flex justify='center' align='center' style={{ height: '100%' }}>
        <Spin />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>

      <OverviewTemplate title={Title}>
        <Row gutter={token.margin} style={{ marginBottom: token.margin }}>
          <Col span={6}>
            <Flex vertical gap='middle'>
              <TotalVocFound
                dateRange={dateRange}
                filter={filter}
                searchText={searchText}
              />
              <ChartCard title='Sentiments' styles={{ body: { height: 323 } }}>
                <SentimentSemiPieChart
                  dateRange={dateRange}
                  filter={filter}
                  searchText={searchText}
                />
              </ChartCard>
            </Flex>
          </Col>
          <Col span={18}>
            <ChartCard title='Total Issues(EA)' style={{ height: 500 }}>
              <ChartByCount
                dateRange={dateRange}
                filter={filter}
                searchText={searchText}
              />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={token.margin}>
          <Col
            span={breakPoint === 'desktop' ? 12 : 24}
            style={{ marginBottom: token.margin }}>
            <ChartCard title='Tags(EA)'>
              <ChartByTag
                dateRange={dateRange}
                filter={filter}
                searchText={searchText}
              />
            </ChartCard>
          </Col>
          <Col span={breakPoint === 'desktop' ? 12 : 24}>
            <ChartCard title='Labels(EA)'>
              <ChartByLabel
                dateRange={dateRange}
                filter={filter}
                searchText={searchText}
              />
            </ChartCard>
          </Col>
        </Row>
      </OverviewTemplate>
    </>
  )
}

Home.getLayout = BaseLayout
