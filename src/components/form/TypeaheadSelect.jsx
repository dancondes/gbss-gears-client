import React, { useCallback, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const TypeaheadSelect = ({
    name,
    label,
    options = [],
    placeholder = 'Type to search...',
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
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [dropdownPosition, setDropdownPosition] = useState('bottom')
    const wrapperRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const [controlledValue, setControlledValue] = useState(value)

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

    // Filter options based on search term
    useEffect(() => {
        const term = (searchTerm || '').trim().toLowerCase()

        // If the trimmed search term is empty, show all options
        if (!term) {
            setFilteredOptions(options)
            setHighlightedIndex(-1)
            return
        }

        const filtered = options.filter(option => {
            const label = (option && option.label) ? String(option.label).toLowerCase() : ''
            return label.includes(term)
        })
        setFilteredOptions(filtered)
        setHighlightedIndex(-1)
    }, [searchTerm, options])

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

    // Update search term when value changes
    useEffect(() => {
        const currentValue = controlledValue || value
        if (currentValue) {
            const selectedOption = options.find(opt => opt.value === currentValue)
            if (selectedOption) {
                setSearchTerm(selectedOption.label)
            }
        } else {
            setSearchTerm('')
        }
    }, [controlledValue, value, options])

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

        // Clear selection if input is cleared
        if (!newValue) {
            if (fieldOnChange) {
                fieldOnChange('')
            }
            if (onChange) {
                onChange('')
            }
        }
    }

    const handleInputFocus = () => {
        setIsOpen(true)
    }

    const handleInputBlur = (fieldOnChange, fieldValue) => {
        // Small delay to allow button clicks to register
        setTimeout(() => {
            setIsOpen(false)

            // If searchTerm doesn't match any option, restore the previous value or clear
            const matchingOption = options.find(opt => opt.label === searchTerm)
            if (!matchingOption) {
                if (fieldValue) {
                    // Restore the previous selected value
                    const previousOption = options.find(opt => opt.value === fieldValue)
                    if (previousOption) {
                        setSearchTerm(previousOption.label)
                    } else {
                        setSearchTerm('')
                    }
                } else {
                    setSearchTerm('')
                }
            }
        }, 200)
    }

    const handleKeyDown = (e) => {
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
                e.preventDefault()
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    const option = filteredOptions[highlightedIndex]
                    setSearchTerm(option.label)
                    setIsOpen(false)
                    setControlledValue(option.value)
                    // We need access to fieldOnChange here, but it's not available
                    // We'll handle this differently - trigger it through the blur handler
                }
                break
            case 'Escape':
                setIsOpen(false)
                inputRef.current?.blur()
                break
            default:
                break
        }
    }

    const handleSelectOption = (option, fieldOnChange) => {
        setSearchTerm(option.label)
        setIsOpen(false)
        setControlledValue(option.value)
        fieldOnChange(option.value)
        if (onChange) {
            onChange(option.value, option)
        }
    }

    const handleClear = (e, fieldOnChange) => {
        e.preventDefault()
        e.stopPropagation()
        setSearchTerm('')
        setControlledValue('')
        if (fieldOnChange) {
            fieldOnChange('')
        }
        if (onChange) {
            onChange('')
        }
        // Set open state after a small delay to ensure it stays open
        setTimeout(() => {
            setIsOpen(true)
            inputRef.current?.focus()
        }, 0)
    }

    const renderContent = (fieldValue, fieldOnChange, fieldOnBlur) => (
        // NOTE: this wrapper is the positioning context for BOTH the
        // clear/dropdown-toggle buttons AND the options list below. Keeping
        // everything anchored to this single `relative` element (instead of
        // splitting the dropdown out as a sibling) is what keeps the list
        // aligned directly under/over the input instead of drifting relative
        // to the outer label+field wrapper.
        <div className="relative flex-1">
            <input
                ref={inputRef}
                type="text"
                id={name}
                value={searchTerm}
                onChange={(e) => handleInputChange(e, fieldOnChange)}
                onFocus={handleInputFocus}
                onBlur={(e) => {
                    handleInputBlur(fieldOnChange, fieldValue)
                    if (fieldOnBlur) {
                        fieldOnBlur(e)
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                        e.preventDefault()
                        handleSelectOption(filteredOptions[highlightedIndex], fieldOnChange)
                    } else {
                        handleKeyDown(e)
                    }
                }}
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
                {searchTerm && !disabled && (
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

            {/* Dropdown list - now nested inside the same relative
                wrapper as the input, so it anchors correctly below/above it */}
            {isOpen && !disabled && (
                <div className={`absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
                    dropdownPosition === 'top' ? 'bottom-full mb-1' : 'mt-1'
                }`}>
                    {filteredOptions.length > 0 ? (
                        <ul ref={listRef} className="py-1">
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={option.value + '_' + option.label + '_' + index}
                                    onMouseDown={(e) => {
                                        e.preventDefault() // Prevent blur from firing
                                        handleSelectOption(option, fieldOnChange)
                                    }}
                                    className={`px-3 py-2 cursor-pointer text-[13px] ${
                                        highlightedIndex === index
                                            ? 'bg-primary text-white'
                                            : fieldValue === option.value
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-3 py-2 text-[13px] text-gray-500">
                            No options found
                        </div>
                    )}
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

            {/*
                flex-col wrapper keeps the field control (input + dropdown) and
                its error message stacked vertically and isolated from the
                parent's layout. Without this, a parent using `flex items-center`
                (common in horizontal label+field rows) pulls the error message
                onto the same row as the field instead of letting it wrap below.
            */}
            <div className="flex flex-col flex-1 min-w-0">
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validation}
                        render={({ field }) => {
                            // Update controlled value when field value changes
                            useEffect(() => {
                                setControlledValue(field.value)
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

TypeaheadSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
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

export default TypeaheadSelect