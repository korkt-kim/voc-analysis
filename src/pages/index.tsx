import { NextPageWithLayout } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BaseLayout } from '@/widgets'

const Title = 'Overview'

export default function Home(): NextPageWithLayout {
  const router = useRouter()

  useEffect(() => {
    router.replace({ pathname: '/analysis', query: router.query })
  }, [router])

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>
    </>
  )
}

Home.getLayout = BaseLayout
