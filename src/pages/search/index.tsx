import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'
import { SearchSection } from '@/widgets/search/SearchSection'

export default function Search(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <main>
        <SearchSection />
      </main>
    </>
  )
}

Search.getLayout = BaseLayout
