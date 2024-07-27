import { useEffect, useState } from 'react'

const listener = () => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.innerWidth < 1600) {
    return 'phone'
  }

  return 'desktop'
}

export const useBreakPoint = () => {
  const [breakPoint, setBreakPoint] = useState<
    'phone' | 'desktop' | undefined
  >()

  useEffect(() => {
    const resizeListener = () => setBreakPoint(listener())

    resizeListener()

    window.addEventListener('resize', resizeListener)

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return { breakPoint }
}
