import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useFormsMenuStore from './forms-menu-store'
import useTabStore from './tab-store';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            userId: null,
            isAuthenticated: false,
            isLoading: false,
            sessionExpired: false,

            setUser: (user) => {
                set({ user, isAuthenticated: !!user, userId: user ? user.id : null })
            },

            setTokens: (accessToken, refreshToken) => {
                set({
                    token: accessToken,
                    refreshToken: refreshToken || null,
                })
            },

            getTokens: () => {
                return {
                    accessToken: useAuthStore.getState().token,
                    refreshToken: useAuthStore.getState().refreshToken,
                }
            },

            setSessionExpired: (sessionExpired) => { set({ sessionExpired }) },

            login: (user) => {
                get().setSessionExpired(false)
                get().setTokens(user.token, user.refreshToken)
                useTabStore.getState().closeAllTabs()
            },

            logout: () => {
                useFormsMenuStore.getState().clearFormsMenuData()
                useTabStore.getState().closeAllTabs()

                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    userId: null,
                    isAuthenticated: false,
                    sessionExpired: false
                })
            },

            updateUser: (updates) => {
                set(function(state) {
                    if (!state.user) return { user: null }

                    return { user: { ...state.user, ...updates } }
                })
            },

            setLoading: (isLoading) => { set({ isLoading }) },
        }),
        {
            name: 'gears-auth-storage',
            partialize: function(state) {
                return { token: state.token, refreshToken: state.refreshToken }
            },
        }
    )
);

export default useAuthStore;
