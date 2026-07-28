import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const UI_SETTINGS_KEY = 'gears_ui_settings';

/**
 * UI Store
 * Manages UI state like unsaved changes and page refresh callbacks
 */
const useUIStore = create(
    persist(
        (set) => ({
            // State
            coeRequestModalOpen: false,
            payslipPinModalOpen: false,
            changePasswordModalOpen: false,
            changePinModalOpen: false,

            // states to be persisted in localStorage
            enableSound: false,
            enableAlertForLunchBreak: false,

            // UI Settings Actions
            setCOERequestModalOpen: (isOpen) => {
                set({ coeRequestModalOpen: isOpen });
            },

            setPayslipPinModalOpen: (isOpen) => {
                set({ payslipPinModalOpen: isOpen });
            },

            setChangePasswordModalOpen: (isOpen) => {
                set({ changePasswordModalOpen: isOpen });
            },

            setChangePinModalOpen: (isOpen) => {
                set({ changePinModalOpen: isOpen });
            },

            setEnableSound: (enableSound) => {
                set({ enableSound });
            },

            setEnableAlertForLunchBreak: (enableAlertForLunchBreak) => {
                set({ enableAlertForLunchBreak });
            }
        }),
        {
            name: UI_SETTINGS_KEY,
            // Only enableSound is persisted — modal open/close state stays
            // in-memory and always resets to false on reload, as before.
            partialize: (state) => ({
                enableSound: !!state.enableSound,
                enableAlertForLunchBreak: !!state.enableAlertForLunchBreak
            }),
            version: 0
        }
    )
);

export default useUIStore;