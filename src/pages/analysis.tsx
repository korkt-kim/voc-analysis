import { Col, Flex, Row, Spin, theme } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import {
  ChartByCount,
  ChartByLabel,
  ChartByTag,
  SentimentSemiPieChart,
  TotalVocFound,
} from '@/entities'
import { ChartCard, useBreakPoint } from '@/shared'
import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Analysis'

export default function Home(): NextPageWithLayout {
  const { breakPoint } = useBreakPoint()
  const { token } = theme.useToken()

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
              <TotalVocFound />
              <ChartCard title='Sentiments' styles={{ body: { height: 323 } }}>
                <SentimentSemiPieChart />
              </ChartCard>
            </Flex>
          </Col>
          <Col span={18}>
            <ChartByCount />
          </Col>
        </Row>
        <Row gutter={token.margin}>
          <Col
            span={breakPoint === 'desktop' ? 12 : 24}
            style={{ marginBottom: token.margin }}>
            <ChartCard title='Number of Tags'>
              <ChartByTag />
            </ChartCard>
          </Col>
          <Col span={breakPoint === 'desktop' ? 12 : 24}>
            <ChartCard title='Number of Labels'>
              <ChartByLabel />
            </ChartCard>
          </Col>
        </Row>
      </OverviewTemplate>
    </>
  )
}

Home.getLayout = BaseLayout
