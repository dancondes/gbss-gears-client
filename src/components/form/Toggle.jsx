import React, { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const POPOVER_WIDTH = 224 // w-56 = 14rem = 224px
const GAP = 8
const MARGIN = 8

function PopoverPortal({ anchorRef, children }) {
    const popoverRefCallback = useCallback((el) => {
        if (!el || !anchorRef.current) return

        const anchor = anchorRef.current.getBoundingClientRect()

        // Horizontal: center over toggle, clamped to viewport edges
        let left = anchor.left + anchor.width / 2 - POPOVER_WIDTH / 2
        left = Math.max(MARGIN, Math.min(left, window.innerWidth - POPOVER_WIDTH - MARGIN))

        // Vertical: prefer above; use translateY(-100%) so we don't need popover height
        const preferAbove = anchor.top > 140

        el.style.position = 'fixed'
        el.style.left = `${left}px`

        if (preferAbove) {
            el.style.top = `${anchor.top - GAP}px`
            el.style.transform = 'translateY(-100%)'
        } else {
            el.style.top = `${anchor.bottom + GAP}px`
            el.style.transform = 'none'
        }

        el.style.visibility = 'visible'
    }, [anchorRef])

    return createPortal(
        <div
            ref={popoverRefCallback}
            style={{ visibility: 'hidden', position: 'fixed' }}
            className="z-9999 w-56 rounded-md bg-gray-900 px-3 py-2 shadow-lg"
        >
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
        </div>,
        document.body
    )
}

function Toggle({
    id,
    checked,
    onChange,
    disabled = false,
    label,
    description,
    className,
    popoverDescription = false,
    textOnLeft = false,
}) {
    const [showPopover, setShowPopover] = useState(false)
    const toggleRef = useRef(null)

    const TextBlock = (label || (!popoverDescription && description)) && (
        <div className="flex-1">
            {label && (
                <label
                    id={`${id}-label`}
                    htmlFor={id}
                    className={`block text-sm font-medium text-gray-900 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
                    onClick={() => !disabled && onChange(!checked)}
                >
                    {label}
                </label>
            )}
            {!popoverDescription && description && (
                <p id={`${id}-description`} className="text-sm text-gray-500 mt-0.5">
                    {description}
                </p>
            )}
        </div>
    )

    return (
        <div
            className={`flex items-start gap-3 ${className ?? ''}`}
            onMouseEnter={() => popoverDescription && setShowPopover(true)}
            onMouseLeave={() => popoverDescription && setShowPopover(false)}
        >
            {textOnLeft && TextBlock}

            <div
                ref={toggleRef}
                className="relative"
            >
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-labelledby={label ? `${id}-label` : undefined}
                    aria-describedby={description ? `${id}-description` : undefined}
                    disabled={disabled}
                    onClick={() => onChange(!checked)}
                    className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${checked ? 'bg-primary' : 'bg-gray-300'}
                    `}
                >
                    <span
                        className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${checked ? 'translate-x-6' : 'translate-x-1'}
                        `}
                    />
                </button>

                {popoverDescription && showPopover && description && (
                    <PopoverPortal anchorRef={toggleRef}>
                        <p id={`${id}-description`} className="text-xs text-gray-300">
                            {description}
                        </p>
                    </PopoverPortal>
                )}
            </div>

            {!textOnLeft && TextBlock}
        </div>
    )
}

Toggle.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    /** Show the description in a hover popover above the toggle instead of inline */
    popoverDescription: PropTypes.bool,
    /** Show label/description to the left of the toggle instead of the right (default: false) */
    textOnLeft: PropTypes.bool,
}

Toggle.displayName = 'Toggle'

export default React.memo(Toggle)
