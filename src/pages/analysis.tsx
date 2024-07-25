import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Analysis'

export default function Home(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>

      <OverviewTemplate title={Title}></OverviewTemplate>
    </>
  )
}

Home.getLayout = BaseLayout
