import { useCallback } from 'react'
import { useTabStore } from '@/store'
import logger from '@/utilities/logger'

function useTabNavigation() {
    const openTab = useTabStore((s) => { return s.openTab })
    const closeCurrentTab = useTabStore((s) => { return s.closeCurrentTab })

    const navigate = useCallback((pathOrDelta, options, closeCurrentBeforeNavigate) => {
        const opts = options || {}
        const shouldCloseCurrentBeforeNavigate = Boolean(closeCurrentBeforeNavigate)

        if (typeof pathOrDelta === 'number') {
            if (pathOrDelta === -1) {
                const { tabs, activeTabId, closeTab } = useTabStore.getState()
                const currentTab = tabs.find(function (t) { return t.id === activeTabId })
                if (currentTab && !currentTab.pinned) {
                    closeTab(activeTabId)
                }
            }
            return
        }

        if (shouldCloseCurrentBeforeNavigate) {
            closeCurrentTab()
        }

        let label = opts.label
        if (!label) {
            logger.warn('No label provided for tab navigation, deriving from path:', pathOrDelta)
            const pathSegments = pathOrDelta.split('/').filter(Boolean)
            label = pathSegments[pathSegments.length - 1]
                .split('-')
                .map((word) => { return word.charAt(0).toUpperCase() + word.slice(1) })
                .join(' ')
        }

        const baseId = opts.id || pathOrDelta;
        const tabId = (opts.rowId && opts.rowId !== 'new') ? `${baseId}-${opts.rowId}` : baseId;

        openTab({
            id: tabId,
            label: label,
            path: pathOrDelta,
            state: opts.state,
            rowId: opts.rowId
        })
    }, [openTab, closeCurrentTab])

    const goBack = useCallback(() => {
        closeCurrentTab()
    }, [closeCurrentTab])

    return { navigate, goBack }
}

export default useTabNavigation
