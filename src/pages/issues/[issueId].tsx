import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BaseLayout } from '@/widgets'
import { BasePageTemplate } from '@/widgets/templates/BasePageTemplate'

export default function Page(): NextPageWithLayout {
  const {
    query: { vocId, from },
  } = useRouter()

  return (
    <>
      <Head>
        <title>Detail - title이 들어가야함</title>
      </Head>
      <main>
        <BasePageTemplate title='Overview / Detail'>
          <Link
            href={{
              pathname: `/${from === 'insight' ? 'insight' : 'issues'}`,
            }}>
            <ArrowLeftOutlined /> Go Back
          </Link>
        </BasePageTemplate>
      </main>
    </>
  )
}

Page.getLayout = BaseLayout
