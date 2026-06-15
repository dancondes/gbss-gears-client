import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getFile } from '@/services/file-service'
import useDownloadFileButton from '@/hooks/use-download-file-button'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
const ZOOM_STEP = 0.25
const MIN_ZOOM = 0.25
const MAX_ZOOM = 4

function getFileType(filename) {
    const ext = filename?.split('.').pop()?.toLowerCase() || ''
    if (IMAGE_EXTENSIONS.includes(ext)) return 'image'
    if (ext === 'pdf') return 'pdf'
    return 'other'
}

function ZoomControls({ onZoomIn, onZoomOut, onReset, canZoomIn, canZoomOut }) {
    return (
        <div className="flex items-center gap-0.5 bg-gray-100 border border-gray-300 rounded px-1">
            <button
                type="button"
                onClick={onZoomOut}
                disabled={!canZoomOut}
                title="Zoom out"
                className="p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            </button>
            <button
                type="button"
                onClick={onReset}
                title="Fit to screen"
                className="p-1.5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </button>
            <button
                type="button"
                onClick={onZoomIn}
                disabled={!canZoomIn}
                title="Zoom in"
                className="p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    )
}

ZoomControls.propTypes = {
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    canZoomIn: PropTypes.bool.isRequired,
    canZoomOut: PropTypes.bool.isRequired,
}

function DownloadButton({ blob, filename }) {
    const { downloadFromBlob } = useDownloadFileButton()

    function handleDownload() {
        downloadFromBlob(blob, filename)
    }

    return (
        <button
            type="button"
            onClick={handleDownload}
            title="Download file"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded cursor-pointer transition-colors"
        >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
        </button>
    )
}

DownloadButton.propTypes = {
    blob: PropTypes.object,
    filename: PropTypes.string,
}

function FileViewer({ filename, blobPath, zoom, blobCacheRef, onBlobFetch }) {
    const [objectUrl, setObjectUrl] = useState(null)
    const [blob, setBlob] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })
    const containerRef = React.useRef(null)

    useEffect(function () {
        if (!blobPath) return

        let currentUrl = null
        const fileExt = blobPath.split('.').pop()?.toLowerCase()

        // Check if blob is already cached
        const cachedBlob = blobCacheRef?.current?.[blobPath]
        if (cachedBlob) {
            setBlob(cachedBlob)
            currentUrl = window.URL.createObjectURL(cachedBlob)
            setObjectUrl(currentUrl)
            setIsLoading(false)
            setError(null)
            return function () {
                if (currentUrl) {
                    window.URL.revokeObjectURL(currentUrl)
                }
            }
        }

        setIsLoading(true)
        setError(null)
        setObjectUrl(null)
        setBlob(null)

        getFile(blobPath)
            .then(function (result) {
                const blobToUse = fileExt === 'pdf'
                    ? new Blob([result], { type: 'application/pdf' })
                    : result
                setBlob(blobToUse)
                currentUrl = window.URL.createObjectURL(blobToUse)
                setObjectUrl(currentUrl)
                // Cache the blob in parent
                if (onBlobFetch) {
                    onBlobFetch(blobPath, blobToUse)
                }
            })
            .catch(function () {
                setError('Failed to load the file. Please try again.')
            })
            .finally(function () {
                setIsLoading(false)
            })

        return function () {
            if (currentUrl) {
                window.URL.revokeObjectURL(currentUrl)
            }
        }
    }, [blobPath, blobCacheRef, onBlobFetch])

    function handleMouseDown(e) {
        if (zoom <= 1) return
        const container = containerRef.current
        if (!container) return
        setIsDragging(true)
        setDragStart({
            x: e.clientX,
            y: e.clientY,
            scrollLeft: container.scrollLeft,
            scrollTop: container.scrollTop,
        })
    }

    function handleMouseMove(e) {
        if (!isDragging) return
        const container = containerRef.current
        if (!container) return
        e.preventDefault()
        container.scrollLeft = dragStart.scrollLeft - (e.clientX - dragStart.x)
        container.scrollTop = dragStart.scrollTop - (e.clientY - dragStart.y)
    }

    function handleMouseUp() {
        setIsDragging(false)
    }

    useEffect(function () {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
        return function () {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, dragStart])

    const fileType = getFileType(filename)
    const isZoomed = zoom > 1

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
                <div className="animate-pulse space-y-3 w-full max-w-lg">
                    <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-72 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3">
                <svg className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-500 text-sm">{error}</p>
            </div>
        )
    }

    if (!objectUrl) return null

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            {/* Download bar shown for all viewable types */}
            <div className="flex justify-end items-center px-4 py-2 bg-gray-50 border-b border-gray-200 shrink-0">
                <DownloadButton blob={blob} filename={filename} />
            </div>

            {/* Image viewer */}
            {fileType === 'image' && (
                <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    className={`flex-1 overflow-auto bg-gray-100 ${
                        isZoomed
                            ? isDragging ? 'cursor-grabbing' : 'cursor-grab'
                            : ''
                    }`}
                >
                    <div
                        style={{
                            display: 'flex',
                            minWidth: '100%',
                            minHeight: '100%',
                            padding: '1rem',
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={objectUrl}
                            alt={filename}
                            draggable={false}
                            onLoad={function (e) {
                                setNaturalSize({
                                    width: e.target.naturalWidth,
                                    height: e.target.naturalHeight,
                                })
                            }}
                            style={{
                                margin: 'auto',
                                flexShrink: 0,
                                ...(isZoomed && naturalSize.width > 0
                                    ? {
                                        width: naturalSize.width * zoom,
                                        height: naturalSize.height * zoom,
                                        maxWidth: 'none',
                                        maxHeight: 'none',
                                        transition: 'width 0.15s ease, height 0.15s ease',
                                    }
                                    : {
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    })
                            }}
                            className="rounded shadow-lg select-none"
                        />
                    </div>
                </div>
            )}

            {/* PDF viewer */}
            {fileType === 'pdf' && (
                <div className="flex-1 overflow-hidden bg-white">
                    <embed
                        src={objectUrl}
                        type="application/pdf"
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                        }}
                    />
                </div>
            )}

            {/* Unsupported file type */}
            {fileType === 'other' && (
                <div className="flex-1 flex flex-col items-center justify-center gap-5 bg-gray-50">
                    <svg className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Preview is not available for this file type.</p>
                    <DownloadButton blob={blob} filename={filename} />
                </div>
            )}
        </div>
    )
}

