import { omit } from 'lodash-es'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_STORAGE_PREFIX } from '../consts'
import { Model } from '../types'

export interface MetricStore {
  search: Model | 'total'
  action: {
    setSearch: (value: Model | 'total') => void
  }
}

export const useMetricStore = create<MetricStore>()(
  persist(
    set => ({
      search: 'total',
      action: {
        setSearch: (value: Model | 'total') => set(() => ({ search: value })),
      },
    }),
    {
      name: `${LOCAL_STORAGE_PREFIX}_metric`,
      partialize: state => omit(state, 'action'),
    }
  )
)
