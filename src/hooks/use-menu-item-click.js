// use-menu-item-click.js
import useTabNavigation from './use-tab-navigation'
import { useTabStore, useUIStore } from '@/store'

function useMenuItemClick(onClose) {
    const { navigate } = useTabNavigation()
    const setCOERequestModalOpen = useUIStore(state => state.setCOERequestModalOpen)
    const setPayslipPinModalOpen = useUIStore(state => state.setPayslipPinModalOpen)
    const tabs = useTabStore(state => state.tabs)

    function handleItemClick(item) {
        onClose?.()

        switch (item.action) {
            case 'coe-request':
                setCOERequestModalOpen(true)
                return
            case 'payslip-request':
                // navigate to the payslip page if the tab is already open, otherwise show the PIN modal for verification
                if (tabs.some(tab => tab.id === 'Payslip')) {
                    navigate('/user/payslip', {
                        id: 'Payslip',
                        label: 'Payslip',
                    })
                    return
                }
                setPayslipPinModalOpen(true)
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