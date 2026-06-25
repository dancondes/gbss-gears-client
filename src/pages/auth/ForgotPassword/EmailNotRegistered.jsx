import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function EmailNotRegistered({ submittedEmail }) {
    return (
        <div className="mt-8 space-y-6">
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                    Email Not Registered
                </h3>
                <p className="text-sm text-tertiary mb-4">
                    The email <span className="font-medium text-primary">{submittedEmail}</span> is not yet registered in our system.
                </p>
                <p className="text-sm text-tertiary mb-6">
                    Please create an account to get started. It only takes a few minutes!
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left space-y-2">
                    <p className="text-xs text-red-800">
                        <strong>What&apos;s next:</strong> Click the button below to sign up and create your account. Follow the necessary steps to complete your registration.
                    </p>
                </div>
            </div>

            <div>
                <Link
                    to="/register"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors cursor-pointer"
                >
                    Sign Up Now
                </Link>
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

EmailNotRegistered.propTypes = {
    submittedEmail: PropTypes.string.isRequired
}

export default EmailNotRegistered
