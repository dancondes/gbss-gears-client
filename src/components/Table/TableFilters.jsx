import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Toggle from '../form/Toggle'
import { formatLabel } from '@/utilities'

const TableFilters = ({
    globalFilterColumns = [],
    searchValue,
    onSearchChange,
    onSearchSubmit,
    onReset,
    dateRangeColumn,
    dateRangeFilter,
    onDateRangeChange,
    dateRangeStartHidden = false,
    dateRangeEndHidden = false,
    pendingColumnFilters = {},
    externalColumnFilters = {},
    onColumnFilterChange,
    showToggle: { toggleState, onToggleChange, toggleLabel, toggleDescription } = {}
}) => {
    const [typeaheadStates, setTypeaheadStates] = useState({})
    const wrapperRefs = useRef({})
    const inputRefs = useRef({})
    const listRefs = useRef({})

    function getTypeaheadState(columnId) {
        return typeaheadStates[columnId] || {
            isOpen: false,
            searchTerm: '',
            highlightedIndex: -1,
            dropdownPosition: null
        }
    }

    function setTypeaheadState(columnId, updates) {
        setTypeaheadStates(prev => ({
            ...prev,
            [columnId]: {
                ...(prev[columnId] || { isOpen: false, searchTerm: '', highlightedIndex: -1, dropdownPosition: null }),
                ...updates
            }
        }))
    }

    useEffect(() => {
        function handleClickOutside(event) {
            Object.keys(wrapperRefs.current).forEach(columnId => {
                const wrapperRef = wrapperRefs.current[columnId]
                if (wrapperRef && !wrapperRef.contains(event.target)) {
                    const state = getTypeaheadState(columnId)
                    if (state.isOpen) {
                        setTypeaheadState(columnId, { isOpen: false })
                    }
                }
            })
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [typeaheadStates])

    useEffect(() => {
        Object.entries(externalColumnFilters).forEach(([columnId, filterConfig]) => {
            if (filterConfig.type === 'typeahead') {
                const filterValue = pendingColumnFilters[columnId]

                // Determine what the search term should be
                let expectedSearchTerm = ''

                // Check if there's an active filter value
                if (filterValue && filterValue !== 'all') {
                    const selectedOption = filterConfig.options?.find(opt => opt.value === filterValue)
                    if (selectedOption) {
                        expectedSearchTerm = selectedOption.label
                    }
                } else {
                    // No active filter, check for default value
                    const defaultValue = filterConfig.value
                    if (defaultValue && defaultValue !== 'all') {
                        const defaultOption = filterConfig.options?.find(opt => opt.value === defaultValue)
                        if (defaultOption) {
                            expectedSearchTerm = defaultOption.label
                        }
                    }
                }

                // Always update when filters change (from Clear button or Search)
                setTypeaheadState(columnId, { searchTerm: expectedSearchTerm })
            }
        })
    }, [pendingColumnFilters, externalColumnFilters])

    useEffect(() => {
        Object.entries(typeaheadStates).forEach(([columnId, state]) => {
            if (state.highlightedIndex >= 0 && listRefs.current[columnId]) {
                const listElement = listRefs.current[columnId]
                const highlightedElement = listElement?.children[state.highlightedIndex]
                if (highlightedElement) {
                    highlightedElement.scrollIntoView({ block: 'nearest' })
                }
            }
        })
    }, [typeaheadStates])

    function handleTypeaheadInputChange(columnId, value) {
        setTypeaheadState(columnId, {
            searchTerm: value,
            isOpen: true,
            highlightedIndex: -1
        })

        if (!value) {
            onColumnFilterChange(columnId, 'all')
        }
    }

    function handleTypeaheadInputFocus(columnId) {
        const inputElement = inputRefs.current[columnId]
        if (inputElement) {
            const rect = inputElement.getBoundingClientRect()
            setTypeaheadState(columnId, {
                isOpen: true,
                dropdownPosition: {
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width
                }
            })
        }
    }

    function handleTypeaheadInputBlur(columnId, filterConfig) {
        setTimeout(() => {
            const state = getTypeaheadState(columnId)
            const filterValue = pendingColumnFilters[columnId] || 'all'

            setTypeaheadState(columnId, { isOpen: false })

            const matchingOption = filterConfig.options?.find(opt => opt.label === state.searchTerm)
            if (!matchingOption) {
                if (filterValue !== 'all') {
                    const previousOption = filterConfig.options?.find(opt => opt.value === filterValue)
                    if (previousOption) {
                        setTypeaheadState(columnId, { searchTerm: previousOption.label })
                    } else {
                        setTypeaheadState(columnId, { searchTerm: '' })
                    }
                } else {
                    setTypeaheadState(columnId, { searchTerm: '' })
                }
            }
        }, 200)
    }

    function handleTypeaheadKeyDown(e, columnId, filterConfig) {
        const state = getTypeaheadState(columnId)
        const filteredOptions = getFilteredOptions(columnId, filterConfig)

        if (!state.isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            setTypeaheadState(columnId, { isOpen: true })
            e.preventDefault()
            return
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setTypeaheadState(columnId, {
                    highlightedIndex: state.highlightedIndex < filteredOptions.length - 1
                        ? state.highlightedIndex + 1
                        : state.highlightedIndex
                })
                break
            case 'ArrowUp':
                e.preventDefault()
                setTypeaheadState(columnId, {
                    highlightedIndex: state.highlightedIndex > 0 ? state.highlightedIndex - 1 : 0
                })
                break
            case 'Enter':
                e.preventDefault()
                if (state.highlightedIndex >= 0 && filteredOptions[state.highlightedIndex]) {
                    const option = filteredOptions[state.highlightedIndex]
                    handleTypeaheadSelectOption(columnId, option)
                }
                break
            case 'Escape':
                setTypeaheadState(columnId, { isOpen: false })
                inputRefs.current[columnId]?.blur()
                break
            default:
                break
        }
    }

    function handleTypeaheadSelectOption(columnId, option) {
        setTypeaheadState(columnId, {
            searchTerm: option.label,
            isOpen: false,
            highlightedIndex: -1
        })
        onColumnFilterChange(columnId, option.value)
    }

    function handleTypeaheadClear(e, columnId) {
        e.preventDefault()
        e.stopPropagation()
        onColumnFilterChange(columnId, 'all')
        setTypeaheadState(columnId, {
            searchTerm: '',
            highlightedIndex: -1,
            isOpen: true
        })
        setTimeout(() => {
            inputRefs.current[columnId]?.focus()
        }, 0)
    }

    function handleTypeaheadDropdownToggle(columnId) {
        const state = getTypeaheadState(columnId)
        const inputElement = inputRefs.current[columnId]

        if (!state.isOpen && inputElement) {
            const rect = inputElement.getBoundingClientRect()
            setTypeaheadState(columnId, {
                isOpen: true,
                dropdownPosition: {
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width
                }
            })
        } else {
            setTypeaheadState(columnId, { isOpen: false })
        }
    }

    function getFilteredOptions(columnId, filterConfig) {
        const state = getTypeaheadState(columnId)
        return filterConfig.options?.filter(option =>
            option.label.toLowerCase().includes(state.searchTerm.toLowerCase())
        ) || []
    }

    return (
        <div className="flex flex-col gap-2">
            {onToggleChange && (
                <div
                    className="flex items-center justify-end"
                >
                    <Toggle
                        id="showSubmenuOnHover"
                        checked={toggleState}
                        onChange={onToggleChange}
                        label={toggleLabel || 'Toggle Option'}
                        description={toggleDescription}
                        className="mt-2.5"
                        popoverDescription
                        textOnLeft
                    />
                </div>
            )}

            <div className="flex flex-wrap gap-3 items-end">
                {/* Global Search Input */}
                {globalFilterColumns.length > 0 && (
                    <div className="flex-1 min-w-64">
                        <label
                            htmlFor="global-filter"
                            className="inline-block text-xs font-medium text-gray-700 mb-1"
                        >
                            Search
                        </label>
                        <input
                            type="text"
                            id="global-filter"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSearchSubmit()}
                            placeholder={`Search by ${formatLabel(globalFilterColumns)}...`}
                            title={`Searchable columns: ${formatLabel(globalFilterColumns)}`}
                            className="appearance-none rounded relative block w-full px-2 py-1 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                        />
                    </div>
                )}

                {/* Date Range Filter */}
                {dateRangeColumn && (
                    <>
                        {!dateRangeStartHidden && (
                            <div className="flex-1 min-w-40">
                                <label
                                    htmlFor="date-range-start"
                                    className="inline-block text-xs font-medium text-gray-700 mb-1"
                                >
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    id="date-range-start"
                                    value={dateRangeFilter.start}
                                    onChange={(e) => onDateRangeChange('start', e.target.value)}
                                    className="appearance-none rounded relative block w-full px-2 py-1 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm cursor-pointer"
                                />
                            </div>
                        )}
                        {!dateRangeEndHidden && (
                            <div className="flex-1 min-w-40">
                                <label
                                    htmlFor="date-range-end"
                                    className="inline-block text-xs font-medium text-gray-700 mb-1"
                                >
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    id="date-range-end"
                                    value={dateRangeFilter.end}
                                    onChange={(e) => onDateRangeChange('end', e.target.value)}
                                    className="appearance-none rounded relative block w-full px-2 py-1 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm cursor-pointer"
                                />
                            </div>
                        )}
                    </>
                )}

                {Object.entries(externalColumnFilters).map(([columnId, filterConfig]) => {
                    const filterValue = pendingColumnFilters[columnId] || 'all'
                    const typeaheadState = getTypeaheadState(columnId)
                    const filteredOptions = filterConfig.type === 'typeahead' ? getFilteredOptions(columnId, filterConfig) : []

                    return (
                        <div
                            key={columnId}
                            className={`flex-1 min-w-40 ${filterConfig.type === 'typeahead' ? 'relative' : ''}`}
                            ref={el => {
                                if (filterConfig.type === 'typeahead') {
                                    wrapperRefs.current[columnId] = el
                                }
                            }}
                        >
                            <label
                                htmlFor={`filter-${columnId}`}
                                className="inline-block text-xs font-medium text-gray-700 mb-1"
                            >
                                {filterConfig.label}
                            </label>

                            {filterConfig.type === 'date' && (
                                <input
                                    type="date"
                                    id={`filter-${columnId}`}
                                    value={filterValue === 'all' ? '' : filterValue}
                                    onChange={(e) =>
                                        onColumnFilterChange(columnId, e.target.value || 'all')
                                    }
                                    className="appearance-none rounded relative block w-full px-2 py-1 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm cursor-pointer"
                                />
                            )}

                            {filterConfig.type === 'typeahead' && (
                                <>
                                    <div className="relative">
                                        <input
                                            ref={el => {
                                                inputRefs.current[columnId] = el
                                            }}
                                            type="text"
                                            id={`filter-${columnId}`}
                                            value={typeaheadState.searchTerm}
                                            onChange={(e) => handleTypeaheadInputChange(columnId, e.target.value, filterConfig)}
                                            onFocus={() => handleTypeaheadInputFocus(columnId)}
                                            onBlur={() => handleTypeaheadInputBlur(columnId, filterConfig)}
                                            onKeyDown={(e) => handleTypeaheadKeyDown(e, columnId, filterConfig)}
                                            placeholder={filterConfig.placeholder || 'Type to search...'}
                                            autoComplete="off"
                                            className="appearance-none rounded relative block w-full px-2 py-1 pr-14 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                                        />

                                        <div className="absolute inset-y-0 right-0 flex items-center z-20">
                                            {typeaheadState.searchTerm && (
                                                <button
                                                    type="button"
                                                    onMouseDown={(e) => handleTypeaheadClear(e, columnId)}
                                                    className="px-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                                                    tabIndex={-1}
                                                >
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleTypeaheadDropdownToggle(columnId)}
                                                className="px-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                                tabIndex={-1}
                                            >
                                                <svg
                                                    className={`h-4 w-4 transition-transform ${typeaheadState.isOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {typeaheadState.isOpen && typeaheadState.dropdownPosition && (
                                        <div
                                            style={{
                                                position: 'fixed',
                                                top: `${typeaheadState.dropdownPosition.top}px`,
                                                left: `${typeaheadState.dropdownPosition.left}px`,
                                                width: `${typeaheadState.dropdownPosition.width}px`,
                                                zIndex: 9999
                                            }}
                                            className="mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                                        >
                                            {filteredOptions.length > 0 ? (
                                                <ul
                                                    ref={el => {
                                                        listRefs.current[columnId] = el
                                                    }}
                                                    className="py-1"
                                                >
                                                    {filteredOptions.map((option, index) => (
                                                        <li
                                                            key={option.value}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault()
                                                                handleTypeaheadSelectOption(columnId, option)
                                                            }}
                                                            className={`px-2 py-1 cursor-pointer text-sm ${typeaheadState.highlightedIndex === index
                                                                ? 'bg-primary text-white'
                                                                : filterValue === option.value
                                                                    ? 'bg-primary/10 text-primary'
                                                                    : 'text-gray-900 hover:bg-gray-100'
                                                                }`}
                                                            onMouseEnter={() => setTypeaheadState(columnId, { highlightedIndex: index })}
                                                        >
                                                            {option.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="px-2 py-1 text-sm text-gray-500">
                                                    No options found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                            {!filterConfig.type && (
                                <select
                                    id={`filter-${columnId}`}
                                    value={filterValue}
                                    onChange={(e) => onColumnFilterChange(columnId, e.target.value)}
                                    className="appearance-none rounded relative block w-full px-2 py-1 border border-tertiary placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm cursor-pointer"
                                >
                                    {!filterConfig.noAll && (
                                        <option value="all">{filterConfig.allLabel || `All ${filterConfig.label}`}</option>
                                    )}
                                    {filterConfig.customOptions && filterConfig.customOptions.length > 0 && (
                                        <>
                                            {filterConfig.customOptions.map((customOption) => (
                                                <option key={customOption.label} value={customOption.label}>
                                                    {customOption.label}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                    {filterConfig.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:justify-end">
                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 cursor-pointer transition-all duration-200 shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Clear Filters</span>
                </button>
                <button
                    type="button"
                    onClick={onSearchSubmit}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                </button>
            </div>
        </div>
    )
}

TableFilters.propTypes = {
    globalFilterColumns: PropTypes.arrayOf(PropTypes.string),
    searchValue: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    dateRangeColumn: PropTypes.string,
    dateRangeFilter: PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
    }),
    onDateRangeChange: PropTypes.func,
    dateRangeStartHidden: PropTypes.bool,
    dateRangeEndHidden: PropTypes.bool,
    pendingColumnFilters: PropTypes.object,
    externalColumnFilters: PropTypes.object,
    onColumnFilterChange: PropTypes.func,
    showToggle: PropTypes.shape({
        toggleState: PropTypes.bool.isRequired,
        onToggleChange: PropTypes.func.isRequired,
        toggleLabel: PropTypes.string,
        toggleDescription: PropTypes.string,
    })
}

export default React.memo(TableFilters)
