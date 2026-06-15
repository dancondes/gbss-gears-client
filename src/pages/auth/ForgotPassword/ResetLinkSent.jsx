import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ResetLinkSent({ submittedEmail }) {
    return (
        <div className="mt-8 space-y-6">
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                    Reset Link Sent!
                </h3>
                <p className="text-sm text-tertiary mb-4">
                    We&apos;ve sent a password reset link to <span className="font-medium text-primary">{submittedEmail}</span>
                </p>
                <p className="text-sm text-tertiary mb-6">
                    Please check your email and click the link to reset your password.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left space-y-2">
                    <p className="text-xs text-blue-800">
                        <strong>Note:</strong> The reset link will expire in 24 hours.
                    </p>
                    <p className="text-xs text-blue-800">
                        If you don&apos;t receive the email within a few minutes, please check your spam folder.
                    </p>
                </div>
            </div>

            <div>
                <Link
                    to="/login"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors cursor-pointer"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    )
}

ResetLinkSent.propTypes = {
    submittedEmail: PropTypes.string.isRequired
}

export default ResetLinkSent
