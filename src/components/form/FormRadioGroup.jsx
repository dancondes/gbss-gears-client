import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const FormRadioGroup = ({
    name,
    label,
    options = [],
    register,
    control,
    validation = {},
    error,
    className = '',
    radioClassName = '',
    required = false,
    disabled = false
}) => {
    // Check if field is required from validation rules or props
    const isRequired = (typeof validation?.required === 'object' ? validation.required.value : validation?.required) || required

    return (
        <div className={`mb-2 ${className}`}>
            {label && (
                <label className="inline-block text-sm font-medium text-gray-700 mb-2">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <div className={radioClassName || 'space-y-2'}>
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validation}
                        render={({ field }) => (
                            <>
                                {options.map((option, index) => {
                                    const value = typeof option === 'string' ? option : option.value
                                    const displayLabel = typeof option === 'string' ? option : option.label
                                    
                                    return (
                                        <div key={value} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`${name}-${index}`}
                                                name={name}
                                                value={value}
                                                checked={String(field.value) === String(value)}
                                                onChange={(e) => {
                                                    const newValue = e.target.value
                                                    // Handle boolean conversion
                                                    if (newValue === 'true') {
                                                        field.onChange(true)
                                                    } else if (newValue === 'false') {
                                                        field.onChange(false)
                                                    } else {
                                                        field.onChange(newValue)
                                                    }
                                                }}
                                                disabled={disabled}
                                                className="h-4 w-4 text-primary focus:ring-secondary border-tertiary cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100"
                                            />
                                            <label
                                                htmlFor={`${name}-${index}`}
                                                className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
                                            >
                                                {displayLabel}
                                            </label>
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    />
                ) : (
                    options.map((option, index) => {
                        const value = typeof option === 'string' ? option : option.value
                        const displayLabel = typeof option === 'string' ? option : option.label
                        
                        return (
                            <div key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${name}-${index}`}
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    className="h-4 w-4 text-primary focus:ring-secondary border-tertiary cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100"
                                    {...register(name, validation)}
                                />
                                <label
                                    htmlFor={`${name}-${index}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
                                >
                                    {displayLabel}
                                </label>
                            </div>
                        )
                    })
                )}
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error?.message || error}</p>}
        </div>
    )
}

FormRadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string.isRequired,
            })
        ])
    ).isRequired,
    register: PropTypes.func,
    control: PropTypes.object,
    validation: PropTypes.object,
    error: PropTypes.string,
    className: PropTypes.string,
    radioClassName: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default FormRadioGroup
