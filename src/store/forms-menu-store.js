import { create } from 'zustand'
import { EMPLOYEE_TABS, MENU_ITEMS, SIDEBAR_MENU_ITEMS } from '@/constants/menu'

const DEFAULT_ACCESS_ITEMS = ['Reload', 'Settings'];

function filterNavItemsByAccess(buttonPermissions) {
    return MENU_ITEMS.map(mainItem => ({
        ...mainItem,
        submenu: mainItem.submenu
            .map(subItem => ({
                ...subItem,
                submenu: subItem.submenu?.filter(item => !item.id || buttonPermissions.includes(item.id) || DEFAULT_ACCESS_ITEMS.includes(item.id))
            }))
            .filter(subItem => subItem.submenu && subItem.submenu.length > 0)
    }))
        .filter(mainItem => mainItem.submenu && mainItem.submenu.length > 0);
}

function filterSidebarItemsByAccess(buttonPermissions) {
    return SIDEBAR_MENU_ITEMS.map(category => ({
        ...category,
        items: category.items.filter(item => buttonPermissions.includes(item.id) || DEFAULT_ACCESS_ITEMS.includes(item.id))
    }))
        .filter(category => category.items.length > 0);
}

function filterEmployeeTabItemsByAccess(buttonPermissions) {
    return EMPLOYEE_TABS.filter(item => buttonPermissions.includes(item.id) || DEFAULT_ACCESS_ITEMS.includes(item.id));
}

const useFormsMenuStore = create((set, get) => {
    return {
        menuItems: [],
        sidebarMenuItems: [],
        employeeTabs: [],
        buttonPermissions: [],
        setFormsMenuData: function (buttonPermissions) {
            set({
                buttonPermissions,
                menuItems: filterNavItemsByAccess(buttonPermissions),
                sidebarMenuItems: filterSidebarItemsByAccess(buttonPermissions),
                employeeTabs: filterEmployeeTabItemsByAccess(buttonPermissions)
            })
        },

        clearFormsMenuData: function () {
            set({
                buttonPermissions: [],
                menuItems: [],
                sidebarMenuItems: [],
                employeeTabs: [],
            })
        },

        checkIfThereAreMenuItemsToShow: () => {
            const { menuItems, sidebarMenuItems } = get();
            return menuItems.length > 0 || sidebarMenuItems.length > 0;
        },

        checkIfUserHavAccessToTab: (tab) => {
            const rowId = tab?.rowId ? `-${tab.rowId}` : '';
            const tabId = tab?.id?.replace(rowId, '') ?? tab?.id; // removes the rowId part for checking permissions

            return get().buttonPermissions.includes(tabId) || DEFAULT_ACCESS_ITEMS.includes(tabId);
        },

        checkPermissions: (ids) => {
            const { buttonPermissions } = get()
            return ids.map(id => id && (buttonPermissions.includes(id) || DEFAULT_ACCESS_ITEMS.includes(id)))
        },

        checkIfUserHasAccessToAllEmployeeTabs: () => {
            const { buttonPermissions } = get();

            return EMPLOYEE_TABS.every(tab =>
                buttonPermissions.includes(tab.id) || DEFAULT_ACCESS_ITEMS.includes(tab.id)
            );
        }
    }
})

export default useFormsMenuStore