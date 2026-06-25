import React from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '@/components/PageTemplate'

function NoDataFound({ title, entityName }) {
    const label = entityName.charAt(0).toUpperCase() + entityName.slice(1)

    return (
        <PageTemplate title={title} hasBorder={false}>
            <div className="flex flex-col items-center justify-center py-16">
                <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {label} Not Found
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                    The {entityName} you are looking for does not exist or may have been removed.
                </p>
            </div>
        </PageTemplate>
    )
}

NoDataFound.propTypes = {
    title: PropTypes.string.isRequired,
    entityName: PropTypes.string.isRequired
}

export default NoDataFound
