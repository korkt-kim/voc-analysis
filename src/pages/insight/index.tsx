import { NextPageWithLayout } from 'next'
import Head from 'next/head'

import { BaseLayout } from '@/widgets'
import { InsightSearchSection } from '@/widgets/search/InsightSearchSection'
import { BasePageTemplate } from '@/widgets/templates/BasePageTemplate'

const Title = 'Insight'

export default function Search(): NextPageWithLayout {
  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>
      <main>
        <BasePageTemplate title={Title}>
          <InsightSearchSection />
        </BasePageTemplate>
      </main>
    </>
  )
}

Search.getLayout = BaseLayout
