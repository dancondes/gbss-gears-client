import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

function TableSearchBar({ value, onChange, placeholder, searchFields = [] }) {
    const searchPlaceholder = useMemo(() => {
        if (placeholder) return placeholder
        if (searchFields.length > 0) {
            const fieldLabels = searchFields.map(f => f.label).join(', ')
            return `Search in ${fieldLabels}...`
        }
        return 'Search...'
    }, [placeholder, searchFields])

    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 p-4">
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    )
}

TableSearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    searchFields: PropTypes.arrayOf(
        PropTypes.shape({
            fieldName: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    )
}

export default TableSearchBar
