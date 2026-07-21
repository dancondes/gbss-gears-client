import React, { useCallback, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

/**
 * Free-text input with a suggestions dropdown.
 *
 * Unlike TypeaheadSelect (which only accepts a value matching one of its
 * {value, label} options and reverts on blur if the typed text doesn't
 * match a label), this component treats whatever the user types as the
 * value at all times. `options` is a plain array of strings used only to
 * speed up entry — picking a suggestion just fills the input with that
 * string, and typing something not in the list is perfectly valid.
 */
const TypeaheadInput = ({
    name,
    label,
    options = [],
    placeholder = 'Type or select...',
    register,
    control,
    validation,
    error,
    value,
    onChange,
    disabled = false,
    className = '',
    labelClassName = '',
    inputClassName = '',
    autoFocus = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [dropdownPosition, setDropdownPosition] = useState('bottom')
    // Tracked separately from the `value` prop because when this component is
    // wired up via react-hook-form's `control`, the live typed text lives on
    // `field.value` (passed into renderContent), not on the outer `value` prop —
    // so filtering can't rely on `value` alone or it never sees what's typed
    // in Controller mode.
    const [searchTerm, setSearchTerm] = useState(value || '')
    const wrapperRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)

    // Check if field is required from validation rules or props
    const isRequired = typeof validation?.required === 'object' ? validation.required.value : validation?.required

    const handleDropdownToggle = useCallback(() => {
        if (!disabled) {
            setIsOpen(prev => !prev)
        }
    }, [disabled])

    // Calculate dropdown position based on available space
    useEffect(() => {
        if (isOpen && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const dropdownHeight = 240 // max-h-60 = 240px

            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setDropdownPosition('top')
            } else {
                setDropdownPosition('bottom')
            }
        }
    }, [isOpen])

    // Filter options based on the current typed text
    useEffect(() => {
        const term = (searchTerm || '').trim().toLowerCase()

        if (!term) {
            setFilteredOptions(options)
            setHighlightedIndex(-1)
            return
        }

        const filtered = options.filter(option => String(option).toLowerCase().includes(term))
        setFilteredOptions(filtered)
        setHighlightedIndex(-1)
    }, [searchTerm, options])

    // Keep searchTerm in sync when the value changes from outside (e.g. a
    // form reset) in uncontrolled/plain value+onChange mode. In Controller
    // mode this is handled inline where field.value is available (see render).
    useEffect(() => {
        if (!control) {
            setSearchTerm(value || '')
        }
    }, [value, control])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Scroll highlighted option into view
    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const highlightedElement = listRef.current.children[highlightedIndex]
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ block: 'nearest' })
            }
        }
    }, [highlightedIndex])

    const handleInputChange = (e, fieldOnChange) => {
        const newValue = e.target.value
        setSearchTerm(newValue)
        setIsOpen(true)
        if (fieldOnChange) {
            fieldOnChange(newValue)
        }
        if (onChange) {
            onChange(newValue)
        }
    }

    const handleInputFocus = () => {
        setIsOpen(true)
    }

    const handleInputBlur = (fieldOnBlur) => {
        // Small delay to allow option clicks to register.
        // No reverting here — whatever was typed stays as-is.
        setTimeout(() => setIsOpen(false), 200)
        if (fieldOnBlur) {
            fieldOnBlur()
        }
    }

    const selectOption = (option, fieldOnChange) => {
        setSearchTerm(option)
        setIsOpen(false)
        setHighlightedIndex(-1)
        if (fieldOnChange) {
            fieldOnChange(option)
        }
        if (onChange) {
            onChange(option)
        }
        inputRef.current?.focus()
    }

    const handleKeyDown = (e, fieldOnChange) => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            setIsOpen(true)
            e.preventDefault()
            return
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setHighlightedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0))
                break
            case 'Enter':
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    e.preventDefault()
                    selectOption(filteredOptions[highlightedIndex], fieldOnChange)
                }
                // If nothing is highlighted, Enter just submits/does nothing
                // special — the typed text is already the value.
                break
            case 'Escape':
                setIsOpen(false)
                inputRef.current?.blur()
                break
            default:
                break
        }
    }

    const handleClear = (e, fieldOnChange) => {
        e.preventDefault()
        e.stopPropagation()
        setSearchTerm('')
        if (fieldOnChange) {
            fieldOnChange('')
        }
        if (onChange) {
            onChange('')
        }
        setTimeout(() => {
            setIsOpen(true)
            inputRef.current?.focus()
        }, 0)
    }

    const renderContent = (fieldValue, fieldOnChange, fieldOnBlur) => (
        // Positioning context for both the clear/toggle buttons and the
        // options list, so the dropdown stays anchored to the input.
        <div className="relative flex-1">
            <input
                ref={inputRef}
                type="text"
                id={name}
                value={fieldValue || ''}
                onChange={(e) => handleInputChange(e, fieldOnChange)}
                onFocus={handleInputFocus}
                onBlur={() => handleInputBlur(fieldOnBlur)}
                onKeyDown={(e) => handleKeyDown(e, fieldOnChange)}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                autoFocus={autoFocus}
                className={`appearance-none rounded relative block w-full px-2.5 py-1.5 pr-12! border ${
                    error ? 'border-red-500' : 'border-tertiary'
                } placeholder-gray-400 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 text-[13px] disabled:bg-gray-100 disabled:cursor-not-allowed ${inputClassName}`}
            />

            {/* Clear and Dropdown buttons */}
            <div className="absolute inset-y-0 right-0 flex items-center z-20">
                {fieldValue && !disabled && (
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault() // Prevent blur from firing on input
                            handleClear(e, fieldOnChange)
                        }}
                        className="px-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        tabIndex={-1}
                    >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="px-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                    tabIndex={-1}
                    disabled={disabled}
                >
                    <svg
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Suggestions list — hidden entirely when nothing matches the typed
                text, rather than showing an empty "No matching suggestions" panel. */}
            {isOpen && !disabled && filteredOptions.length > 0 && (
                <div className={`absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
                    dropdownPosition === 'top' ? 'bottom-full mb-1' : 'mt-1'
                }`}>
                    <ul ref={listRef} className="py-1">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={option + '_' + index}
                                onMouseDown={(e) => {
                                    e.preventDefault() // Prevent blur from firing
                                    selectOption(option, fieldOnChange)
                                }}
                                className={`px-3 py-2 cursor-pointer text-[13px] ${
                                    highlightedIndex === index
                                        ? 'bg-primary text-white'
                                        : fieldValue === option
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={name}
                    className={`inline-block text-[13px] font-medium text-gray-700 mb-1 ${labelClassName}`}
                >
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* flex-col wrapper keeps the field control and its error message
                stacked vertically, isolated from a parent's own flex layout. */}
            <div className="flex flex-col flex-1 min-w-0">
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validation}
                        render={({ field }) => {
                            // Keep searchTerm in sync with field.value, since typing calls
                            // field.onChange (updating field.value) and that's also how
                            // external changes (form reset, setValue, etc.) show up here.
                            useEffect(() => {
                                setSearchTerm(field.value || '')
                            }, [field.value])

                            return renderContent(field.value, field.onChange, field.onBlur)
                        }}
                    />
                ) : (
                    <>
                        {register && (
                            <input
                                type="hidden"
                                {...register(name, validation)}
                                value={value || ''}
                            />
                        )}
                        {renderContent(value, onChange)}
                    </>
                )}

                {/* Error message */}
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        </div>
    )
}

TypeaheadInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    register: PropTypes.func,
    control: PropTypes.object,
    validation: PropTypes.object,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    autoFocus: PropTypes.bool,
}

export default TypeaheadInput