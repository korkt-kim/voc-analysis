import { ArrowLeftOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Route } from 'nextjs-routes'

import { VocDetail } from '@/entities'
import { BaseLayout } from '@/widgets'
import { BasePageTemplate } from '@/widgets/templates/BasePageTemplate'

export default function Page(): NextPageWithLayout {
  const {
    replace,
    query: { issueId, from },
  } = useRouter()

  const prevUrl = (from ?? '/issues') as unknown as Route

  if (!issueId) {
    replace(prevUrl)
    return
  }

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <main>
        <BasePageTemplate title='Overview - Voc Detail'>
          <Link href={prevUrl}>
            <ArrowLeftOutlined /> Go Back
          </Link>
          <VocDetail issueId={String(issueId)} />
        </BasePageTemplate>
      </main>
    </>
  )
}

Page.getLayout = BaseLayout
