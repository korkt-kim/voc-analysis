import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BaseLayout } from '@/widgets'

export default function VocDetail(): NextPageWithLayout {
  const {
    query: { vocId },
  } = useRouter()
  return (
    <>
      <Head>
        <title>Detail - title이 들어가야함</title>
      </Head>
      <main>
        <Link href={{ pathname: '/search' }}>
          <ArrowLeftOutlined /> Back to VOC list
        </Link>
      </main>
    </>
  )
}

VocDetail.getLayout = BaseLayout
