import React from 'react'
import PropTypes from 'prop-types'

function CombinedCheckoutButton({ label, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex flex-col items-center justify-center w-full px-2 py-2 rounded border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 text-center leading-snug"
        >
            {label.split('\n').map(function (line, i) {
                return <span key={i}>{line}</span>
            })}
        </button>
    )
}

CombinedCheckoutButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default CombinedCheckoutButton
