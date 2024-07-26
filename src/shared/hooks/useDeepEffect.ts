import { isEqual } from 'lodash-es'
import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useDeepEffect = (
  callback: EffectCallback,
  deps: DependencyList
) => {
  const isFirst = useRef(true)
  const prevDeps = useRef<DependencyList | null>(null)

  useEffect(() => {
    const isSame = isEqual(prevDeps.current, deps)
    if (!isFirst.current && isSame) {
      return
    }
    isFirst.current = false
    prevDeps.current = deps

    return callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
