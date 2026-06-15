import { useCallback, useRef } from 'react'

/**
 * Custom hook for handling row click with double-click detection
 * Distinguishes between single and double clicks with a configurable delay
 * 
 * @param {Object} options - Configuration options
 * @param {Function} options.onRowClick - Callback for single click
 * @param {Function} options.onDoubleClick - Callback for double click
 * @param {number} options.doubleClickDelay - Time window for double-click detection (ms)
 * @returns {Function} Click handler for table rows
 */
export const useRowClick = ({
    onRowClick,
    onDoubleClick,
    doubleClickDelay = 300,
}) => {
    const lastClickRef = useRef({})
    const clickTimeoutRef = useRef({})

    const handleRowClick = useCallback(
        (rowData) => {
            // If no double-click handler, call onRowClick immediately
            if (!onDoubleClick) {
                onRowClick?.(rowData)
                return
            }

            const rowId = rowData.id || JSON.stringify(rowData)
            const now = Date.now()
            const lastClick = lastClickRef.current[rowId] || 0
            const timeSinceLastClick = now - lastClick

            if (timeSinceLastClick < doubleClickDelay) {
                // Double-click detected
                if (clickTimeoutRef.current[rowId]) {
                    clearTimeout(clickTimeoutRef.current[rowId])
                    clickTimeoutRef.current[rowId] = null
                }
                lastClickRef.current[rowId] = 0
                onDoubleClick?.(rowData)
            } else {
                // Potential single click
                lastClickRef.current[rowId] = now

                if (clickTimeoutRef.current[rowId]) {
                    clearTimeout(clickTimeoutRef.current[rowId])
                }

                clickTimeoutRef.current[rowId] = setTimeout(() => {
                    onRowClick?.(rowData)
                    clickTimeoutRef.current[rowId] = null
                }, doubleClickDelay)
            }
        },
        [onRowClick, onDoubleClick, doubleClickDelay]
    )

    return handleRowClick
}
