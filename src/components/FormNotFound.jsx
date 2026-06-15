import React from 'react'
import PropTypes from 'prop-types'

function FormNotFound({
    title = 'Form Not Found',
    description = 'This form is not found or does not exist. Contact administrator if you think this is an issue.',
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center text-center py-8">
                <svg className="h-14 w-14 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h4m5-11.25V20.25A1.75 1.75 0 0117.25 22.0H6.75A1.75 1.75 0 015 20.25V3.75A1.75 1.75 0 016.75 2H14.5l4.5 4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 2V6.5H19" />
                </svg>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-sm text-gray-600 max-w-xl">{description}</p>
            </div>
        </div>
    )
}

FormNotFound.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default FormNotFound