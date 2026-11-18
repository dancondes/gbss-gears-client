import { create } from 'zustand'

// Remembers whether the system was updated while the user had the page open,
// so the banner at the top of the page knows when to appear.
export const useUpdateNoticeStore = create((set) => ({
    updateRequired: false,
    showUpdateNotice: () => set({ updateRequired: true })
}))