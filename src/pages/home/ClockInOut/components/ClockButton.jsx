import React from 'react'
import PropTypes from 'prop-types'

function ClockButton({ label, onClick, disabled, small }) {
    if (small) {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className="w-14 px-2 py-1.5 rounded border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
                {label}
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="min-w-30 px-6 py-2 rounded border border-primary/40 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
            {label}
        </button>
    )
}

ClockButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
}

export default ClockButton
