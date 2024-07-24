import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'

export default function Search(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <main></main>
    </>
  )
}

Search.getLayout = BaseLayout
