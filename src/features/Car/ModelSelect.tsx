import { Select } from 'antd'
import { useCallback } from 'react'

import { useInsightStore, useMetricStore } from '@/shared'

import { Models } from '../../shared/consts'
import { Model } from '../../shared/types'

export const ModelSelect = () => {
  const {
    selectedModel,
    action: { setSelectedModel },
  } = useMetricStore()

  const {
    action: { setShowInsight },
  } = useInsightStore()

  const onChange = useCallback(
    (search: Model | 'total') => {
      setSelectedModel(search)
      setShowInsight(undefined)
    },
    [setSelectedModel, setShowInsight]
  )

  return (
    <Select
      style={{ width: '100%' }}
      value={selectedModel}
      showSearch
      options={
        [
          { value: 'total', label: 'Total' },
          ...Models.map(model => ({ value: model, label: model })),
        ] as const
      }
      onChange={onChange}
    />
  )
}
