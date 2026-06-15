import { useContext } from 'react'
import { MessageModalContext } from '@/contexts/MessageModalContext'

function useConfirmationModal() {
    const context = useContext(MessageModalContext)

    if (!context) {
        throw new Error('useConfirmationModal must be used within MessageModalProvider')
    }

    const {
        confirmationModal,
        showConfirmationModal,
        hideConfirmationModal,
    } = context

    function openModal(nextPayload = null, options = {}) {
        showConfirmationModal({
            ...options,
            payload: nextPayload,
        })
    }

    function closeModal() {
        hideConfirmationModal()
    }

    return {
        confirmationModal,
        isOpen: confirmationModal.isOpen,
        payload: confirmationModal.payload,
        loading: confirmationModal.loading,
        showConfirmationModal,
        hideConfirmationModal,
        openModal,
        closeModal,
    }
}

export default useConfirmationModal
