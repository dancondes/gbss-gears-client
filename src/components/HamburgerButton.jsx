import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

// ---------------------------------------------------------------------------
// HamburgerButton – animated hamburger/close icon, mobile-only trigger.
// Forwards its ref so the drawer can return focus here when it closes.
// ---------------------------------------------------------------------------

const HamburgerButton = forwardRef(function HamburgerButton({ isOpen, onClick, size = 'sm' }, ref) {
    // Two preset sizes for the icon itself. The button's own padding still
    // keeps a ~40px+ tap target even when the icon is small.
    const iconSizes = {
        sm: { box: 'h-3 w-3.5', bar: 'w-3.5', mid: 'top-1.5', bottom: 'top-3' },
        md: { box: 'h-4 w-5', bar: 'w-5', mid: 'top-2', bottom: 'top-4' },
    }
    const { box, bar, mid, bottom } = iconSizes[size] || iconSizes.sm

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="md:hidden relative h-8 w-8 flex items-center justify-center text-white rounded-md active:bg-white/10 focus:outline-none"
        >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={['relative block', box].join(' ')}>
                <span
                    className={[
                        'absolute left-0 h-0.5 bg-white rounded-full transition-all duration-300',
                        bar,
                        isOpen ? `${mid} rotate-45` : 'top-0 rotate-0',
                    ].join(' ')}
                />
                <span
                    className={[
                        'absolute left-0 h-0.5 bg-white rounded-full transition-opacity duration-200',
                        bar,
                        mid,
                        isOpen ? 'opacity-0' : 'opacity-100',
                    ].join(' ')}
                />
                <span
                    className={[
                        'absolute left-0 h-0.5 bg-white rounded-full transition-all duration-300',
                        bar,
                        isOpen ? `${mid} -rotate-45` : `${bottom} rotate-0`,
                    ].join(' ')}
                />
            </span>
        </button>
    )
})

HamburgerButton.displayName = 'HamburgerButton'

HamburgerButton.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['sm', 'md']),
}

export default HamburgerButton