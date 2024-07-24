import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'

export default function Home(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <main>asdf</main>
    </>
  )
}

Home.getLayout = BaseLayout
