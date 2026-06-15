import { useEffect } from 'react'
import { useTabStore } from '@/store'

function useShouldRefreshTab(mutate) {
    const shouldRefreshTab = useTabStore(s => s.shouldRefreshTab)
    const activeTabId = useTabStore(s => s.activeTabId)

    useEffect(() => {
        if (shouldRefreshTab()) {
            mutate()
        }
    }, [activeTabId, shouldRefreshTab, mutate])
}

export default useShouldRefreshTab
