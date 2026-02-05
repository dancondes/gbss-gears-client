import React from 'react'
import PropTypes from 'prop-types'

function TableSearchBar({ value, onChange, placeholder = 'Search...' }) {
    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 p-4">
            <input
                type="text"
                placeholder={placeholder}
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
    placeholder: PropTypes.string
}

export default TableSearchBar
