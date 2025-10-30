import { create } from 'zustand'
import { AppState } from '../types/community'
import { persist } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      currentCommunity: null,
      user: {
        id: '3',
        name: 'Sam Kenpachi',
        email: 'demo@kitsohub.org.bw',
        role: 'System Admin',
        culturalTitle: 'Analyst',
      },
      darkMode: false,

      setCurrentCommunity: community => set({ currentCommunity: community }),
      setUser: user => set({ user }),
      toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'app-store-000001a',
    }
  )
)
