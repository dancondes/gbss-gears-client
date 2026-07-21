import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import BlobViewerModal from '@/components/modals/BlobViewerModal'
import InputModal from '@/components/modals/InputModal'
import { getFile } from '@/services/file-service'
import { encodePaths } from '@/utilities/blob-path-encoder'

export const MessageModalContext = createContext(null)

function getDefaultMessageState() {
    return {
        isOpen: false,
        type: 'info',
        title: getDefaultTitleByType('info'),
        message: '',
        onClose: null,
    }
}

function getDefaultConfirmationState() {
    return {
        isOpen: false,
        title: 'Confirm Action',
        subtitle: null,
        message: 'Are you sure you want to proceed with this action?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        variant: 'info',
        icon: null,
        loading: false,
        payload: null,
        onConfirm: null,
        onCancel: null,
        onError: null,
        closeOnConfirm: true,
        textAlign: 'center', // 'left', 'center', 'right'
    }
}

function getDefaultBlobViewerState() {
    return {
        isOpen: false,
        attachments: [],
    }
}

function getDefaultInputModalState() {
    return {
        isOpen: false,
        title: 'Input Required',
        subtitle: null,
        fields: [],
        className: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        loading: false,
        payload: null,
        onConfirm: null,
        onCancel: null,
        onError: null,
        closeOnConfirm: true,
    }
}

function getFilenameFromPath(path) {
    if (!path) return ''
    const segments = path.split(/[/\\]/)
    return segments[segments.length - 1] || path
}

function normalizeAttachment(attachment) {
    if (!attachment) return null

    const blobPath =
        attachment.blobPath ||
        attachment.path ||
        attachment.filePath

    if (!blobPath) return null

    const filename =
        attachment.filename ||
        attachment.name ||
        attachment.fileName ||
        getFilenameFromPath(blobPath)

    return { filename, blobPath }
}

function normalizeAttachments(attachments) {
    if (!Array.isArray(attachments)) return []

    return attachments
        .map(function (attachment) {
            return normalizeAttachment(attachment)
        })
        .filter(function (attachment) {
            return Boolean(attachment)
        })
}

function normalizeModalType(type) {
    if (type === 'error' || type === 'warn' || type === 'info') {
        return type
    }

    return 'info'
}

function getDefaultTitleByType(type) {
    if (type === 'error') {
        return 'Error'
    }

    if (type === 'warn') {
        return 'Warning'
    }

    return 'Information'
}

