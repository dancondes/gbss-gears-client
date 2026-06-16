import React from 'react'
import PropTypes from 'prop-types'

function SectionHeader({ title }) {
    return (
        <div className="flex items-center gap-0">
            <span className="text-sm font-semibold text-primary px-3 py-1">{title}</span>
            <div className="flex-1 h-0.5 bg-primary" />
        </div>
    )
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SectionHeader
