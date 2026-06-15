import React from 'react'
import PropTypes from 'prop-types'

function TableFilters({ columnFilters, filterValues, onFilterChange, onApplyFilters }) {
    if (!columnFilters || columnFilters.length === 0) return null

    function handleInputChange(fieldName, value) {
        onFilterChange(fieldName, value)
    }

    function renderFilterInput(filter) {
        const value = filterValues[filter.fieldName] || filter.defaultValue || ''

        switch (filter.type) {
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleInputChange(filter.fieldName, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    >
                        {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )

            case 'date':
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleInputChange(filter.fieldName, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    />
                )

            case 'daterange': {
                const fromValue = filterValues[`${filter.fieldName}_from`] || filter.defaultValue?.from || ''
                const toValue = filterValues[`${filter.fieldName}_to`] || filter.defaultValue?.to || ''
                return (
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={fromValue}
                            onChange={(e) => handleInputChange(`${filter.fieldName}_from`, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="date"
                            value={toValue}
                            onChange={(e) => handleInputChange(`${filter.fieldName}_to`, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                        />
                    </div>
                )
            }

            case 'text':
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(filter.fieldName, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary w-full"
                        placeholder={filter.placeholder || `Filter by ${filter.label}`}
                    />
                )
        }
    }

    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {columnFilters.map((filter) => (
                    <div key={filter.fieldName}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {filter.label}
                        </label>
                        {renderFilterInput(filter)}
                    </div>
                ))}
            </div>

            <button
                onClick={onApplyFilters}
                className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-dark-primary transition-colors cursor-pointer flex items-center gap-2"
            >
                🔍 Filter
            </button>
        </div>
    )
}

TableFilters.propTypes = {
    columnFilters: PropTypes.arrayOf(
        PropTypes.shape({
            fieldName: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'daterange']),
            defaultValue: PropTypes.any,
            exactMatch: PropTypes.bool,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.any.isRequired,
                    label: PropTypes.string.isRequired
                })
            )
        })
    ),
    filterValues: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired
}

export default TableFilters
