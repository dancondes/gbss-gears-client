import React from 'react'
import PropTypes from 'prop-types'

function TimeInput({
    name,
    label,
    register,
    error,
    validation = {},
    disabled = false,
    // interval = 15, // no longer working as expected, so removed for now
    className = '',
    labelClassName = '',
    inputClassName = ''
}) {
    // Check if field is required from validation rules or props
    const isRequired = typeof validation?.required === 'object' ? validation.required.value : validation?.required
    const inputClass = `appearance-none rounded relative block w-full px-2.5 py-1.5 border ${error ? 'border-red-500' : 'border-tertiary'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 text-[13px] cursor-pointer ${inputClassName}`

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className={`inline-block text-[13px] font-medium text-gray-700 mb-1 ${labelClassName}`}>
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={name}
                type="time"
                // step={interval * 60}
                {...register(name, validation)}
                disabled={disabled}
                className={inputClass}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

TimeInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    register: PropTypes.func.isRequired,
    error: PropTypes.string,
    validation: PropTypes.object,
    disabled: PropTypes.bool,
    interval: PropTypes.number,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string
}

export default TimeInput
