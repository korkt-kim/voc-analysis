import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'

export default function Setting(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>Setting</title>
      </Head>
      <main></main>
    </>
  )
}

Setting.getLayout = BaseLayout
