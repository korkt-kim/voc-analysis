import { Select } from 'antd'

import { useMetricStore } from '@/shared'

import { Models } from '../../shared/consts'
import { Model } from '../../shared/types'

export const ModelSelect = () => {
  const {
    search,
    action: { setSearch },
  } = useMetricStore()

  const onSearch = (search: Model | 'total') => {
    setSearch(search)
  }

  return (
    <Select
      value={search}
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
