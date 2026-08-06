import { create } from 'zustand'

interface AppState {
  isSidebarOpen: boolean
  activeLookId: string | null
  setSidebarOpen: (open: boolean) => void
  setActiveLookId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  activeLookId: null,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setActiveLookId: (id) => set({ activeLookId: id }),
}))
