import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    fullScreen = false,
    size = '2xl', // 'sm', 'md', 'lg', 'xl', '2xl', 'full'
    showCloseButton = true,
    closeOnBackdropClick = false,
    className = '',
    closeOnEsc = true,
}) => {
    const [isShaking, setIsShaking] = useState(false)

    useEffect(() => {
        function handleEscapeKey(event) {
            if (closeOnEsc && event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen, onClose, closeOnEsc])

    if (!isOpen) return null

    // Size classes for non-fullscreen modals with better mobile responsiveness
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '75vw': 'max-w-[75vw]',
        '80vw': 'max-w-[80vw]',
        full: 'max-w-full',
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            if (closeOnBackdropClick) {
                onClose()
            } else {
                // Trigger shake animation
                setIsShaking(true)
                setTimeout(() => setIsShaking(false), 300)
            }
        }
    }

    return (
        createPortal(
            <div className="fixed inset-0 z-100 overflow-y-auto">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    onClick={handleBackdropClick}
                />

                {/* Modal Container */}
                {fullScreen ? (
                    <div className="relative min-h-screen w-full bg-white">
                        {/* Header with Close Button */}
                        {(title || showCloseButton) && (
                            <div className="sticky top-0 flex items-center justify-between p-2 sm:p-3 border-b border-gray-200 bg-white z-10">
                                {title && (
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className={`text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0 ${!title ? 'ml-auto' : 'ml-4'
                                            }`}
                                        aria-label="Close modal"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-4 sm:p-6">{children}</div>
                    </div>
                ) : (
                    <div
                        className="flex min-h-full items-center justify-center py-8 px-3"
                        onClick={handleBackdropClick}
                    >
                        {/* Modal Content */}
                        <div
                            className={`relative bg-white shadow-xl rounded-lg ${sizeClasses[size] || sizeClasses.md
                                } w-full min-w-[90vw] sm:min-w-0 mx-2 sm:mx-0 ${className} ${isShaking ? 'animate-shake' : ''}`}
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
                            {/* Header with Close Button */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                                    {title && (
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                            {title}
                                        </h2>
                                    )}
                                    {showCloseButton && (
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className={`text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0 ${!title ? 'ml-auto' : 'ml-4'
                                                }`}
                                            aria-label="Close modal"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-4 sm:p-6">{children}</div>
                        </div>
                    </div>
                )}
            </div>,
            document.getElementById('modal-root')
        )
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full']),
    showCloseButton: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
}

export default Modal