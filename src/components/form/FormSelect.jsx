import React from 'react'
import PropTypes from 'prop-types'

const FormSelect = ({
    name,
    options = [],
    placeholder = 'Select an option',
    error,
    label,
    subLabel,
    className = '',
    labelClassName = '',
    inputClassName = '',
    register,
    validation = {},
    value,
    onChange,
    required = false,
    noPlaceholder = false,
    disabled = false,
    autoFocus = false,
}) => {
    const hasError = Boolean(error)

    // If register is provided, use React Hook Form
    // Otherwise, use as controlled component
    const selectProps = register
        ? register(name, validation)
        : {
            value,
            onChange
        }

    // Check if field is required from validation rules or props
    const isRequired = (typeof validation?.required === 'object' ? validation.required.value : validation?.required) || required

    return (
        <div className={className || 'mb-2'}>
            {(label || subLabel) && (
                <label htmlFor={name} className={`inline-block text-[13px] font-medium text-gray-700 mb-1 ${labelClassName}`}>
                    {label} {isRequired && <span className="text-red-500">*</span>}
                    {subLabel && <span className="block text-xs text-gray-500">{subLabel}</span>}
                </label>
            )}
            {/*
                flex-col wrapper keeps the select and its error message stacked
                vertically and isolated from the parent's layout (e.g. a parent
                using `flex items-center` to lay out label + field horizontally
                would otherwise pull the error message onto the same row).
            */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="relative">
                    <select
                        id={name}
                        name={name}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        className={`appearance-none rounded relative block w-full min-w-19 px-2.5 py-1.5 pr-10 border disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${
                            hasError ? 'border-red-500' : 'border-tertiary'
                        } placeholder-gray-400 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 text-[13px] ${inputClassName}`}
                        {...selectProps}
                    >

                        {!noPlaceholder && <option value="">{placeholder}</option>}
                        {options.map((option, index) => {
                            // Support both string array and object array formats
                            const value = typeof option === 'string' ? option : option.value
                            const displayLabel = typeof option === 'string' ? option : option.label

                            return (
                                <option key={option.value + '_' + option.label + '_' + index} value={value}>
                                    {displayLabel}
                                </option>
                            )
                        })}
                    </select>

                    {/* Dropdown Arrow Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {hasError && <p className="mt-1 text-xs text-red-500">{error?.message || error}</p>}
            </div>
        </div>
    )
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func, // Optional - if not provided, use as controlled component
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string.isRequired
            })
        ])
    ).isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    validation: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // For controlled component
    onChange: PropTypes.func, // For controlled component
    required: PropTypes.bool, // For required indicator when not using validation
    noPlaceholder: PropTypes.bool, // If true, do not render placeholder option
    disabled: PropTypes.bool, // If true, disable the select field,
    autoFocus: PropTypes.bool, // If true, auto-focus the select field
}

export default FormSelect