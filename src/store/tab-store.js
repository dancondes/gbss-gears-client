import { DEFAULT_TABS } from '@/constants/menu'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

let autoCloseInterval = null  // lives outside the store

function withDefaultTabs(tabs) {
    const merged = [...tabs]
    DEFAULT_TABS.forEach(function (defaultTab) {
        const alreadyExists = merged.some(function (t) {
            return t.id === defaultTab.id || t.path === defaultTab.path
        })
        if (!alreadyExists) merged.unshift(defaultTab)
    })
    return merged
}

const useTabStore = create(
    persist(
        (set, get) => ({
            // State
            tabs: withDefaultTabs([]),
            activeTabId: DEFAULT_TABS[0]?.id ?? null,

            // Actions
            openTab: (tab) => {
                const { tabs, activeTabId } = get()

                const existingTab = tabs.find(t => t.id == tab.id || t.path == tab.path)

                // Stamp the current active tab before switching away from it
                const stampedTabs = tabs.map(t =>
                    t.id === activeTabId
                        ? { ...t, lastFocusedAt: new Date().toISOString() }
                        : t
                )

                if (existingTab) {
                    const updatedTabs = stampedTabs.map(t => {
                        if (t.id === existingTab.id) {
                            return {
                                ...t,
                                ...(tab.state && { state: tab.state }),
                                ...(tab.label && tab.label !== t.label && { label: tab.label }),
                                ...(tab.rowId !== undefined && { rowId: tab.rowId })
                            }
                        }
                        return t
                    })
                    set({ tabs: updatedTabs, activeTabId: existingTab.id })
                } else {
                    set({
                        tabs: [...stampedTabs, {
                            ...tab,
                            pinned: tab.pinned || false,
                            state: tab.state || null,
                            rowId: tab.rowId || null,
                            lastFocusedAt: null
                        }],
                        activeTabId: tab.id
                    })
                }
            },

            closeTab: (tabId) => {
                const { tabs, activeTabId } = get()
                const tab = tabs.find(t => t.id === tabId)

                if (!tab) return
                if (tab.pinned) return
                if (tab.isDefault) return

                const tabIndex = tabs.findIndex(t => t.id === tabId)
                const newTabs = tabs.filter(t => t.id !== tabId)

                if (newTabs.length === 0) {
                    set({ tabs: [], activeTabId: null })
                    return
                }

                let newActiveTabId = activeTabId
                if (activeTabId === tabId) {
                    const newIndex = tabIndex > 0 ? tabIndex - 1 : 0
                    newActiveTabId = newTabs[newIndex].id
                }

                set({
                    tabs: newTabs,
                    activeTabId: newActiveTabId
                })
            },

            switchTab: (tabId) => {
                const { tabs, activeTabId } = get()
                const tab = tabs.find(t => t.id === tabId)
                if (tab) {
                    const updatedTabs = tabs.map(t =>
                        t.id === activeTabId
                            ? { ...t, lastFocusedAt: new Date().toISOString() }
                            : t
                    )
                    set({ tabs: updatedTabs, activeTabId: tabId })
                }
            },

            closeCurrentTab: () => {
                const { activeTabId, closeTab } = get()
                if (activeTabId) {
                    closeTab(activeTabId)
                }
            },

            closeAllTabs: () => {
                const { tabs } = get()
                const survivingTabs = withDefaultTabs(tabs.filter(t => t.pinned))
                set({ tabs: survivingTabs, activeTabId: survivingTabs[0]?.id ?? null })
            },

            closeOtherTabs: (keepTabId) => {
                const { tabs } = get()
                const filteredTabs = withDefaultTabs(
                    tabs.filter(t => t.id === keepTabId || t.pinned)
                )
                set({ tabs: filteredTabs, activeTabId: keepTabId })
            },

            closeTabsToRight: (tabId) => {
                const { tabs, activeTabId } = get()
                const tabIndex = tabs.findIndex(t => t.id === tabId)

                if (tabIndex === -1) return

                const newTabs = withDefaultTabs(
                    tabs.filter(function (t, index) {
                        return index <= tabIndex || t.pinned
                    })
                )

                const activeTabStillExists = newTabs.some(t => t.id === activeTabId)
                const newActiveTabId = activeTabStillExists ? activeTabId : tabId

                set({
                    tabs: newTabs,
                    activeTabId: newActiveTabId
                })
            },

            pinTab: (tabId) => {
                const { tabs } = get()
                const tabIndex = tabs.findIndex(t => t.id === tabId)
                if (tabIndex === -1) return

                const updatedTab = { ...tabs[tabIndex], pinned: true }
                const remaining = tabs.filter((_, i) => i !== tabIndex)

                const defaultTabs = remaining.filter(t => t.isDefault)
                const nonDefaultRemaining = remaining.filter(t => !t.isDefault)

                const lastPinnedIndex = nonDefaultRemaining.reduce(function (acc, t, i) {
                    return t.pinned ? i : acc
                }, -1)

                const newTabs = [
                    ...defaultTabs,                                          // defaults always first
                    ...nonDefaultRemaining.slice(0, lastPinnedIndex + 1),   // existing pinned
                    updatedTab,                                              // newly pinned
                    ...nonDefaultRemaining.slice(lastPinnedIndex + 1)       // unpinned rest
                ]

                set({ tabs: newTabs })
            },

            unpinTab: (tabId) => {
                const { tabs } = get()
                const tabIndex = tabs.findIndex(t => t.id === tabId)
                if (tabIndex === -1) return

                const unpinnedTab = { ...tabs[tabIndex], pinned: false }
                const remaining = tabs.filter((_, i) => i !== tabIndex)

                const defaultTabs = remaining.filter(t => t.isDefault)
                const nonDefaultRemaining = remaining.filter(t => !t.isDefault)

                const lastPinnedIndex = nonDefaultRemaining.reduce(function (acc, t, i) {
                    return t.pinned ? i : acc
                }, -1)

                const newTabs = [
                    ...defaultTabs,                                          // defaults always first
                    ...nonDefaultRemaining.slice(0, lastPinnedIndex + 1),   // remaining pinned
                    unpinnedTab,                                             // newly unpinned goes after pinned
                    ...nonDefaultRemaining.slice(lastPinnedIndex + 1)       // rest of unpinned
                ]

                set({ tabs: newTabs })
            },

            updateTabLabel: (tabId, newLabel) => {
                const { tabs } = get()
                const updatedTabs = tabs.map(t =>
                    t.id === tabId ? { ...t, label: newLabel } : t
                )
                set({ tabs: updatedTabs })
            },

            updateTabPath: (tabId, newPath) => {
                const { tabs } = get()
                const updatedTabs = tabs.map(t =>
                    t.id === tabId ? { ...t, path: newPath } : t
                )
                set({ tabs: updatedTabs })
            },

            clearTabState: (tabId) => {
                const { tabs } = get()
                const updatedTabs = tabs.map(t =>
                    t.id === tabId ? { ...t, state: null } : t
                )
                set({ tabs: updatedTabs })
            },

            updateTabState: (tabId, stateUpdate) => {
                const { tabs } = get()
                const updatedTabs = tabs.map(t =>
                    t.id === tabId ? { ...t, state: { ...t.state, ...stateUpdate } } : t
                )
                set({ tabs: updatedTabs })
            },

            shouldRefreshTab: () => {
                const { tabs, activeTabId } = get()
                const currentTab = tabs.find(t => t.id === activeTabId)
                const shouldRefresh = currentTab?.state?.shouldRefresh || false

                if (shouldRefresh) {
                    const updatedTabs = tabs.map(t =>
                        t.id === activeTabId ? { ...t, state: { ...t.state, shouldRefresh: false } } : t
                    )
                    set({ tabs: updatedTabs })
                }

                return shouldRefresh
            },

            getActiveTab: () => {
                const { tabs, activeTabId } = get()
                return tabs.find(t => t.id === activeTabId) || null
            },

            startAutoCloseInterval: () => {
                if (autoCloseInterval) return

                autoCloseInterval = setInterval(() => {
                    const { tabs, activeTabId, closeTab } = get()
                    const TWO_HOURS = 2 * 60 * 60 * 1000
                    // const TWO_HOURS = 10 * 1000 // for testing purposes, set to 10 seconds
                    const now = Date.now()

                    tabs.forEach(t => {
                        if (t.id === activeTabId) return
                        if (t.pinned) return
                        if (t.isDefault) return
                        if (!t.lastFocusedAt) return
                        if (now - new Date(t.lastFocusedAt).getTime() >= TWO_HOURS) {
                            closeTab(t.id)
                        }
                    })
                }, 60 * 1000)
            },

            stopAutoCloseInterval: () => {
                if (autoCloseInterval) {
                    clearInterval(autoCloseInterval)
                    autoCloseInterval = null
                }
            },
        }),
        {
            name: 'gears-tab-storage',
            partialize: (state) => ({
                tabs: state.tabs,
                activeTabId: state.activeTabId
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) return
                const fixed = withDefaultTabs(state.tabs ?? [])
                const activeStillExists = fixed.some(t => t.id === state.activeTabId)
                state.tabs = fixed
                state.activeTabId = activeStillExists
                    ? state.activeTabId
                    : fixed[0]?.id ?? null
            },
        }
    )
)

export default useTabStore