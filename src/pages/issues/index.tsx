import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { BaseLayout } from '@/widgets'
import { OverviewTemplate } from '@/widgets/templates/OverviewTemplate'

const Title = 'Overview - Voc List'

export default function Page(): NextPageWithLayout {
  const {
    query: { searchText },
  } = useRouter()

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>

      <OverviewTemplate title={Title}></OverviewTemplate>
    </>
  )
}

Page.getLayout = BaseLayout
