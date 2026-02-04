import React from 'react'
import PropTypes from 'prop-types'

function PageTemplate({ title, children }) {
    return (
        <div className="container-width px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {children || (
                    <p className="text-gray-600 text-center py-8">
                        {title} page is coming soon.
                    </p>
                )}
            </div>
        </div>
    )
}

PageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default PageTemplate
