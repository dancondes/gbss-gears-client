import { useEffect, useRef } from 'react'
import { useTabPath } from '@/hooks/use-is-tab-active'
import useUIStore from '@/store/ui-store'

/**
 * Registers a refresh callback for the current tab path.
 * When the Refresh button is clicked, only the active tab's callback is invoked.
 *
 * @param {Function} callback - The function to call on refresh (e.g. SWR mutate).
 *   Pass a stable reference (wrap with useCallback if needed).
 */
function useRefreshCallback(callback) {
    const tabPath = useTabPath()
    const setRefreshCallback = useUIStore(state => state.setRefreshCallback)
    const clearRefreshCallback = useUIStore(state => state.clearRefreshCallback)
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    })

    useEffect(() => {
        if (!tabPath) return

        setRefreshCallback(tabPath, function () {
            if (callbackRef.current) {
                callbackRef.current()
            }
        })

        return function () {
            clearRefreshCallback(tabPath)
        }
    }, [tabPath, setRefreshCallback, clearRefreshCallback])
}

export default useRefreshCallback
