import { useTabStore } from "@/store"
import { useEffect } from "react"

function useRefetchOnTabActive(targetTabId, mutate) {
    const activeTabId = useTabStore((state) => state.activeTabId)

    useEffect(() => {
        if (activeTabId === targetTabId) {
            mutate()
        }
    }, [activeTabId, targetTabId, mutate])
}

export default useRefetchOnTabActive