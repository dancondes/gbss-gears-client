import React, { useRef, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatFileSize } from '@/utilities'

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '')
const PASTE_MODIFIER = isMac ? '⌘' : 'Ctrl'

function getExtension(file) {
    const subtype = (file.type || '').split('/')[1] || 'png'
    return subtype === 'jpeg' ? 'jpg' : subtype
}

// Gives a pasted image its permanent name, e.g. "pasted-image-3.png".
// Names are never changed afterwards, so references like "see pasted-image-3" stay valid.
function createNumberedFile(source, number) {
    return new File([source], `pasted-image-${number}.${getExtension(source)}`, {
        type: source.type,
        lastModified: source.lastModified || Date.now(),
    })
}

// Clipboard images are always named "image.png"; the real number is assigned when they're added
function createPastedFile(blob, type) {
    return new File([blob], `pasted-image.${getExtension({ type })}`, { type, lastModified: Date.now() })
}

const Kbd = ({ children }) => (
    <kbd className="px-1.5 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded shadow-sm">
        {children}
    </kbd>
)

Kbd.propTypes = {
    children: PropTypes.node,
}

const isImageFile = (file) => Boolean(file?.type?.startsWith('image/'))

// Creates (and cleans up) an object URL for an image file so it can be shown in an <img>
function useObjectUrl(file) {
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (!isImageFile(file)) {
            setUrl(null)
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setUrl(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return url
}

// Small preview for image files (falls back to the file-type icon until the preview is ready)
const FileThumbnail = ({ file, fallback }) => {
    const url = useObjectUrl(file)

    if (!url) return fallback

    return (
        <img
            src={url}
            alt=""
            className="h-8 w-8 shrink-0 rounded object-cover border border-gray-200"
        />
    )
}

FileThumbnail.propTypes = {
    file: PropTypes.object.isRequired,
    fallback: PropTypes.node,
}

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
    pasteEnabled = true,
}) => {
    const fileInputRef = useRef(null)
    const dragCounterRef = useRef(0)
    const statusTimerRef = useRef(null)
    // Last number given to a pasted image. Only goes up, so a deleted number is never reused.
    const pastedCounterRef = useRef(0)
    const [isDragging, setIsDragging] = useState(false)
    const [status, setStatus] = useState(null) // { type: 'success' | 'error', message }
    const hasError = Boolean(error)

    // Opens an image in a new browser tab (the file hasn't been uploaded yet, so use a temporary blob URL)
    const openImageInNewTab = (file) => {
        const objectUrl = URL.createObjectURL(file)
        const newTab = window.open(objectUrl, '_blank')
        if (!newTab) {
            showStatus('error', 'Your browser blocked the new tab. Allow pop-ups for this site and try again.')
            URL.revokeObjectURL(objectUrl)
            return
        }
        // Give the new tab time to load the image before releasing the URL
        setTimeout(() => URL.revokeObjectURL(objectUrl), 60000)
    }

    // The Paste button needs the async Clipboard API (HTTPS + modern browser)
    const canReadClipboard =
        typeof navigator !== 'undefined' &&
        typeof window !== 'undefined' &&
        window.isSecureContext &&
        typeof navigator.clipboard?.read === 'function'

    // Parse accepted extensions from accept prop
    const getAcceptedExtensions = useCallback(() => {
        if (accept === '*') return null
        return accept.split(',').map(ext => ext.trim().toLowerCase())
    }, [accept])

    // Only advertise / handle image paste when images are an accepted type
    const acceptsImages = (() => {
        const acceptedExtensions = getAcceptedExtensions()
        if (!acceptedExtensions) return true
        return acceptedExtensions.some(
            ext => ext.startsWith('image/') || IMAGE_EXTENSIONS.includes(ext)
        )
    })()

    const canPaste = pasteEnabled && acceptsImages && !disabled

    const showStatus = useCallback((type, message) => {
        setStatus({ type, message })
        clearTimeout(statusTimerRef.current)
        statusTimerRef.current = setTimeout(() => setStatus(null), type === 'error' ? 4500 : 2500)
    }, [])

    useEffect(() => () => clearTimeout(statusTimerRef.current), [])

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

    const validateFiles = useCallback((newFiles, { checkDuplicates = true } = {}) => {
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

            // Check for duplicates by file name + extension (case-insensitive), including
            // other files in the same batch
            const fileName = file.name.toLowerCase()
            const isDuplicate = checkDuplicates && (
                files.some(existingFile => existingFile.name.toLowerCase() === fileName) ||
                validFiles.some(validFile => validFile.name.toLowerCase() === fileName))
            if (isDuplicate) {
                errors.push(`${file.name} is already in the upload list`)
                continue
            }

            validFiles.push(file)
        }

        return { validFiles, errors }
    }, [files, maxFiles, maxFileSize, isFileTypeAccepted])

    const handleFiles = useCallback((newFiles, source = 'select') => {
        if (disabled) return

        const { validFiles: acceptedFiles, errors } = validateFiles(Array.from(newFiles), {
            // Pasted images get their unique name afterwards, so they can't be duplicates yet
            checkDuplicates: source !== 'paste',
        })

        // Number only the pasted images that were accepted, so rejected ones don't leave gaps.
        // Skip any number whose file name is already taken (e.g. the user uploaded their own
        // "pasted-image-1.png"), so a pasted image never duplicates an existing file name.
        const takenNames = new Set(files.map(file => file.name.toLowerCase()))
        const validFiles = source === 'paste'
            ? acceptedFiles.map(file => {
                let numbered
                do {
                    numbered = createNumberedFile(file, ++pastedCounterRef.current)
                } while (takenNames.has(numbered.name.toLowerCase()))
                takenNames.add(numbered.name.toLowerCase())
                return numbered
            })
            : acceptedFiles

        if (validFiles.length > 0 && onFilesChange) {
            onFilesChange([...files, ...validFiles])
        }

        // Tell the user what happened instead of failing silently
        if (errors.length > 0) {
            showStatus('error', errors[0] + (errors.length > 1 ? ` (+${errors.length - 1} more)` : ''))
        } else if (validFiles.length > 0 && source === 'paste') {
            showStatus('success', validFiles.length > 1 ? `${validFiles.length} images pasted` : 'Image pasted')
        }
    }, [disabled, files, onFilesChange, validateFiles, showStatus])

    // Start over from pasted-image-1 once the list is empty (e.g. after submitting or Clear All)
    useEffect(() => {
        if (files.length === 0) pastedCounterRef.current = 0
    }, [files.length])

    // Ctrl/Cmd+V works anywhere on the page while this component is mounted
    // (so users don't have to hover or focus the drop zone first).
    const handlePaste = useCallback((e) => {
        if (!canPaste) return

        const activeElement = document.activeElement
        // Never hijack rich-text editors
        if (activeElement?.isContentEditable) return

        const clipboard = e.clipboardData
        if (!clipboard) return

        // In a plain text field, text wins. Only take the paste when the clipboard
        // holds an image and no text (images can't go into a text input anyway).
        const isTextField = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')
        const hasText = Array.from(clipboard.types || []).includes('text/plain')
        if (isTextField && hasText) return

        const imageFiles = []
        for (const item of clipboard.items || []) {
            if (item.kind === 'file' && item.type.startsWith('image/')) {
                const file = item.getAsFile()
                if (file) imageFiles.push(createPastedFile(file, item.type))
            }
        }

        // Nothing image-like on the clipboard - leave the paste alone
        if (imageFiles.length === 0) return

        e.preventDefault()
        handleFiles(imageFiles, 'paste')
    }, [canPaste, handleFiles])

    useEffect(() => {
        document.addEventListener('paste', handlePaste)
        return () => document.removeEventListener('paste', handlePaste)
    }, [handlePaste])

    // "Paste image" button - for mouse/touch users, or anyone who doesn't know the shortcut
    const handlePasteButtonClick = async (e) => {
        e.stopPropagation()
        if (!canPaste) return

        try {
            const clipboardItems = await navigator.clipboard.read()
            const imageFiles = []

            for (const item of clipboardItems) {
                const imageType = item.types.find(type => type.startsWith('image/'))
                if (imageType) {
                    const blob = await item.getType(imageType)
                    imageFiles.push(createPastedFile(blob, imageType))
                }
            }

            if (imageFiles.length === 0) {
                showStatus('error', 'No image found on your clipboard. Copy an image or take a screenshot first.')
                return
            }

            handleFiles(imageFiles, 'paste')
        } catch (err) {
            showStatus(
                'error',
                err?.name === 'NotAllowedError'
                    ? `Clipboard access was blocked. Allow it in your browser, or press ${PASTE_MODIFIER}+V instead.`
                    : `Couldn't read your clipboard. Try pressing ${PASTE_MODIFIER}+V instead.`
            )
        }
    }

    // const handleBrowseButtonClick = (e) => {
    //     e.stopPropagation()
    //     handleClick()
    // }

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

    function handleClick() {
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

    const isSuccess = status?.type === 'success'
    const isStatusError = status?.type === 'error'

    const borderClass = isDragging
        ? 'border-secondary bg-secondary/5 cursor-copy'
        : isSuccess
            ? 'border-green-500 bg-green-50'
            : hasError || isStatusError
                ? 'border-red-500'
                : 'border-tertiary'

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
                    onClick={handleClick}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`
                        relative border-2 border-dashed rounded-lg p-6 transition-colors
                        ${borderClass}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : !isDragging && !isSuccess ? 'bg-white cursor-pointer hover:border-secondary' : ''}
                        flex flex-col items-center justify-center min-h-50
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
                        className={`h-12 w-12 mb-3 pointer-events-none ${isDragging ? 'text-secondary' : isSuccess ? 'text-green-500' : 'text-gray-400'}`}
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

                    {isDragging ? (
                        <p className="text-sm font-medium text-secondary text-center pointer-events-none">
                            Drop to add files
                        </p>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 text-center pointer-events-none">
                                {placeholder}
                            </p>

                            {canPaste && (
                                <>
                                    {/* "or" divider */}
                                    <div className="flex items-center gap-3 w-full max-w-xs my-3 text-xs text-gray-400 pointer-events-none">
                                        <span className="h-px flex-1 bg-gray-200" />
                                        <span>or paste an image</span>
                                        <span className="h-px flex-1 bg-gray-200" />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                                        {canReadClipboard && (
                                            <button
                                                type="button"
                                                onClick={handlePasteButtonClick}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:border-secondary hover:text-secondary transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                Paste from clipboard
                                            </button>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 pointer-events-none">
                                            {canReadClipboard ? 'or press' : 'Press'} <Kbd>{PASTE_MODIFIER}</Kbd> + <Kbd>V</Kbd>
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Feedback - confirms a paste or explains why a file was rejected */}
                            <div aria-live="polite" className="min-h-5 mt-3 pointer-events-none">
                                {status && (
                                    <p className={`flex items-center justify-center gap-1.5 text-xs font-medium text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                                        {isSuccess ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {status.message}
                                    </p>
                                )}
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-1 pointer-events-none">
                                Max {maxFiles} {maxFiles > 1 ? 'files' : 'file'}, up to {formatFileSize(maxFileSize)} each
                            </p>
                        </>
                    )}
                </div>

                {/* File List */}
                <div className="border border-tertiary rounded-lg bg-gray-50 p-4 min-h-50">
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
                        <div className="flex flex-col items-center justify-center h-35 text-gray-400">
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
                        <div className="space-y-2 max-h-50 overflow-y-auto">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200 hover:bg-gray-50"
                                >
                                    {isImageFile(file) ? (
                                        <button
                                            type="button"
                                            onClick={() => openImageInNewTab(file)}
                                            className="shrink-0 cursor-zoom-in"
                                            title="Open image in new tab"
                                        >
                                            <FileThumbnail file={file} fallback={getFileIcon(file)} />
                                        </button>
                                    ) : (
                                        getFileIcon(file)
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800 font-medium truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                    {isImageFile(file) && (
                                        <button
                                            type="button"
                                            onClick={() => openImageInNewTab(file)}
                                            className="shrink-0 p-1 text-gray-500 hover:text-secondary hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                            title="Open image in new tab"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
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
    pasteEnabled: PropTypes.bool,
}

export default FileDropzone