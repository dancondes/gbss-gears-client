import { useContext } from 'react'
import { MessageModalContext } from '@/contexts/MessageModalContext'

function useInputModal() {
    const context = useContext(MessageModalContext)

    if (!context) {
        throw new Error('useInputModal must be used within MessageModalProvider')
    }

    const {
        inputModal,
        showInputModal,
        hideInputModal,
    } = context

    function openModal(nextPayload = null, options = {}) {
        showInputModal({
            ...options,
            payload: nextPayload,
        })
    }

    function closeModal() {
        hideInputModal()
    }

    return {
        inputModal,
        isOpen: inputModal.isOpen,
        payload: inputModal.payload,
        loading: inputModal.loading,
        fields: inputModal.fields,
        showInputModal,
        hideInputModal,
        openModal,
        closeModal,
    }
}

export default useInputModal