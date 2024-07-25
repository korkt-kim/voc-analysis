import { PropsWithChildren, useEffect, useState } from 'react'

import { initMSW } from '@/shared'

export function MSWReady({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isReady) {
      return
    }

    initMSW().then(() => setIsReady(true))
  }, [isReady])

  if (!isReady) {
    return null
  }
  return <>{children}</>
}
