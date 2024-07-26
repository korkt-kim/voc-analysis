import { TreeProps } from 'antd'
import { Key, useMemo, useState } from 'react'

import { useDeepEffect } from './useDeepEffect'

export interface UseChartValueFilterOption {
  data: { category: string; value: { name: string; value: number }[] }[]
}

export const useChartValueFilterOption = ({
  data,
}: UseChartValueFilterOption) => {
  const [checkedKeys, setCheckedKeys] = useState<Key[]>()
  const baseTreeData = useMemo(
    () =>
      data.reduce<NonNullable<TreeProps['treeData']>>((acc, item) => {
        const names = item.value.map(a => a.name)
        return Array.from(
          new Set([...acc.map(item => item.title), ...names])
        ).map(item => {
          return {
            title: item,
            key: item,
          }
        }) as NonNullable<TreeProps['treeData']>
      }, []),
    [data]
  )
  useDeepEffect(() => {
    setCheckedKeys(baseTreeData.map(item => item.key))
  }, [baseTreeData])

  const onChange = (value: Key[]) => {
    setCheckedKeys(value)
  }

  return {
    baseTreeData,
    onChange,
    checkedKeys,
  }
}
