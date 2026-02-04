import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const CheckboxGroup = ({
    name,
    label,
    options = [],
    register,
    control,
    validation = {},
    error,
    className = '',
    checkboxClassName = ''
}) => {
    // Check if field is required from validation rules
    const isRequired = validation?.required !== undefined

    return (
        <div className={`mb-2 ${className}`}>
            {label && (
                <label className="inline-block text-sm font-medium text-gray-700 mb-2">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <div className="space-y-2">
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validation}
                        render={({ field }) => (
                            <div className={checkboxClassName}>
                                {options.map((option, index) => {
                                    const value = typeof option === 'string' ? option : option.value
                                    const displayLabel = typeof option === 'string' ? option : option.label
                                    
                                    const currentValue = field.value || []
                                    const isChecked = Array.isArray(currentValue) 
                                        ? currentValue.includes(value)
                                        : currentValue === value
                                    
                                    return (
                                        <div key={value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`${name}-${index}`}
                                                value={value}
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    const baseArray = Array.isArray(field.value) ? field.value : []
                                                    if (e.target.checked) {
                                                        field.onChange([...baseArray, value])
                                                    } else {
                                                        field.onChange(baseArray.filter(v => v !== value))
                                                    }
                                                }}
                                                className="h-4 w-4 text-primary focus:ring-secondary border-tertiary rounded cursor-pointer"
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
                            </div>
                        )}
                    />
                ) : (
                    options.map((option, index) => {
                        const value = typeof option === 'string' ? option : option.value
                        const displayLabel = typeof option === 'string' ? option : option.label
                        
                        return (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${name}-${index}`}
                                    value={value}
                                    {...register(name, validation)}
                                    className="h-4 w-4 text-primary focus:ring-secondary border-tertiary rounded cursor-pointer"
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

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}

CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ])
    ).isRequired,
    register: PropTypes.func,
    control: PropTypes.object,
    validation: PropTypes.object,
    error: PropTypes.string,
    className: PropTypes.string,
    checkboxClassName: PropTypes.string,
}

export default CheckboxGroup
