import { create } from 'zustand';
import logger from '@/utilities/logger'

const STORAGE_KEY = 'tipModalState';
const OPT_OUT_DAYS = 7;

function getStoredState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        
        const state = JSON.parse(stored);
        
        if (state.optOutUntil) {
            const optOutDate = new Date(state.optOutUntil);
            const now = new Date();
            
            if (now < optOutDate) {
                return state;
            }
            
            return {
                currentTipIndex: state.currentTipIndex || 0,
                optOutUntil: null
            };
        }
        
        return state;
    } catch {
        return null;
    }
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        logger.error('Failed to save tip modal state:', error);
    }
}

const useTipModalStore = create((set, get) => {
    const initialState = getStoredState() || {
        currentTipIndex: 0,
        optOutUntil: null
    };

    return {
        isOpen: false,
        currentTipIndex: initialState.currentTipIndex,
        optOutUntil: initialState.optOutUntil,
        dontShowAgain: false,

        openModal: () => {
            const { optOutUntil } = get();
            
            if (optOutUntil) {
                const optOutDate = new Date(optOutUntil);
                const now = new Date();
                
                if (now < optOutDate) {
                    return;
                }
                
                set({ optOutUntil: null });
                saveState({
                    currentTipIndex: get().currentTipIndex,
                    optOutUntil: null
                });
            }
            
            set({ isOpen: true, dontShowAgain: false });
        },

        closeModal: () => {
            const { dontShowAgain, currentTipIndex } = get();
            
            if (dontShowAgain) {
                const optOutDate = new Date();
                optOutDate.setDate(optOutDate.getDate() + OPT_OUT_DAYS);
                
                set({ optOutUntil: optOutDate.toISOString() });
                saveState({
                    currentTipIndex,
                    optOutUntil: optOutDate.toISOString()
                });
            }
            
            set({ isOpen: false });
        },

        nextTip: (totalTips) => {
            const nextIndex = (get().currentTipIndex + 1) % totalTips;
            set({ currentTipIndex: nextIndex });
            saveState({
                currentTipIndex: nextIndex,
                optOutUntil: get().optOutUntil
            });
        },

        setDontShowAgain: (value) => set({ dontShowAgain: value }),

        reset: () => {
            set({
                isOpen: false,
                currentTipIndex: 0,
                optOutUntil: null,
                dontShowAgain: false
            });
            localStorage.removeItem(STORAGE_KEY);
        }
    };
});

export default useTipModalStore;
