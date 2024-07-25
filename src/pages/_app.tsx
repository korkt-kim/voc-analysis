import '@/styles/globals.css'

import { NextPageWithLayout } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'

import { MSWReady, QueryProvider } from '@/app'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextPageWithLayout).getLayout || ((page: ReactNode) => page)

  return (
    <QueryProvider>
      {getLayout(
        <MSWReady>
          <Component {...pageProps} />
        </MSWReady>
      )}
    </QueryProvider>
  )
}
