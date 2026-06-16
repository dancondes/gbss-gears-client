import React from 'react'
import PropTypes from 'prop-types'

function PageTemplate({
    title,
    subtitle,
    children,
    hasBorder = false,
    mutate,
    rightSide
}) {
    function handleRefreshClick() {
        if (mutate) {
            mutate()
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center mb-2">
                <div className="">
                    <div className="flex items-center gap-1">
                        <h1 className="text-xl font-bold text-primary">{title}</h1>
                        {mutate && (
                            <button
                                type="button"
                                className="inline-flex h-7 w-7 -translate-y-px items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer"
                                title="Refresh the table list below"
                                aria-label="Refresh the table list below"
                                onClick={handleRefreshClick}
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-sm text-gray-600 mt-0.5" title={subtitle?.hoverText || null}>
                            {subtitle?.text || subtitle}
                        </p>
                    )}
                </div>

                {
                    rightSide && (
                        <rightSide />
                    )
                }
            </div>
            <div className={hasBorder ? 'rounded-2xl border border-slate-200 bg-white p-2' : ''}>
                {children || (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            {title}
                        </h3>
                        <p className="text-gray-500">
                            This page is under construction. Content will be added soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

PageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    hasBorder: PropTypes.bool,
    mutate: PropTypes.func,
    rightSide: PropTypes.elementType
}

export default PageTemplate
