import React from 'react'
import PropTypes from 'prop-types'

function AccessRestricted({ pageTitle = '', message = 'You do not have permission to view this content. Please contact your administrator if you need access.', children }) {
    return (
        <div className="flex items-center justify-center min-h-100">
            <div className="text-center max-w-md">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted {pageTitle && `for ${pageTitle}`}</h3>
                <p className="text-gray-600 mb-6">
                    {message}
                </p>
                {children && (
                    <div className="mt-6">
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}

AccessRestricted.propTypes = {
    pageTitle: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.node
}

export default AccessRestricted
