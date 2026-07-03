import React from 'react'
import PropTypes from 'prop-types'

function GiftIcon(props) {
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
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8" />
      <path d="M16.5 8a2.5 2.5 0 0 0 0-5C14 3 12 8 12 8" />
    </svg>
  )
}

function BirthdaySection({ data }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
          <GiftIcon className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold text-gray-800 tracking-wide">
          Birthdays
        </h4>
      </div>

      {!data || data.length === 0 ? (
        <p className="text-sm text-gray-400 pl-10">No birthdays today.</p>
      ) : (
        <ul className="pl-10 space-y-1">
          {data.map((person, index) => (
            <li
              key={`${person.name}-${index}`}
              className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm text-gray-700 font-semibold">{person.name},</span>
              {person.account && (
                <span className="text-xs text-gray-400">{person.account}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

BirthdaySection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      account: PropTypes.string,
    })
  ),
}

export default BirthdaySection