import React from 'react'
import PropTypes from 'prop-types'

function AwardIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="8" r="6" />
            <path d="M9 13.5 7.5 22l4.5-2.5 4.5 2.5L15 13.5" />
        </svg>
    )
}

function AnniversarySection({ data }) {
    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                    <AwardIcon className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 tracking-wide">
                    Work Anniversaries
                </h4>
            </div>

            {!data || data.length === 0 ? (
                <p className="text-sm text-gray-400 pl-10">No anniversaries today.</p>
            ) : (
                <ul className="pl-10 space-y-1">
                    {data.map((person, index) => (
                        <li
                            key={`${person.name}-${index}`}
                            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-sm text-gray-700 font-semibold">{person.name},</span>
                                {person.account && (
                                    <span className="text-xs text-gray-400">{person.account}</span>
                                )}
                            </span>
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                {person.years} {person.years === 1 ? 'yr' : 'yrs'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

AnniversarySection.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            account: PropTypes.string,
            years: PropTypes.number.isRequired,
        })
    ),
}

export default AnniversarySection