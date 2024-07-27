import { create } from 'zustand'

export interface InsightStore {
  showInsight: string | undefined
  action: {
    setShowInsight: (value: string | undefined) => void
  }
}

export const useInsightStore = create<InsightStore>()(set => ({
  showInsight: undefined,

  action: {
    setShowInsight: showInsight => set(() => ({ showInsight })),
  },
}))
