import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function ImageUploadWithPreview({
    name,
    label,
    value,
    previewSrc,
    isLoading = false,
    onChange,
    setValue,
    register,
    validation,
    error,
    aspectRatio = '1/1',
    objectFit = 'cover',
    placeholder = 'No image selected',
    accept = 'image/*',
    disabled = false,
    className = '',
    showImageOnly = false
}) {
    const [uploadPreview, setUploadPreview] = useState(value || null)
    const fileInputRef = useRef(null)

    useEffect(function () {
        if (register && name) {
            register(name, validation)
        }
    }, [register, name, validation])

    useEffect(function () {
        if (value) {
            setUploadPreview(value)
        } else {
            setUploadPreview(null)
        }
    }, [value])

    const displayPreview = uploadPreview || previewSrc || null

    function handleFileChange(e) {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (event) {
                const result = event.target?.result
                setUploadPreview(result)

                if (setValue) {
                    setValue(name, result, { shouldDirty: true, shouldValidate: true })
                }

                if (onChange) {
                    onChange(result, file)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    function handleClear(e) {
        e.preventDefault()
        e.stopPropagation()
        setUploadPreview(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }

        if (setValue) {
            setValue(name, null, { shouldDirty: true, shouldValidate: true })
        }

        if (onChange) {
            onChange(null)
        }
    }

    const getAspectRatioClass = function () {
        switch (aspectRatio) {
            case '1/1': return 'aspect-square'
            case '4/3': return 'aspect-[4/3]'
            case '16/9': return 'aspect-video'
            case '3/4': return 'aspect-[3/4]'
            case '2/3': return 'aspect-[2/3]'
            default: return 'aspect-square'
        }
    }

    const getObjectFitClass = function () {
        return objectFit === 'contain' ? 'object-contain' : 'object-cover'
    }

    const renderPreviewContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                </div>
            )
        }

        if (displayPreview) {
            return (
                <div className="relative w-full h-full">
                    <img
                        src={displayPreview}
                        alt={label || 'Preview'}
                        className={`w-full h-full ${getObjectFitClass()}`}
                    />
                    {!disabled && uploadPreview && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 shadow-md"
                            title="Remove image"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )
        }

        return (
            <div className="text-center px-4">
                <svg className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">{placeholder}</p>
            </div>
        )
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start justify-center">
                {!showImageOnly && (
                    <div className="w-full sm:flex-1">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            disabled={disabled || isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {error && (
                            <p className="mt-1 text-sm text-red-600">{error}</p>
                        )}
                    </div>
                )}

                <div className={`w-full sm:w-64 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center overflow-hidden shadow-sm ${getAspectRatioClass()}`}>
                    {renderPreviewContent()}
                </div>
            </div>
        </div>
    )
}

ImageUploadWithPreview.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    previewSrc: PropTypes.string,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
    setValue: PropTypes.func,
    register: PropTypes.func,
    validation: PropTypes.object,
    error: PropTypes.string,
    aspectRatio: PropTypes.oneOf(['1/1', '4/3', '16/9', '3/4', '2/3']),
    objectFit: PropTypes.oneOf(['cover', 'contain']),
    placeholder: PropTypes.string,
    accept: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    showImageOnly: PropTypes.bool,
}

export default ImageUploadWithPreview