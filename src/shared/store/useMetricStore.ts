import { omit } from 'lodash-es'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_STORAGE_PREFIX } from '../consts'
import { Model } from '../types'

export interface MetricStore {
  selectedModel: Model | 'total'
  action: {
    setSelectedModel: (value: Model | 'total') => void
  }
}

export const useMetricStore = create<MetricStore>()(
  persist(
    set => ({
      selectedModel: 'total',
      action: {
        setSelectedModel: (value: Model | 'total') =>
          set(() => ({ selectedModel: value })),
      },
    }),
    {
      name: `${LOCAL_STORAGE_PREFIX}_metric`,
      partialize: state => omit(state, 'action'),
    }
  )
)
