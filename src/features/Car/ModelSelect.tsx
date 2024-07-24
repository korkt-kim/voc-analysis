import { Select } from 'antd'

import { useMetricStore } from '@/shared'

import { Models } from '../../shared/consts'
import { Model } from '../../shared/types'

export const ModelSelect = () => {
  const {
    selectedModel,
    action: { setSelectedModel },
  } = useMetricStore()

  const onSearch = (search: Model | 'total') => {
    setSelectedModel(search)
  }

  return (
    <Select
      value={selectedModel}
      showSearch
      options={
        [
          { value: 'total', label: 'Total' },
          ...Models.map(model => ({ value: model, label: model })),
        ] as const
      }
      onChange={value => onSearch(value)}
    />
  )
}
