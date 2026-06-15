import React from 'react'
import PropTypes from 'prop-types'

function TimeInput({
    name,
    label,
    register,
    error,
    validation = {},
    disabled = false,
    interval = 15,
    className = ''
}) {
    const isRequired = validation?.required
    const inputClassName = `appearance-none rounded relative block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-tertiary'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm cursor-pointer`

    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={name}
                type="time"
                step={interval * 60}
                {...register(name, validation)}
                disabled={disabled}
                className={inputClassName}
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
    className: PropTypes.string
}

export default TimeInput