FileViewer.propTypes = {
    filename: PropTypes.string,
    blobPath: PropTypes.string,
    zoom: PropTypes.number.isRequired,
    blobCacheRef: PropTypes.object,
    onBlobFetch: PropTypes.func,
}

function BlobViewerModal({ isOpen, onClose, attachments }) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [zoom, setZoom] = useState(1)
    const blobCacheRef = React.useRef({})

    useEffect(function () {
        if (isOpen) {
            setSelectedIndex(0)
            setZoom(1)
        }
    }, [isOpen])

    function handleBlobFetch(blobPath, blob) {
        blobCacheRef.current[blobPath] = blob
    }

    // Reset zoom when switching files
    useEffect(function () {
        setZoom(1)
    }, [selectedIndex])

    // Lock body scroll
    useEffect(function () {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        return function () {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Keyboard shortcuts
    useEffect(function () {
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            } else if (e.key === '+' || e.key === '=') {
                setZoom(function (prev) { return Math.min(prev + ZOOM_STEP, MAX_ZOOM) })
            } else if (e.key === '-') {
                setZoom(function (prev) { return Math.max(prev - ZOOM_STEP, MIN_ZOOM) })
            } else if (e.key === '0') {
                setZoom(1)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }
        return function () {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    function handleZoomIn() {
        setZoom(function (prev) { return Math.min(prev + ZOOM_STEP, MAX_ZOOM) })
    }

    function handleZoomOut() {
        setZoom(function (prev) { return Math.max(prev - ZOOM_STEP, MIN_ZOOM) })
    }

    function handleResetZoom() {
        setZoom(1)
    }

    if (!isOpen || !attachments || attachments.length === 0) return null

    const selected = attachments[selectedIndex]
    const hasMultiple = attachments.length > 1
    const fileType = getFileType(selected?.filename)
    const showZoomControls = fileType === 'image'

    return (
        <div className="fixed inset-0 z-200 flex flex-col bg-white">

            {/* Top toolbar */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200 shrink-0">

                {/* Filename */}
                <span
                    className="text-gray-900 text-sm font-medium truncate max-w-xs sm:max-w-sm"
                    title={selected?.filename}
                >
                    {selected?.filename}
                </span>

                <div className="flex items-center gap-2 ml-auto">
                    {/* Zoom controls */}
                    {showZoomControls && (
                        <ZoomControls
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                            onReset={handleResetZoom}
                            canZoomIn={zoom < MAX_ZOOM}
                            canZoomOut={zoom > 1}
                        />
                    )}

                    {/* Keyboard hint */}
                    <span className="hidden sm:block text-xs text-gray-400 select-none">
                        {showZoomControls ? '+/- zoom · ' : ''}Esc to close
                    </span>

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        title="Close (Esc)"
                        className="p-1.5 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors rounded hover:bg-gray-100"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* File tabs (multiple attachments) */}
            {hasMultiple && (
                <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 border-b border-gray-200 overflow-x-auto shrink-0">
                    {attachments.map(function (attachment, index) {
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={function () { setSelectedIndex(index) }}
                                className={`px-3 py-1 rounded text-xs whitespace-nowrap cursor-pointer transition-colors ${
                                    selectedIndex === index
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                {attachment.filename}
                            </button>
                        )
                    })}
                </div>
            )}

            {/* File content */}
            <div className="flex-1 overflow-hidden">
                <FileViewer
                    key={selected?.blobPath}
                    filename={selected?.filename}
                    blobPath={selected?.blobPath}
                    zoom={zoom}
                    blobCacheRef={blobCacheRef}
                    onBlobFetch={handleBlobFetch}
                />
            </div>
        </div>
    )
}

BlobViewerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    attachments: PropTypes.arrayOf(
        PropTypes.shape({
            filename: PropTypes.string.isRequired,
            blobPath: PropTypes.string.isRequired,
        })
    ),
}

export default BlobViewerModal
