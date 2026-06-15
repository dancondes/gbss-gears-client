import { useTabStore } from '@/store'

function useTabParams() {
    const rowId = useTabStore(function(s) {
        const activeTab = s.tabs.find(function(t) { return t.id === s.activeTabId })
        if (!activeTab) return null
        if (activeTab.rowId !== undefined && activeTab.rowId !== null) {
            return activeTab.rowId
        }
        return null
    })

    if (rowId !== null) {
        return { rowId: rowId }
    }
    return {}
}

export default useTabParams
