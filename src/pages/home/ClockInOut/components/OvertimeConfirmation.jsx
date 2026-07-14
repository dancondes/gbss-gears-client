import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'

function OvertimeConfirmation({
    isOpen,
    onClose,
    onOkay,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            title="Overtime Confirmation"
        >
            <div>
                <div className="flex gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="shrink-0 text-yellow-500"
                    >
                        <path d="M12 2 1 21h22L12 2Zm0 3.83L19.53 19H4.47L12 5.83ZM11 10v4h2v-4h-2Zm0 6v2h2v-2h-2Z" />
                    </svg>

                    <div className="flex flex-col gap-3 text-sm">
                        <p>
                            The system has now enabled the functionality to log Overtime hours. If you need to record Overtime, please ensure it is entered in the system promptly.
                        </p>

                        <div>
                            <p className="font-semibold">Key points to remember:</p>
                            <ol className="list-decimal list-inside">
                                <li>Overtime can only be entered after performing the checkout process.</li>
                                <li>Ensure all Overtime hours are logged same day within the timeframe for accurate tracking and processing.</li>
                            </ol>
                        </div>

                        <p>Please adhere to these guidelines to ensure smooth and accurate Overtime reporting.</p>
                    </div>
                </div>

                <div className="flex justify-end border-t border-gray-200 px-4 pt-3 mt-4">
                    <button
                        className="btn-primary"
                        onClick={onOkay}
                    >
                        OK
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