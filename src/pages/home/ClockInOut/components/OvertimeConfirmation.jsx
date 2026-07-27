import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'

function ClockIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    )
}

function OvertimeConfirmation({
    isOpen,
    onClose,
    onOkay,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            title="Overtime Confirmation"
        >
            <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                        <ClockIcon />
                    </div>

                    <div className="flex flex-col gap-4 pt-1 text-sm text-gray-600">
                        <p>
                            The system has now enabled the functionality to log Overtime hours. If you need to record Overtime, please ensure it is entered in the system promptly.
                        </p>

                        <div className="flex flex-col gap-2.5 rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Key points to remember
                            </p>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-start gap-2.5">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                    <p className="text-gray-700">
                                        Overtime can only be entered after performing the checkout process.
                                    </p>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                    <p className="text-gray-700">
                                        Ensure all Overtime hours are logged same day within the timeframe for accurate tracking and processing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p>Please adhere to these guidelines to ensure smooth and accurate Overtime reporting.</p>
                    </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-4">
                    <button
                        className="btn-primary"
                        onClick={onOkay}
                    >
                        Okay
                    </button>
                </div>
            </div>
        </Modal>
    )
}

OvertimeConfirmation.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOkay: PropTypes.func.isRequired,
}

export default OvertimeConfirmation