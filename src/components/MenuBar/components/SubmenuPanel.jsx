import React from 'react'
import PropTypes from 'prop-types'
import useTabNavigation from '@/hooks/use-tab-navigation'
import { useUIStore } from '@/store'
import useMessageModal from '@/hooks/use-message-modal'

// ---------------------------------------------------------------------------
// SubmenuPanel – the dropdown panel that appears below a top-level menu item
// ---------------------------------------------------------------------------

function SubmenuPanel({ items, isOpen, onClose }) {
    const { navigate } = useTabNavigation()
    const { showMessageModal } = useMessageModal()
    const setCOERequestModalOpen = useUIStore(state => state.setCOERequestModalOpen)
    const setPayslipPinModalOpen = useUIStore(state => state.setPayslipPinModalOpen)
    const setChangePasswordModalOpen = useUIStore(state => state.setChangePasswordModalOpen)
    const setChangePinModalOpen = useUIStore(state => state.setChangePinModalOpen)

    if (!isOpen || !items || items.length === 0) return null

    function handleItemClick(item) {
        onClose()

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
            case 'about':
                window.open('https://www.gbss.com.sg/about-us/', '_blank', 'noopener,noreferrer')
                return
            case 'change-password':
                setChangePasswordModalOpen(true)
                return
            case 'change-pin':
                setChangePinModalOpen(true)
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

    return (
        <div className="absolute left-0 top-full mt-0.5 z-50 min-w-50 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {items.map(function (item) {
                return (
                    <button
                        key={item.id || item.name}
                        onClick={function () { handleItemClick(item) }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors focus:outline-none focus:bg-gray-50"
                    >
                        {item.icon && (
                            <span className="shrink-0 text-gray-400">
                                {item.icon}
                            </span>
                        )}
                        <span className="flex-1">{item.name}</span>
                        {item.shortcut && (
                            <span className="ml-auto text-xs text-gray-400 font-mono">
                                {item.shortcut}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

SubmenuPanel.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            icon: PropTypes.element,
            url: PropTypes.string,
        })
    ).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default SubmenuPanel
