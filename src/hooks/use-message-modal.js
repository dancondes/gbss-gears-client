import { useContext } from 'react'
import { MessageModalContext } from '@/contexts/MessageModalContext'

function useMessageModal() {
    const context = useContext(MessageModalContext)

    if (!context) {
        throw new Error('useMessageModal must be used within MessageModalProvider')
    }

    return context
}

export default useMessageModal
