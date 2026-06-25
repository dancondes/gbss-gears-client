import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

const buttonConfigs = {
    view: {
        title: 'View',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    download: {
        title: 'Download',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        ),
    },
    delete: {
        title: 'Delete',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        ),
    },
    upload: {
        title: 'Upload',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        ),
    },
    edit: {
        title: 'Edit',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        ),
    },
}

function ActionButtonGroup({ rowData = {}, buttons = [], disabled = false }) {
    const validButtons = useMemo(
        () => buttons.filter(button => buttonConfigs[button.type]),
        [buttons]
    )

    const handleButtonClick = useCallback((e, action) => {
        e.stopPropagation()
        if (action && !disabled) {
            action(rowData)
        }
    }, [rowData])

    if (validButtons.length === 0) {
        return null
    }

    return (
        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden p-0.5">
            {validButtons.map(function (button, index) {
                const config = buttonConfigs[button.type]
                return (
                    <button
                        key={index}
                        type="button"
                        onClick={(e) => handleButtonClick(e, button.action)}
                        disabled={disabled}
                        className={`px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${index < validButtons.length - 1 ? 'border-r border-gray-300' : ''}`}
                        title={config.title}
                    >
                        {config.icon}
                    </button>
                )
            })}
        </div>
    )
}

ActionButtonGroup.propTypes = {
    rowData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    }),
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['view', 'download', 'delete', 'upload', 'edit']).isRequired,
            action: PropTypes.func.isRequired,
        })
    ),
    disabled: PropTypes.bool,
}

export default ActionButtonGroup
