import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTabStore = create(
    persist(
        (set) => ({
            tabs: [
                { id: 'clock-in-out', label: 'Clock IN/OUT', closeable: false, active: true }
            ],
            activeTab: 'clock-in-out',

            openTab: (id, label) => {
                set((state) => {
                    const existingTab = state.tabs.find(tab => tab.id === id)
                    let newTabs = state.tabs.map(tab => ({ ...tab, active: false }))

                    if (!existingTab) {
                        newTabs = [...newTabs, { id, label, closeable: true, active: true }]
                    } else {
                        newTabs = newTabs.map(tab => ({
                            ...tab,
                            active: tab.id === id
                        }))
                    }

                    return {
                        tabs: newTabs,
                        activeTab: id
                    }
                })
            },

            closeTab: (id) => {
                set((state) => {
                    const tabIndex = state.tabs.findIndex(tab => tab.id === id)
                    const newTabs = state.tabs.filter(tab => tab.id !== id)
                    let newActiveTab = state.activeTab

                    if (state.activeTab === id) {
                        const newActiveIndex = Math.max(0, tabIndex - 1)
                        newActiveTab = newTabs[newActiveIndex]?.id || 'clock-in-out'
                        if (newTabs[newActiveIndex]) {
                            newTabs[newActiveIndex] = { ...newTabs[newActiveIndex], active: true }
                        }
                    }

                    return {
                        tabs: newTabs,
                        activeTab: newActiveTab
                    }
                })
            },

            setActiveTab: (id) => {
                set((state) => {
                    const newTabs = state.tabs.map(tab => ({
                        ...tab,
                        active: tab.id === id
                    }))
                    return { 
                        tabs: newTabs,
                        activeTab: id 
                    }
                })
            },

            clearTabs: () => {
                set({
                    tabs: [
                        { id: 'clock-in-out', label: 'Clock IN/OUT', closeable: false, active: true }
                    ],
                    activeTab: 'clock-in-out'
                })
            }
        }),
        {
            name: 'tab-storage',
            partialize: (state) => ({
                tabs: state.tabs,
                activeTab: state.activeTab
            })
        }
    )
)

export default useTabStore
