import useMessageModal from '@/hooks/use-message-modal'

function useBlobViewerModal() {
    const {
        blobViewerModal,
        showBlobViewerModal,
        showBlobViewerInNewWindow,
        hideBlobViewerModal,
    } = useMessageModal()

    return {
        viewer: blobViewerModal,
        isOpen: blobViewerModal.isOpen,
        attachments: blobViewerModal.attachments,
        openViewer: showBlobViewerModal,
        openBlobViewerInNewWindow: showBlobViewerInNewWindow,
        closeViewer: hideBlobViewerModal,
    }
}

export default useBlobViewerModal
