import { useTabStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

function useTabLocation() {
    return useTabStore(useShallow(function(s) {
        const activeTab = s.tabs.find(function(t) { return t.id === s.activeTabId })
        return {
            pathname: activeTab?.path || '/',
            state: activeTab?.state || null,
            search: '',
            hash: '',
            key: s.activeTabId
        }
    }))
}

export default useTabLocation
