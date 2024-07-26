import { Col, Row, theme } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import {
  ChartByCount,
  ChartByLabel,
  ChartByTag,
  TotalVocFound,
} from '@/entities'
import { useMetricStore } from '@/shared'
import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Analysis'

export default function Home(): NextPageWithLayout {
  const { selectedModel } = useMetricStore()
  const { token } = theme.useToken()

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>

      <OverviewTemplate title={Title}>
        <Row gutter={token.margin}>
          <Col span={6}>
            <TotalVocFound />
          </Col>
          <Col span={18}>
            <ChartByCount />
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <ChartByTag />
            <ChartByLabel />
          </Col>
        </Row>
      </OverviewTemplate>
    </>
  )
}

Home.getLayout = BaseLayout
