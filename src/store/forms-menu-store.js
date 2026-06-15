import { create } from 'zustand'
import { MENU_ITEMS } from '@/constants/menu'

const DEFAULT_ACCESS_ITEMS = [];

function filterNavItemsByAccess(buttonPermissions) {
    return MENU_ITEMS // TODO: update once permissions are implemented for all buttons, currently only filters 1 level of submenu
    return MENU_ITEMS.map(mainItem => ({
        ...mainItem,
        submenu: mainItem.submenu
            .map(subItem => ({
                ...subItem,
                submenu: subItem.submenu?.filter(item => !item.id || buttonPermissions.includes(item.id) || DEFAULT_ACCESS_ITEMS.includes(item.id))
            }))
            // .filter(subItem => subItem.submenu && subItem.submenu.length > 0)
    }))
        // .filter(mainItem => mainItem.submenu && mainItem.submenu.length > 0);
}


const useFormsMenuStore = create((set, get) => {
    return {
        menuItems: [],
        buttonPermissions: [],
        setFormsMenuData: function (buttonPermissions) {
            console.log(filterNavItemsByAccess(buttonPermissions))
            set({
                buttonPermissions,
                menuItems: filterNavItemsByAccess(buttonPermissions),
            })
        },

        clearFormsMenuData: function () {
            // set({
            //     buttonPermissions: [],
            //     menuItems: [],
            // })
        },

        checkIfThereAreMenuItemsToShow: () => {
            const { menuItems } = get();
            return menuItems.length > 0;
        },

        checkIfUserHavAccessToTab: (tab) => {
            return true; // TODO: update once permissions are implemented for all buttons, currently only checks for main menu items and 1 level of submenu
            const rowId = tab?.rowId ? `-${tab.rowId}` : '';
            const tabId = tab?.id?.replace(rowId, '') ?? tab?.id; // removes the rowId part for checking permissions

            return get().buttonPermissions.includes(tabId) || DEFAULT_ACCESS_ITEMS.includes(tabId);
        },

        checkPermissions: (ids) => {
            const { buttonPermissions } = get()
            return ids.map(id => id && (buttonPermissions.includes(id) || DEFAULT_ACCESS_ITEMS.includes(id)))
        },
    }
})

export default useFormsMenuStore