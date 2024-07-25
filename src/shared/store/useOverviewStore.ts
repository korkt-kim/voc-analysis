import dayjs from 'dayjs'
import { omit } from 'lodash-es'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_STORAGE_PREFIX } from '../consts'

export interface OverviewStore {
  dateRange: { start: string; end: string }
  filter: (string | number)[][]
  action: {
    setFilter: (value: (string | number)[][]) => void
    setDateRange: ({ start, end }: { start: string; end: string }) => void
  }
}

export const useOverviewStore = create<OverviewStore>()(
  persist(
    set => ({
      dateRange: {
        start: dayjs().startOf('year').toString(),
        end: dayjs().toString(),
      },
      filter: [],
      action: {
        setFilter: value =>
          set(() => ({
            filter: value,
          })),
        setDateRange: ({ start, end }) =>
          set(prev => ({ dateRange: { ...prev.dateRange, start, end } })),
      },
    }),
    {
      name: `${LOCAL_STORAGE_PREFIX}_overview`,
      partialize: state => omit(state, 'action'),
    }
  )
)
