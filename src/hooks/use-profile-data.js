import { useState, useEffect, useCallback, useRef } from 'react'
import useTabNavigation from '@/hooks/use-tab-navigation'
import useIsTabActive from '@/hooks/use-is-tab-active'
import { toast } from 'react-toastify'
import logger from '@/utilities/logger'

function useProfileData({ rowId, fetchFn, isNewMode = false, onFetchSuccess, entityName = 'record' }) {
    const { goBack } = useTabNavigation()
    const isTabActive = useIsTabActive()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(!isNewMode)
    const hasFetchedRef = useRef(false)

    const fetchData = useCallback(async function() {
        if (!rowId) {
            toast.error(`No ${entityName} ID provided`)
            goBack()
            return
        }

        setIsLoading(true)
        try {
            const result = await fetchFn(rowId)
            const foundData = Array.isArray(result) ? result[0] : result

            if (foundData) {
                setData(foundData)
                if (onFetchSuccess) {
                    onFetchSuccess(foundData)
                }
            } else {
                // toast.error(`${entityName.charAt(0).toUpperCase() + entityName.slice(1)} not found`)
                // goBack()
            }
        } catch (error) {
            logger.error(`Error fetching ${entityName}:`, error)
            toast.error(`Error fetching ${entityName}: ${error?.message || 'Unknown error'}`)
            goBack()
        } finally {
            setIsLoading(false)
        }
    }, [rowId, fetchFn, onFetchSuccess, entityName, goBack])

    const refetch = useCallback(async function() {
        await fetchData()
    }, [fetchData])

    useEffect(function() {
        if (!isTabActive) return
        if (hasFetchedRef.current) return

        hasFetchedRef.current = true

        if (isNewMode) {
            setData({})
            setIsLoading(false)
        } else {
            fetchData()
        }
    }, [isNewMode, fetchData, isTabActive])

    const notFound = !isLoading && !data && !isNewMode

    return {
        data,
        isLoading,
        notFound,
        setData,
        refetch
    }
}

export default useProfileData
