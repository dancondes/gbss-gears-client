import React from 'react'
import PropTypes from 'prop-types'

const FormTextarea = ({
    name,
    placeholder,
    autoComplete = 'off',
    error,
    label,
    className = '',
    register,
    validation = {},
    rows = 4,
    value,
    onChange,
    required = false,
    disabled = false,
    readonly = false,
}) => {
    const hasError = Boolean(error)

    // If register is provided, use React Hook Form
    // Otherwise, use as controlled component
    const textareaProps = register 
        ? register(name, validation)
        : {
            value,
            onChange
        }
    
    // Check if field is required from validation rules or props
    const isRequired = validation?.required !== undefined || required

    return (
        <div className={className || 'mb-2'}>
            {label && (
                <label htmlFor={name} className="inline-block text-[13px] font-medium text-gray-700 mb-1">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                readOnly={readonly}
                className={`appearance-none rounded relative block w-full px-2.5 py-1.5 placeholder:text-gray-400 border ${hasError ? 'border-red-500' : 'border-tertiary'} placeholder-gray-500 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 text-[13px] resize-vertical ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                {...textareaProps}
            />

            {hasError && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}

FormTextarea.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func, // Optional - if not provided, use as controlled component
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    validation: PropTypes.object,
    rows: PropTypes.number,
    value: PropTypes.string, // For controlled component
    onChange: PropTypes.func, // For controlled component
    required: PropTypes.bool, // For required indicator when not using validation
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
}

export default FormTextarea
