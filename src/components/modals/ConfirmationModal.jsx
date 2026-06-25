import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ConfirmationModal = ({
    isOpen,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed with this action?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'info', // 'warning', 'danger', 'info', 'success'
    icon = null,
    loading = false,
}) => {
    const [isShaking, setIsShaking] = useState(false)

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 300)
        }
    }

    // Variant-based styling
    const variantStyles = {
        warning: {
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            buttonBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
            defaultIcon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            ),
        },
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-danger',
            buttonBg: 'bg-danger hover:bg-dark-danger focus:ring-dark-danger',
            defaultIcon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            ),
        },
        info: {
            iconBg: 'bg-blue-100',
            iconColor: 'text-primary',
            buttonBg: 'bg-primary hover:bg-dark-primary focus:ring-dark-primary',
            defaultIcon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            ),
        },
        success: {
            iconBg: 'bg-green-100',
            iconColor: 'text-secondary',
            buttonBg: 'bg-secondary hover:bg-dark-secondary focus:ring-dark-secondary',
            defaultIcon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            ),
        },
    }

    const currentVariant = variantStyles[variant] || variantStyles.warning

    return (
        <div className="fixed inset-0 z-100 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={handleBackdropClick}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div 
                    className={`relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 ${isShaking ? 'animate-shake' : ''}`}
                    style={{
                        animation: isShaking ? 'shake 0.3s ease-in-out' : undefined
                    }}
                >
                    <style>{`
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            25%, 75% { transform: translateX(-3px); }
                            50% { transform: translateX(3px); }
                        }
                    `}</style>
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 mx-auto ${currentVariant.iconBg} rounded-full`}>
                        {icon || (
                            <svg
                                className={`w-6 h-6 ${currentVariant.iconColor}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {currentVariant.defaultIcon}
                            </svg>
                        )}
                    </div>

                    {/* Title and Message */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {message}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className={`flex-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${currentVariant.buttonBg} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading ? 'Loading...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['warning', 'danger', 'info', 'success']),
    icon: PropTypes.node,
    loading: PropTypes.bool,
}

export default ConfirmationModal
