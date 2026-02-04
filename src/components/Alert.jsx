import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({
    text,
    type = 'info',
}) => {
    // Determine icon based on type
    const getIcon = () => {
        switch (type) {
            case 'add':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                )
            case 'edit':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                )
            case 'warning':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )
            case 'error':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'info':
            default:
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
        }
    }

    // Determine styling based on type
    const getStyles = () => {
        switch (type) {
            case 'add':
            case 'edit':
            case 'info':
                return 'text-primary bg-primary/10 border-primary/30'
            case 'warning':
                return 'text-warning bg-warning/10 border-warning/30'
            case 'error':
                return 'text-red-800 bg-red-50 border-red-200'
            default:
                return 'text-primary bg-primary/10 border-primary/30'
        }
    }

    return (
        <div className={`flex items-center gap-2 text-sm rounded-lg px-4 py-2 flex-1 border ${getStyles()}`}>
            {getIcon()}
            <span>{text}</span>
        </div>
    )
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['add', 'edit', 'info', 'warning', 'error']),
}

export default Alert