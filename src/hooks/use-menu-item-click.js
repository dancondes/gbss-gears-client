// use-menu-item-click.js
import useTabNavigation from './use-tab-navigation'
import useMessageModal from './use-message-modal'
import { useUIStore } from '@/store'

function useMenuItemClick(onClose) {
    const { navigate } = useTabNavigation()
    const { showMessageModal } = useMessageModal()
    const setCOERequestModalOpen = useUIStore(state => state.setCOERequestModalOpen)
    const setPayslipPinModalOpen = useUIStore(state => state.setPayslipPinModalOpen)

    function handleItemClick(item) {
        onClose?.()

        switch (item.action) {
            case 'coe-request':
                setCOERequestModalOpen(true)
                return
            case 'payslip-request':
                setPayslipPinModalOpen(true)
                return
            case 'user-guide':
                showMessageModal('This feature is not yet ready.', {
                    type: 'info',
                    title: 'User Guide',
                })
                return
            case 'change-password':
                navigate('/user/personal-details', {
                    id: 'Personal-Details',
                    label: 'Personal Details',
                    state: { goToChangePassword: true },
                })
                return
            case 'change-pin':
                navigate('/user/personal-details', {
                    id: 'Personal-Details',
                    label: 'Personal Details',
                    state: { goToChangePin: true },
                })
                return
        }

        if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer')
            return
        }

        if (item.path) {
            navigate(item.path, {
                id: item.id,
                label: item.tabName || item.name,
            })
        }

        if (item.action && typeof item.action === 'function') {
            item.action()
        }
    }

    return handleItemClick
}

export default useMenuItemClick