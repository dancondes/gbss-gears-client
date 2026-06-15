import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Alert from '@/components/Alert'

function EmailNotVerified({ submittedEmail, formError, verificationLoading, onSendVerification }) {
    return (
        <div className="mt-8 space-y-6">
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                    <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                    Email Not Yet Verified
                </h3>
                <p className="text-sm text-tertiary mb-4">
                    Your email <span className="font-medium text-primary">{submittedEmail}</span> has not been verified yet.
                </p>
                <p className="text-sm text-tertiary mb-6">
                    Please verify your email first before you can reset your password. We&apos;ll send you a verification link.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left space-y-2">
                    <p className="text-xs text-yellow-800">
                        <strong>What&apos;s next:</strong> Click the button below to receive a verification email. Once you verify your email, you&apos;ll be able to reset your password.
                    </p>
                </div>
            </div>

            {formError && (
                <Alert text={formError} type="error" />
            )}

            <div>
                <button
                    onClick={onSendVerification}
                    disabled={verificationLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors cursor-pointer"
                >
                    {verificationLoading ? 'Sending...' : 'Send Verification Link'}
                </button>
            </div>

            <div>
                <Link
                    to="/login"
                    className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors cursor-pointer"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    )
}

EmailNotVerified.propTypes = {
    submittedEmail: PropTypes.string.isRequired,
    formError: PropTypes.string,
    verificationLoading: PropTypes.bool.isRequired,
    onSendVerification: PropTypes.func.isRequired
}

export default EmailNotVerified
