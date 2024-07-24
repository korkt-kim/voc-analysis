import { omit } from 'lodash-es'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_STORAGE_PREFIX } from '../consts'
import { Model } from '../types'

interface SettingStore {
  favoriteModels: Model[]
}

export const useSettingStore = create<SettingStore>()(
  persist(
    set => ({
      favoriteModels: [],

      action: {
        setFavoriteModels: (model: Model) =>
          set(prev => ({
            ...prev,
            favoriteModels: [...prev.favoriteModels, model],
          })),
      },
    }),
    {
      name: `${LOCAL_STORAGE_PREFIX}_setting`,
      partialize: state => omit(state, 'action'),
    }
  )
)
