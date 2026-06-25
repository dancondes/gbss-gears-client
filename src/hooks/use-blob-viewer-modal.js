import useMessageModal from '@/hooks/use-message-modal'

function useBlobViewerModal() {
    const {
        blobViewerModal,
        showBlobViewerModal,
        showBlobViewerFromDocument,
        hideBlobViewerModal,
    } = useMessageModal()

    return {
        viewer: blobViewerModal,
        isOpen: blobViewerModal.isOpen,
        attachments: blobViewerModal.attachments,
        openViewer: showBlobViewerModal,
        openViewerFromDocument: showBlobViewerFromDocument,
        closeViewer: hideBlobViewerModal,
    }
}

export default useBlobViewerModal
