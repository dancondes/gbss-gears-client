import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { formatFileSize } from '@/utilities'

const FileInput = ({
    label,
    name,
    accept = '*',
    selectedFile = null,
    onChange,
    onClear,
    placeholder = 'Choose a file',
    error,
    required = false,
    disabled = false,
    className = '',
    showFileSize = true,
}) => {
    const fileInputRef = useRef(null)
    const hasError = Boolean(error)

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0]
        if (file && onChange) {
            onChange(file)
        }
    }

    const handleClear = (e) => {
        e.stopPropagation()
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        if (onClear) {
            onClear()
        }
    }

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <div className={`mb-2 ${className}`}>
            {label && (
                <label htmlFor={name} className="inline-block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                id={name}
                name={name}
                accept={accept}
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
            />

            {/* Custom styled button/display */}
            <div
                onClick={handleClick}
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                    hasError ? 'border-red-500' : 'border-tertiary'
                } ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:border-secondary'
                } focus-within:outline-none focus-within:ring-secondary focus-within:border-secondary transition-colors`}
            >
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {/* Upload icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 shrink-0 ${selectedFile ? 'text-secondary' : 'text-gray-400'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            />
                        </svg>

                        {/* File info or placeholder */}
                        <div className="flex-1 min-w-0">
                            {selectedFile ? (
                                <div>
                                    <p className="text-sm text-primary font-medium truncate">
                                        {selectedFile.name}
                                    </p>
                                    {showFileSize && selectedFile.size && (
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(selectedFile.size)}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">{placeholder}</p>
                            )}
                        </div>
                    </div>

                    {/* Clear button or Browse button */}
                    {selectedFile ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="shrink-0 px-3 py-1 text-xs text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded transition-colors cursor-pointer"
                            disabled={disabled}
                        >
                            Clear
                        </button>
                    ) : (
                        <span className="shrink-0 px-3 py-1 text-xs text-primary bg-gray-100 rounded">
                            Browse
                        </span>
                    )}
                </div>
            </div>

            {hasError && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}

FileInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    accept: PropTypes.string,
    selectedFile: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    showFileSize: PropTypes.bool,
}

export default FileInput
