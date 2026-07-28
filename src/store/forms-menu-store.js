import { create } from 'zustand'
import { MENU_ITEMS } from '@/constants/menu'
import useAuthStore from './auth-store'

const useFormsMenuStore = create((set, get) => {
    return {
        menuItems: MENU_ITEMS,

        checkIfThereAreMenuItemsToShow: () => {
            const { menuItems } = get()
            return menuItems.length > 0
        },

        findParentMenuItem: (tabOrId) => {
            const { menuItems } = get()
            const targetId = typeof tabOrId === 'string' ? tabOrId : tabOrId?.id

            if (!targetId) return null

            for (const menuItem of menuItems) {
                if (!Array.isArray(menuItem.submenu)) continue

                const match = menuItem.submenu.find((subItem) => subItem.id === targetId)

                if (match) {
                    return menuItem
                }
            }

            return null
        },

        checkIfUserHavAccessToTab: (tab) => {
            const { findParentMenuItem } = get()

            if (['Clock-In-Out', 'Settings'].includes(tab.id)) return true

            const parentItem = findParentMenuItem(tab)
            if (!parentItem) return false

            const canViewTeams = useAuthStore((state) => state.canViewTeams)
            const canViewIT = useAuthStore((state) => state.canViewIT)

            if (parentItem.name === 'Team' && !canViewTeams()) {
                return false
            }

            if (parentItem.name === 'IT' && !canViewIT()) {
                return false
            }

            return true
        },
    }
})

export default useFormsMenuStore