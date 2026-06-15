import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

/**
 * SessionExpiredModal Component
 * Displays when user's JWT token has expired
 * Informs user to re-login
 */
function SessionExpiredModal({ isOpen, onConfirm }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onConfirm}
            size="md"
            showCloseButton={false}
            closeOnBackdropClick={false}
        >
            <div className="space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full">
                    <svg
                        className="w-6 h-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Title and Message */}
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Session Expired
                    </h3>
                    <p className="text-sm text-gray-500">
                        Your login session has expired. Please login again to continue.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-6 py-2 bg-primary hover:bg-dark-primary text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                    >
                        Login Again
                    </button>
                </div>
            </div>
        </Modal>
    )
}

SessionExpiredModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
}

export default SessionExpiredModal
