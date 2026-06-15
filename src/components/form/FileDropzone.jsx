import React, { useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { formatFileSize } from '@/utilities'

const FileDropzone = ({
    files = [],
    onFilesChange,
    onRemoveFile,
    accept = '*',
    multiple = true,
    maxFiles = 10,
    maxFileSize = 10 * 1024 * 1024, // 10MB default
    label = 'Upload Files',
    placeholder = 'Drag and drop files here, or click to browse',
    disabled = false,
    error,
    className = '',
}) => {
    const fileInputRef = useRef(null)
    const dropZoneRef = useRef(null)
    const dragCounterRef = useRef(0)
    const [isDragging, setIsDragging] = useState(false)
    const hasError = Boolean(error)

    // Parse accepted extensions from accept prop
    const getAcceptedExtensions = useCallback(() => {
        if (accept === '*') return null
        return accept.split(',').map(ext => ext.trim().toLowerCase())
    }, [accept])

    const isFileTypeAccepted = useCallback((file) => {
        const acceptedExtensions = getAcceptedExtensions()
        if (!acceptedExtensions) return true

        const fileName = file.name.toLowerCase()
        const fileExtension = '.' + fileName.split('.').pop()

        return acceptedExtensions.some(ext => {
            if (ext.startsWith('.')) {
                return fileExtension === ext
            }
            // Handle MIME type patterns like 'application/pdf'
            if (file.type && file.type.includes(ext.replace('*', ''))) {
                return true
            }
            return false
        })
    }, [getAcceptedExtensions])

    const validateFiles = useCallback((newFiles) => {
        const validFiles = []
        const errors = []

        for (const file of newFiles) {
            if (files.length + validFiles.length >= maxFiles) {
                errors.push(`Maximum ${maxFiles} files allowed`)
                break
            }

            // Check file type
            if (!isFileTypeAccepted(file)) {
                errors.push(`${file.name} is not an accepted file type`)
                continue
            }

            if (file.size > maxFileSize) {
                errors.push(`${file.name} exceeds maximum file size of ${formatFileSize(maxFileSize)}`)
                continue
            }

            // Check for duplicates
            const isDuplicate = files.some(
                (existingFile) => existingFile.name === file.name && existingFile.size === file.size
            )
            if (isDuplicate) {
                errors.push(`${file.name} is already added`)
                continue
            }

            validFiles.push(file)
        }

        return { validFiles, errors }
    }, [files, maxFiles, maxFileSize, isFileTypeAccepted])

    const handleFiles = useCallback((newFiles) => {
        if (disabled) return

        const { validFiles } = validateFiles(Array.from(newFiles))

        if (validFiles.length > 0 && onFilesChange) {
            onFilesChange([...files, ...validFiles])
        }
    }, [disabled, files, onFilesChange, validateFiles])

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounterRef.current++
        if (!disabled && e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true)
        }
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounterRef.current--
        if (dragCounterRef.current === 0) {
            setIsDragging(false)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'copy'
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounterRef.current = 0
        setIsDragging(false)

        if (disabled) return

        const droppedFiles = e.dataTransfer.files
        if (droppedFiles && droppedFiles.length > 0) {
            handleFiles(droppedFiles)
        }
    }

    const handleFileInputChange = (e) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            handleFiles(selectedFiles)
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleRemoveFile = (index) => {
        if (onRemoveFile) {
            onRemoveFile(index)
        } else if (onFilesChange) {
            const newFiles = files.filter((_, i) => i !== index)
            onFilesChange(newFiles)
        }
    }

    const getFileIcon = (file) => {
        const type = file.type || ''
        
        if (type.startsWith('image/')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            )
        }
        
        if (type === 'application/pdf') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
            )
        }

        if (type.includes('word') || type.includes('document')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            )
        }

        // Default file icon
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
        )
    }

    return (
        <div className={`${className}`}>
            {label && (
                <label className="inline-block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Drop Zone */}
                <div
                    ref={dropZoneRef}
                    onClick={handleClick}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`
                        relative border-2 border-dashed rounded-lg p-6 transition-colors
                        ${isDragging ? 'border-secondary bg-secondary/5 cursor-copy' : hasError ? 'border-red-500' : 'border-tertiary'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : !isDragging ? 'bg-white cursor-pointer hover:border-secondary' : ''}
                        flex flex-col items-center justify-center min-h-[200px]
                    `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileInputChange}
                        disabled={disabled}
                        className="hidden"
                    />

                    {/* Upload Icon - pointer-events-none to prevent drag issues */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-12 w-12 mb-3 pointer-events-none ${isDragging ? 'text-secondary' : 'text-gray-400'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>

                    <p className="text-sm text-gray-600 text-center mb-1 pointer-events-none">
                        {placeholder}
                    </p>
                    <p className="text-xs text-gray-400 text-center pointer-events-none">
                        Max {maxFiles} {maxFiles > 1 ? 'files' : 'file'}, up to {formatFileSize(maxFileSize)} each
                    </p>
                </div>

                {/* File List */}
                <div className="border border-tertiary rounded-lg bg-gray-50 p-4 min-h-[200px]">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                            Ready to Upload ({files.length})
                        </h4>
                        {files.length > 0 && (
                            <button
                                type="button"
                                onClick={() => onFilesChange && onFilesChange([])}
                                className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                                disabled={disabled}
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[140px] text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="text-sm">No files selected</p>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200 hover:bg-gray-50"
                                >
                                    {getFileIcon(file)}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800 font-medium truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className="shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                        disabled={disabled}
                                        title="Remove file"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {hasError && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>
    )
}

FileDropzone.propTypes = {
    files: PropTypes.array,
    onFilesChange: PropTypes.func.isRequired,
    onRemoveFile: PropTypes.func,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    maxFileSize: PropTypes.number,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
}

export default FileDropzone
