import { create } from 'zustand'

interface AppLoadingStore {
  isAppLoading: boolean
  setIsAppLoading: (loading: boolean) => void
}

export const useAppLoadingStore = create<AppLoadingStore>(set => ({
  isAppLoading: true,
  setIsAppLoading: isAppLoading => set(() => ({ isAppLoading })),
}))
