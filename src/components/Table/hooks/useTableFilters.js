import { useState, useCallback, useMemo, useEffect } from 'react'
import logger from '@/utilities/logger'

/**
 * Load table state from sessionStorage
 */
function loadTableState(storageKey) {
    if (!storageKey) return null
    try {
        const saved = sessionStorage.getItem(storageKey)
        return saved ? JSON.parse(saved) : null
    } catch (error) {
        logger.error('Failed to load table state:', error)
        return null
    }
}

/**
 * Save table state to sessionStorage
 */
function saveTableState(storageKey, state) {
    if (!storageKey) return
    try {
        sessionStorage.setItem(storageKey, JSON.stringify(state))
    } catch (error) {
        logger.error('Failed to save table state:', error)
    }
}

/**
 * Custom hook for managing table filtering state and logic
 * Handles global search, column filters, and date range filtering
 * 
 * @param {Object} options - Configuration options
 * @param {Object} options.externalColumnFilters - Column filter configurations
 * @param {Object} options.dateRange - Date range filter configuration
 * @param {string[]} options.globalFilterColumns - Columns to include in global search
 * @param {string} options.storageKey - Optional key for persisting state in sessionStorage
 * @returns {Object} Filter state and handlers
 */
export const useTableFilters = ({
    externalColumnFilters = {},
    dateRange = {},
    globalFilterColumns = [],
    storageKey = null,
}) => {
    // Load saved state if available
    const savedState = useMemo(() => loadTableState(storageKey), [storageKey])
    // Global search state
    const [searchValue, setSearchValue] = useState(savedState?.searchValue || '')
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(savedState?.searchValue || '')

    // Pending column filter values (UI state - not applied yet)
    const [pendingColumnFilters, setPendingColumnFilters] = useState(() => {
        // Prioritize saved state over default config values
        if (savedState?.pendingColumnFilters) {
            return savedState.pendingColumnFilters
        }
        const initialFilters = {}
        Object.entries(externalColumnFilters).forEach(([columnId, config]) => {
            if (config.value && config.value !== 'all') {
                initialFilters[columnId] = config.value
            }
        })
        return initialFilters
    })

    // Applied column filters state (actually used for filtering)
    // Columns with serverSide: true are excluded — the server handles those
    const [columnFilters, setColumnFilters] = useState(() => {
        // Prioritize saved state over default config values
        if (savedState?.columnFilters) {
            return savedState.columnFilters
        }
        const initialFilters = []
        Object.entries(externalColumnFilters).forEach(([columnId, config]) => {
            if (config.serverSide) return
            if (config.value && config.value !== 'all') {
                initialFilters.push({ id: columnId, value: config.value })
            }
        })
        return initialFilters
    })

    // Date range state
    const [dateRangeFilter, setDateRangeFilter] = useState(() => {
        if (savedState?.dateRangeFilter) {
            return savedState.dateRangeFilter
        }
        return {
            start: dateRange.start || '',
            end: dateRange.end || '',
        }
    })

    // Persist state to sessionStorage with debounce for better performance
    useEffect(() => {
        if (!storageKey) return
        
        const timer = setTimeout(() => {
            const state = {
                searchValue: debouncedSearchValue,
                pendingColumnFilters,
                columnFilters,
                dateRangeFilter,
            }
            saveTableState(storageKey, state)
        }, 300) // Debounce for 300ms
        
        return () => clearTimeout(timer)
    }, [storageKey, debouncedSearchValue, pendingColumnFilters, columnFilters, dateRangeFilter])

    // Debounce global search
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setDebouncedSearchValue(searchValue)
    //     }, 300)
    //     return () => clearTimeout(timer)
    // }, [searchValue])

    // Handle immediate search (on button click or Enter)
    const handleSearch = useCallback(() => {
        setDebouncedSearchValue(searchValue)
        
        // Apply pending column filters — only for non-server-side columns
        const appliedFilters = []
        Object.entries(pendingColumnFilters).forEach(([columnId, value]) => {
            if (externalColumnFilters[columnId]?.serverSide) return
            if (value && value !== 'all') {
                appliedFilters.push({ id: columnId, value })
            }
        })
        setColumnFilters(appliedFilters)
    }, [searchValue, pendingColumnFilters, externalColumnFilters])

    // Handle column filter changes (just updates UI, doesn't apply filter yet)
    const handleColumnFilterChange = useCallback((columnId, value) => {
        setPendingColumnFilters((prev) => {
            if (!value || value === 'all') {
                const { [columnId]: removed, ...rest } = prev
                return rest
            }
            return { ...prev, [columnId]: value }
        })
    }, [])

    // Handle date range changes
    const handleDateRangeChange = useCallback((field, value) => {
        setDateRangeFilter((prev) => ({ ...prev, [field]: value }))
    }, [])

    // Handle reset - restore to default values
    const handleReset = useCallback(() => {
        // Clear search (no default for search)
        setSearchValue('')
        setDebouncedSearchValue('')
        
        // Reset column filters to their default values
        const defaultPendingFilters = {}
        const defaultAppliedFilters = []
        
        Object.entries(externalColumnFilters).forEach(([columnId, config]) => {
            if (config.value && config.value !== 'all') {
                defaultPendingFilters[columnId] = config.value
                if (!config.serverSide) {
                    defaultAppliedFilters.push({ id: columnId, value: config.value })
                }
            }
        })
        
        setPendingColumnFilters(defaultPendingFilters)
        setColumnFilters(defaultAppliedFilters)
        
        // Reset date range to defaults
        setDateRangeFilter({
            start: dateRange.start || '',
            end: dateRange.end || '',
        })
        
        // Update sessionStorage with default values
        if (storageKey) {
            const defaultState = {
                searchValue: '',
                debouncedSearchValue: '',
                pendingColumnFilters: defaultPendingFilters,
                columnFilters: defaultAppliedFilters,
                dateRangeFilter: {
                    start: dateRange.start || '',
                    end: dateRange.end || '',
                },
            }
            saveTableState(storageKey, defaultState)
        }
    }, [storageKey, dateRange, externalColumnFilters])

    // Custom global filter function for TanStack Table
    const globalFilterFn = useCallback(
        (row, columnId, filterValue) => {
            if (!filterValue) return true
            if (globalFilterColumns.length === 0) return true

            const searchTerm = filterValue.toLowerCase()
            return globalFilterColumns.some((colId) => {
                const cellValue = row.getValue(colId)
                return cellValue
                    ? String(cellValue).toLowerCase().includes(searchTerm)
                    : false
            })
        },
        [globalFilterColumns]
    )

    // Date range filter function
    const dateRangeFilterFn = useCallback(
        (row) => {
            // When serverSide is true, the server handles filtering — always show all rows client-side
            if (dateRange.serverSide) return true

            if (!dateRange.column || (!dateRangeFilter.start && !dateRangeFilter.end)) {
                return true
            }

            const cellValue = row.getValue(dateRange.column)
            if (!cellValue) return true

            const cellDateObj = new Date(cellValue)
            cellDateObj.setHours(0, 0, 0, 0)
            const cellDate = cellDateObj.getTime()

            const startDate = dateRangeFilter.start
                ? new Date(dateRangeFilter.start).setHours(0, 0, 0, 0)
                : null
            const endDate = dateRangeFilter.end
                ? new Date(dateRangeFilter.end).setHours(0, 0, 0, 0)
                : null

            if (startDate && cellDate < startDate) return false
            if (endDate && cellDate > endDate) return false

            return true
        },
        [dateRangeFilter, dateRange.column]
    )

    // Check if any filters are active
    const hasFilters = useMemo(
        () =>
            globalFilterColumns.length > 0 ||
            dateRange.column ||
            Object.keys(externalColumnFilters).length > 0,
        [globalFilterColumns.length, dateRange.column, externalColumnFilters]
    )

    return {
        // State
        searchValue,
        debouncedSearchValue,
        columnFilters,
        pendingColumnFilters,
        dateRangeFilter,
        hasFilters,

        // Handlers
        setSearchValue,
        handleSearch,
        handleColumnFilterChange,
        handleDateRangeChange,
        handleReset,
        setColumnFilters,

        // Filter functions for TanStack Table
        globalFilterFn,
        dateRangeFilterFn,
    }
}
