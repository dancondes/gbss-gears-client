import { create } from 'zustand';
import logger from '@/utilities/logger'
import useTabStore from './tab-store'

const UI_SETTINGS_KEY = 'gbss_ui_settings';

function loadUISettings() {
    try {
        const stored = localStorage.getItem(UI_SETTINGS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        logger.error('Failed to load UI settings:', error);
        return {};
    }
}

function saveUISettings(settings) {
    try {
        localStorage.setItem(UI_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        logger.error('Failed to save UI settings:', error);
    }
}

/**
 * UI Store
 * Manages UI state like unsaved changes and page refresh callbacks
 */
const useUIStore = create((set, get) => {
    const initialSettings = loadUISettings();
    
    return {
        // State
        hasUnsavedChanges: false,
        clientBulletinModalOpen: false,
        staffBulletinModalOpen: false,
        sidebarMinimized: initialSettings.sidebarMinimized ?? false,
        refreshCallbacks: {},
        employeeClearanceFormModalOpen: false,
        employeeDetailsForClearanceForm: null,
        
        // UI Settings (persisted to localStorage)
        showSubmenuOnHover: initialSettings.showSubmenuOnHover ?? false,

        // Actions
        setHasUnsavedChanges: (hasChanges) => set({ hasUnsavedChanges: hasChanges }),
        setClientBulletinModalOpen: (isOpen) => set({ clientBulletinModalOpen: isOpen }),
        setStaffBulletinModalOpen: (isOpen) => set({ staffBulletinModalOpen: isOpen }),
        setSidebarMinimized: (minimized) => {
            set({ sidebarMinimized: minimized });
            const { sidebarMinimized: updatedMinimized } = get();
            saveUISettings({ ...loadUISettings(), sidebarMinimized: updatedMinimized });
        },
        setEmployeeClearanceFormModalOpen: (isOpen, employee) => set({ employeeClearanceFormModalOpen: isOpen, employeeDetailsForClearanceForm: isOpen ? employee : null }),
        
        // Register a refresh callback for a specific tab path
        setRefreshCallback: (path, callback) => set((state) => ({
            refreshCallbacks: { ...state.refreshCallbacks, [path]: callback }
        })),
        
        // Clear the refresh callback for a specific tab path
        clearRefreshCallback: (path) => set((state) => {
            const updated = { ...state.refreshCallbacks }
            delete updated[path]
            return { refreshCallbacks: updated }
        }),
        
        // Trigger the refresh callback for the currently active tab
        triggerRefresh: () => {
            const { refreshCallbacks } = get()
            const activeTab = useTabStore.getState().getActiveTab()
            if (!activeTab) return
            const callback = refreshCallbacks[activeTab.path]
            if (callback && typeof callback === 'function') {
                callback()
            }
        },
        
        // UI Settings Actions
        setShowSubmenuOnHover: (value) => {
            set({ showSubmenuOnHover: value });
            const { showSubmenuOnHover } = get();
            saveUISettings({ ...loadUISettings(), showSubmenuOnHover });
        }
    };
});

export default useUIStore;