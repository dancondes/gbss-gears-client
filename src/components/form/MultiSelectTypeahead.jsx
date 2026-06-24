import React, { useCallback, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const MultiSelectTypeahead = ({
    name,
    label,
    options = [],
    placeholder = 'Search...',
    control,
    register,
    validation,
    error,
    value = [],
    onChange,
    disabled = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [dropdownPosition, setDropdownPosition] = useState('bottom')
    const wrapperRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)

    // Check if field is required from validation rules or props
    const isRequired = typeof validation?.required === 'object' ? validation.required.value : validation?.required

    // Calculate dropdown position based on available space
    useEffect(() => {
        if (isOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const dropdownHeight = 280

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
        if (!term) {
            setFilteredOptions(options)
            setHighlightedIndex(-1)
            return
        }
        const filtered = options.filter(option => {
            const optionLabel = option?.label ? String(option.label).toLowerCase() : ''
            return optionLabel.includes(term)
        })
        setFilteredOptions(filtered)
        setHighlightedIndex(-1)
    }, [searchTerm, options])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
                setSearchTerm('')
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

    const toggleOption = useCallback((optionValue, currentValues, fieldOnChange) => {
        const next = currentValues.includes(optionValue)
            ? currentValues.filter(v => v !== optionValue)
            : [...currentValues, optionValue]

        if (fieldOnChange) fieldOnChange(next)
        if (onChange) onChange(next)
    }, [onChange])

    const removeOption = useCallback((optionValue, currentValues, fieldOnChange, e) => {
        e.preventDefault()
        e.stopPropagation()
        const next = currentValues.filter(v => v !== optionValue)
        if (fieldOnChange) fieldOnChange(next)
        if (onChange) onChange(next)
    }, [onChange])

    const handleKeyDown = (e, currentValues, fieldOnChange) => {
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
                    toggleOption(filteredOptions[highlightedIndex].value, currentValues, fieldOnChange)
                }
                break
            case 'Escape':
                setIsOpen(false)
                setSearchTerm('')
                inputRef.current?.blur()
                break
            case 'Backspace':
                if (!searchTerm && currentValues.length > 0) {
                    const next = currentValues.slice(0, -1)
                    if (fieldOnChange) fieldOnChange(next)
                    if (onChange) onChange(next)
                }
                break
            default:
                break
        }
    }

    const getSelectedOptions = (selectedValues) =>
        options.filter(opt => selectedValues.includes(opt.value))

    const renderContent = (fieldValue = [], fieldOnChange) => {
        const selectedValues = Array.isArray(fieldValue) ? fieldValue : []
        const selectedOptions = getSelectedOptions(selectedValues)

        return (
            <>
                {/* Input area with pills */}
                <div
                    className={`flex flex-wrap items-center gap-1 min-h-8.5 px-2 py-1.5 pr-10 rounded border ${
                        error ? 'border-red-500' : isOpen ? 'border-secondary' : 'border-tertiary'
                    } bg-white cursor-text ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        if (!disabled) {
                            setIsOpen(true)
                            inputRef.current?.focus()
                        }
                    }}
                >
                    {/* Selected pills */}
                    {selectedOptions.map(opt => (
                        <span
                            key={opt.value}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-medium bg-primary/10 text-primary"
                        >
                            {opt.label}
                            {!disabled && (
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onMouseDown={(e) => removeOption(opt.value, selectedValues, fieldOnChange, e)}
                                    className="flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
                                    aria-label={`Remove ${opt.label}`}
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </span>
                    ))}

                    {/* Search input */}
                    {!disabled && (
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setIsOpen(true)
                            }}
                            onFocus={() => setIsOpen(true)}
                            onKeyDown={(e) => handleKeyDown(e, selectedValues, fieldOnChange)}
                            placeholder={selectedOptions.length === 0 ? placeholder : ''}
                            autoComplete="off"
                            className="flex-1 min-w-20 outline-none text-[13px] text-primary placeholder-gray-400 bg-transparent"
                        />
                    )}
                </div>

                {/* Dropdown toggle button (absolutely positioned) */}
                <button
                    type="button"
                    tabIndex={-1}
                    disabled={disabled}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!disabled) setIsOpen(prev => !prev)
                    }}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    <svg
                        className={`h-5 w-5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown */}
                {isOpen && !disabled && (
                    <div className={`absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                        dropdownPosition === 'top' ? 'bottom-full mb-1' : 'mt-1'
                    }`}>
                        {/* Filter input inside dropdown */}
                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Type to filter..."
                                    autoComplete="off"
                                    className="w-full pl-7 pr-2.5 py-1.5 rounded border border-gray-200 text-[12px] text-primary placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Options list */}
                        <ul ref={listRef} className="py-1 max-h-56 overflow-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => {
                                    const isChecked = selectedValues.includes(option.value)
                                    const isHighlighted = highlightedIndex === index

                                    return (
                                        <li
                                            key={`${option.value}_${index}`}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                toggleOption(option.value, selectedValues, fieldOnChange)
                                            }}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={`flex items-center gap-3 px-3 py-2 cursor-pointer select-none text-[13px] transition-colors ${
                                                isHighlighted
                                                    ? 'bg-gray-100'
                                                    : isChecked
                                                    ? 'bg-primary/5'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            {/* Checkbox */}
                                            <span
                                                className={`shrink-0 flex items-center justify-center w-4 h-4 rounded border transition-colors ${
                                                    isChecked
                                                        ? 'bg-primary border-primary'
                                                        : 'border-gray-300 bg-white'
                                                }`}
                                            >
                                                {isChecked && (
                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </span>

                                            {/* Label */}
                                            <span className={`${isChecked ? 'text-primary font-medium' : 'text-gray-900'}`}>
                                                {option.label}
                                            </span>
                                        </li>
                                    )
                                })
                            ) : (
                                <li className="px-3 py-2 text-[13px] text-gray-400">
                                    No options found
                                </li>
                            )}
                        </ul>

                        {/* Footer: count + clear all */}
                        {selectedValues.length > 0 && (
                            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
                                <span className="text-[11px] text-gray-500">
                                    {selectedValues.length} selected
                                </span>
                                <button
                                    type="button"
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        if (fieldOnChange) fieldOnChange([])
                                        if (onChange) onChange([])
                                    }}
                                    className="text-[11px] text-red-500 hover:text-red-600 font-medium"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </>
        )
    }

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={name}
                    className="inline-block text-[13px] font-medium text-gray-700 mb-1"
                >
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validation}
                        defaultValue={[]}
                        render={({ field }) =>
                            renderContent(field.value, field.onChange)
                        }
                    />
                ) : (
                    <>
                        {register && (
                            <input
                                type="hidden"
                                {...register(name, validation)}
                                value={JSON.stringify(value || [])}
                            />
                        )}
                        {renderContent(value, onChange)}
                    </>
                )}
            </div>

            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

MultiSelectTypeahead.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    placeholder: PropTypes.string,
    control: PropTypes.object,
    register: PropTypes.func,
    validation: PropTypes.object,
    error: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default MultiSelectTypeahead
