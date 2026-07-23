// AcronymBreakdown.jsx
import React from 'react'
import PropTypes from 'prop-types'

const AcronymBreakdown = ({ items }) => {
    return (
        <p className="text-sm text-gray-500 flex flex-wrap justify-center gap-x-1.5">
            {items.map(function (item) {
                return (
                    <span key={item.letter}>
                        <span className="font-semibold text-primary text-[15px]">{item.letter.charAt(0)}</span>
                        {item.letter.slice(1)}
                    </span>
                )
            })}
        </p>
    )
}

AcronymBreakdown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        letter: PropTypes.string.isRequired,
    })).isRequired,
}

export default AcronymBreakdown