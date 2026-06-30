import React from 'react'
import PropTypes from 'prop-types'
import { GBSS_DOMAIN } from '@/constants'

const EmailInput = ({
    name,
    placeholder = 'yourname',
    autoComplete = 'off',
    error,
    label,
    domain = GBSS_DOMAIN,
    showDomain = true,
    className = '',
    register,
    validation = {}
}) => {
    const hasError = Boolean(error)

    // register function from react-hook-form handles everything including ref
    const inputProps = register(name, validation)
    
    // Check if field is required from validation rules or props
    const isRequired = typeof validation?.required === 'object' ? validation.required.value : validation?.required

    return (
        <div className="mb-2">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className={showDomain ? 'flex items-center gap-2' : ''}>
                <input
                    id={name}
                    name={name}
                    type={showDomain ? 'text' : 'email'}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className={`appearance-none rounded relative block w-full px-3 py-2 border ${hasError ? 'border-red-500' : 'border-tertiary'
                        } placeholder-gray-400 text-primary focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm ${showDomain ? 'flex-1' : ''
                        } ${className}`}
                    {...inputProps}
                />
                {showDomain && (
                    <span className="text-sm text-tertiary whitespace-nowrap">{domain}</span>
                )}
            </div>
            {hasError && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

EmailInput.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    domain: PropTypes.string,
    showDomain: PropTypes.bool,
    className: PropTypes.string,
    validation: PropTypes.object
}

export default EmailInput