export function MessageModalProvider({ children }) {
    const [modalState, setModalState] = useState(getDefaultMessageState)
    const [confirmationState, setConfirmationState] = useState(getDefaultConfirmationState)
    const [blobViewerState, setBlobViewerState] = useState(getDefaultBlobViewerState)
    const [inputModalState, setInputModalState] = useState(getDefaultInputModalState)

    function hideMessageModal() {
        if (typeof modalState.onClose === 'function') {
            modalState.onClose()
        }

        setModalState(getDefaultMessageState())
    }

    function showMessageModal(message, options = {}) {
        const nextType = normalizeModalType(options.type)
        const nextTitle = options.title || getDefaultTitleByType(nextType)

        setModalState({
            isOpen: true,
            type: nextType,
            title: nextTitle,
            message: message || '',
            onClose: typeof options.onClose === 'function' ? options.onClose : null,
        })
    }

    function hideConfirmationModal() {
        setConfirmationState(getDefaultConfirmationState())
    }

    function showConfirmationModal(options = {}) {
        setConfirmationState({
            isOpen: true,
            title: options.title || 'Confirm Action',
            subtitle: options.subtitle || null,
            message: options.message || 'Are you sure you want to proceed with this action?',
            confirmText: options.confirmText || 'Confirm',
            cancelText: options.cancelText || 'Cancel',
            variant: options.variant || 'info',
            icon: options.icon || null,
            loading: false,
            payload: options.payload || null,
            onConfirm: options.onConfirm || null,
            onCancel: options.onCancel || null,
            onError: options.onError || null,
            closeOnConfirm: options.closeOnConfirm !== false,
            textAlign: options.textAlign || 'center', // 'left', 'center', 'right'
        })
    }

    async function handleConfirmModal() {
        if (confirmationState.loading) return

        if (typeof confirmationState.onConfirm !== 'function') {
            hideConfirmationModal()
            return
        }

        try {
            setConfirmationState(function (previousState) {
                return {
                    ...previousState,
                    loading: true,
                }
            })

            await confirmationState.onConfirm(confirmationState.payload)

            if (confirmationState.closeOnConfirm) {
                hideConfirmationModal()
            } else {
                setConfirmationState(function (previousState) {
                    return {
                        ...previousState,
                        loading: false,
                    }
                })
            }
        } catch (error) {
            setConfirmationState(function (previousState) {
                return {
                    ...previousState,
                    loading: false,
                }
            })

            if (typeof confirmationState.onError === 'function') {
                confirmationState.onError(error, confirmationState.payload)
            }
        }
    }

    function handleCancelModal() {
        if (typeof confirmationState.onCancel === 'function') {
            confirmationState.onCancel(confirmationState.payload)
        }

        hideConfirmationModal()
    }

    function hideInputModal() {
        setInputModalState(getDefaultInputModalState())
    }

    function showInputModal(options = {}) {
        setInputModalState({
            isOpen: true,
            title: options.title || 'Input Required',
            subtitle: options.subtitle || null,
            fields: options.fields || [],
            className: options.className || '',
            confirmText: options.confirmText || 'Confirm',
            cancelText: options.cancelText || 'Cancel',
            loading: false,
            payload: options.payload || null,
            onConfirm: options.onConfirm || null,
            onCancel: options.onCancel || null,
            onError: options.onError || null,
            closeOnConfirm: options.closeOnConfirm !== false,
        })
    }

    async function handleConfirmInputModal(values) {
        if (inputModalState.loading) return

        if (typeof inputModalState.onConfirm !== 'function') {
            hideInputModal()
            return
        }

        try {
            setInputModalState(function (previousState) {
                return {
                    ...previousState,
                    loading: true,
                }
            })

            await inputModalState.onConfirm(values, inputModalState.payload)

            if (inputModalState.closeOnConfirm) {
                hideInputModal()
            } else {
                setInputModalState(function (previousState) {
                    return {
                        ...previousState,
                        loading: false,
                    }
                })
            }
        } catch (error) {
            setInputModalState(function (previousState) {
                return {
                    ...previousState,
                    loading: false,
                }
            })

            if (typeof inputModalState.onError === 'function') {
                inputModalState.onError(error, inputModalState.payload)
            }
        }
    }

    function handleCancelInputModal() {
        if (typeof inputModalState.onCancel === 'function') {
            inputModalState.onCancel(inputModalState.payload)
        }

        hideInputModal()
    }

    // not being used as of 2026/06/18 - we are now using showBlobViewerInNewWindow instead for better UX and as requested by users
    function showBlobViewerModal(attachments) {
        showBlobViewerInNewWindow(normalizeAttachments(attachments))
    }

    /**
     * @deprecated Use showBlobViewerInNewWindow instead.
     */
    // eslint-disable-next-line no-unused-vars
    function showBlobViewerFromDocument_v1(document) {
        if (!document) return

        showBlobViewerModal([
            {
                filename: document.name,
                blobPath: document.path,
            },
        ])
    }

    /**
     * @deprecated Use showBlobViewerInNewWindow instead.
     */
    // eslint-disable-next-line no-unused-vars
    function showBlobViewerFromDocument_v2(document) {
        if (!document) return

        const blobPath = document.path
        if (!blobPath) return

        getFile(blobPath)
            .then(function (result) {
                const fileExt = blobPath.split('.').pop().toLowerCase()
                const blobToUse = fileExt === 'pdf'
                    ? new Blob([result], { type: 'application/pdf' })
                    : result

                const url = window.URL.createObjectURL(blobToUse)
                const tab = window.open(url, '_blank', 'noopener,noreferrer')

                // Revoke the object URL after the tab has had time to load it
                if (tab) {
                    tab.addEventListener('load', function () {
                        window.URL.revokeObjectURL(url)
                    })
                }
            })
            .catch(function () {
                showMessageModal('Failed to load the file. Please try again.', { type: 'error' })
            })
    }

    /**
     * 
     * @param {*} documents - an object of name and path
     */
    function showBlobViewerInNewWindow(documents) {
        if (!document) return

        if (Array.isArray(document) && document.length === 0) return

        // for opening in new tab
        // const encoded = encodePaths(document.path)
        // window.open(`/view-document/${encoded}`, '_blank', 'noopener,noreferrer')

        // for opening in new window
        const normalized = Array.isArray(documents) ? documents.map(normalizeAttachment) : [normalizeAttachment(documents)]

        if (normalized.length === 0 || normalized.every((d) => !d.blobPath)) return

        const encoded = encodePaths(normalized)
        const width = 1100
        const height = 850
        const left = Math.round(window.screenX + (window.outerWidth - width) / 2)
        const top = Math.round(window.screenY + (window.outerHeight - height) / 2)

        window.open(
            `/view-document/${encoded}`,
            '_blank',
            `noopener,noreferrer,width=${width},height=${height},left=${left},top=${top}`
        )
    }

    function hideBlobViewerModal() {
        setBlobViewerState(getDefaultBlobViewerState())
    }

    const contextValue = {
        showMessageModal,
        hideMessageModal,
        showConfirmationModal,
        hideConfirmationModal,
        confirmationModal: confirmationState,
        showBlobViewerModal,
        showBlobViewerInNewWindow,
        hideBlobViewerModal,
        blobViewerModal: blobViewerState,
        showInputModal,
        hideInputModal,
        inputModal: inputModalState,
    }

    return (
        <MessageModalContext.Provider value={contextValue}>
            {children}

            <Modal
                isOpen={modalState.isOpen}
                onClose={hideMessageModal}
                title={modalState.title}
                size="md"
                closeOnEsc={false}
            >
                <div className="space-y-4">
                    {/* <div className="h-1.5 w-full bg-primary rounded-full" /> */}
                    <p className="text-sm text-gray-700">{modalState.message}</p>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={hideMessageModal}
                            className="btn-primary cursor-pointer"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={confirmationState.isOpen}
                title={confirmationState.title}
                subtitle={confirmationState.subtitle}
                message={confirmationState.message}
                confirmText={confirmationState.confirmText}
                cancelText={confirmationState.cancelText}
                variant={confirmationState.variant}
                icon={confirmationState.icon}
                onConfirm={handleConfirmModal}
                onCancel={handleCancelModal}
                loading={confirmationState.loading}
                textAlign={confirmationState.textAlign}
            />

            <BlobViewerModal
                isOpen={blobViewerState.isOpen}
                onClose={hideBlobViewerModal}
                attachments={blobViewerState.attachments}
            />

            <InputModal
                isOpen={inputModalState.isOpen}
                onClose={hideInputModal}
                title={inputModalState.title}
                subtitle={inputModalState.subtitle}
                fields={inputModalState.fields}
                className={inputModalState.className}
                confirmText={inputModalState.confirmText}
                cancelText={inputModalState.cancelText}
                loading={inputModalState.loading}
                onConfirm={handleConfirmInputModal}
                onCancel={handleCancelInputModal}
            />
        </MessageModalContext.Provider>
    )
}

MessageModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
}