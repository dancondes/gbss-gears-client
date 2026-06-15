import { DEFAULT_TAB } from '@/constants/menu'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

let autoCloseInterval = null  // lives outside the store

const useTabStore = create(
    persist(
        (set, get) => ({
            // State
            tabs: [...DEFAULT_TAB],
            activeTabId: null,

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
                const tabIndex = tabs.findIndex(t => t.id === tabId)

                if (tabIndex === -1) return
                if (tabs[tabIndex].pinned) return

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
                const pinnedTabs = tabs.filter(t => t.pinned)

                if (pinnedTabs.length > 0) {
                    set({ tabs: pinnedTabs, activeTabId: pinnedTabs[0].id })
                } else {
                    set({ tabs: [], activeTabId: null })
                }
            },

            closeOtherTabs: (keepTabId) => {
                const { tabs } = get()
                const filteredTabs = tabs.filter(t => t.id === keepTabId || t.pinned)

                set({
                    tabs: filteredTabs,
                    activeTabId: keepTabId
                })
            },

            closeTabsToRight: (tabId) => {
                const { tabs, activeTabId } = get()
                const tabIndex = tabs.findIndex(t => t.id === tabId)

                if (tabIndex === -1) return

                const newTabs = tabs.filter((t, index) => {
                    if (index <= tabIndex) return true
                    if (t.pinned) return true
                    return false
                })

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

                const lastPinnedIndex = remaining.reduce(function (acc, t, i) {
                    return t.pinned ? i : acc
                }, -1)

                const newTabs = [
                    ...remaining.slice(0, lastPinnedIndex + 1),
                    updatedTab,
                    ...remaining.slice(lastPinnedIndex + 1)
                ]

                set({ tabs: newTabs })
            },

            unpinTab: (tabId) => {
                const { tabs } = get()
                const tabIndex = tabs.findIndex(t => t.id === tabId)
                if (tabIndex === -1) return

                const unpinnedTab = { ...tabs[tabIndex], pinned: false }
                const remaining = tabs.filter((_, i) => i !== tabIndex)

                const lastPinnedIndex = remaining.reduce(function (acc, t, i) {
                    return t.pinned ? i : acc
                }, -1)

                const newTabs = [
                    ...remaining.slice(0, lastPinnedIndex + 1),
                    unpinnedTab,
                    ...remaining.slice(lastPinnedIndex + 1)
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
            })
        }
    )
)

export default useTabStore
