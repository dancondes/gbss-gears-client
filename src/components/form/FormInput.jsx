import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

function runCustomValidation(validateRule, value) {
    if (!validateRule) return true

    if (typeof validateRule === 'function') {
        return validateRule(value)
    }

    if (typeof validateRule === 'object') {
        for (const key in validateRule) {
            if (Object.prototype.hasOwnProperty.call(validateRule, key)) {
                const validator = validateRule[key]

                if (typeof validator === 'function') {
                    const result = validator(value)

                    if (result !== true) {
                        return result
                    }
                }
            }
        }
    }

    return true
}

export function validateStrictDateInput(value) {
    if (value === null || value === undefined || String(value).trim() === '') {
        return true
    }

    const stringValue = String(value).trim()
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/
    const dateMatch = datePattern.exec(stringValue)

    if (!dateMatch) {
        return 'Please enter a valid date (year must be 1900 or later).'
    }

    const year = Number(dateMatch[1])
    const month = Number(dateMatch[2])
    const day = Number(dateMatch[3])

    if (year < 1900) {
        return 'Please enter a valid date (year must be 1900 or later).'
    }

    const parsedDate = new Date(year, month - 1, day)

    if (
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day
    ) {
        return 'Please enter a valid date (year must be 1900 or later).'
    }

    return true
}

const FormInput = ({
    name,
    type = 'text',
    placeholder,
    autoComplete = 'off',
    error,
    label,
    className = '',
    labelClassName = '',
    inputClassName = '',
    register,
    validation = {},
    value,
    onChange,
    onKeyDown,
    required = false,
    step,
    disabled = false,
    readonly = false,
    autoFocus = false,
    maxLength,
    inputProps: otherProps = {}, // Additional props for the input element
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = useCallback(() => {
        setShowPassword(s => !s)
    }, [])
    const isPassword = type === 'password'
    const isCheckbox = type === 'checkbox'
    const isEmail = type === 'email'
    const isDate = type === 'date'

    const inputType = isPassword ? 'text' : type

    const hasError = Boolean(error)

    // Build validation rules with email pattern if type is email
    const validationRules = isEmail
        ? {
            ...validation,
            pattern: validation?.pattern || {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
        : validation

    const composedValidationRules = isDate
        ? {
            ...validationRules,
            validate: function (value) {
                const customValidationResult = runCustomValidation(validationRules?.validate, value)

                if (customValidationResult !== true) {
                    return customValidationResult
                }

                return validateStrictDateInput(value)
            }
        }
        : validationRules

    // If register is provided, use React Hook Form
    // Otherwise, use as controlled component
    const inputProps = register
        ? {
            ...register(name, composedValidationRules),
            ...otherProps
        }
        : {
            value,
            onChange,
            ...otherProps
        }

    // Check if field is required from validation rules or props
    const isRequired = (typeof composedValidationRules?.required === 'object' ? composedValidationRules.required.value : composedValidationRules?.required) || required

    return (
        <div className={`mb-2 ${className}`}>
            {isCheckbox ? (
                <div className="flex items-center">
                    <input
                        id={name}
                        name={name}
                        disabled={disabled}
                        readOnly={readonly}
                        type="checkbox"
                        className={`h-4 w-4 text-primary focus:ring-secondary border-tertiary rounded cursor-pointer ${inputClassName}`}
                        {...inputProps}
                    />
                    {label && (
                        <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
                            {label} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                    )}
                </div>
            ) : (
                <>
                    {label && (
                        <label htmlFor={name} className={`inline-block text-[13px] font-medium text-gray-700 mb-1 ${labelClassName}`}>
                            {label} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    {/*
                        flex-col wrapper keeps the input and its error message stacked
                        vertically and isolated from the parent's layout. Without this,
                        a parent using `flex items-center` (common in horizontal
                        label+field rows, e.g. DetailsTab's `FC` class) pulls the error
                        <p> onto the same row as the input instead of letting it wrap
                        below.
                    */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="relative">
                            <input
                                id={name}
                                name={name}
                                disabled={disabled}
                                type={inputType}
                                step={step}
                                autoComplete={autoComplete}
                                onKeyDown={onKeyDown}
                                placeholder={placeholder}
                                className={`appearance-none rounded relative block placeholder:text-gray-400 w-full px-2.5 py-1.5 ${isPassword ? 'pr-12' : ''} border ${hasError ? 'border-red-500' : 'border-tertiary'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} placeholder-gray-400 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 text-[13px] ${inputClassName}`}
                                style={isPassword && !showPassword ? {
                                    WebkitTextSecurity: 'disc',
                                    MozTextSecurity: 'disc'
                                } : undefined}
                                autoFocus={autoFocus}
                                maxLength={maxLength}
                                {...inputProps}
                            />

                            {isPassword && (
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    title={showPassword ? 'Hide password' : 'Show password'}
                                    onClick={handleTogglePassword}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-primary hover:text-tertiary z-20 focus:outline-none"
                                >
                                    {!showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}

                                    {/* <span className="hidden sm:inline select-none">{showPassword ? 'Hide' : 'Show'}</span> */}
                                </button>
                            )}
                        </div>

                        {hasError && <p className="mt-1 text-xs text-red-500">{error?.message || error}</p>}
                    </div>
                </>
            )}
        </div>
    )
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func, // Optional - if not provided, use as controlled component
    type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url', 'checkbox', 'date', 'time']),
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    validation: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]), // For controlled component
    onChange: PropTypes.func, // For controlled component
    onKeyDown: PropTypes.func, // For handling key down events
    required: PropTypes.bool, // For required indicator when not using validation
    step: PropTypes.string, // For number input step attribute
    disabled: PropTypes.bool, // For disabling the input,
    readonly: PropTypes.bool, // For read-only input
    autoFocus: PropTypes.bool, // For auto-focusing the input
    maxLength: PropTypes.number, // For maximum length of input
    inputProps: PropTypes.object, // Additional props for the input element
}

export default FormInput