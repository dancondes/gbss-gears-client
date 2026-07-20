import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useTabStore from './tab-store';

const ADMIN_ID = 'b3d9fdc9-52e1-419b-b59f-0812aa590488'
const TEAM_LEAD_ID = '09b62cd6-f215-439a-8606-ead5519bab6a'
// const USER_ID= '02553621-954a-43fe-9073-2c5ede1e1144'

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

            canViewTeams: () => {
                const user = get().user
                if (!user) return false

                return [ADMIN_ID, TEAM_LEAD_ID].includes(user.role?.id?.toLowerCase())
            },

            canViewIT: () => {
                const user = get().user
                if (!user) return false

                return [ADMIN_ID].includes(user.role?.id?.toLowerCase())
            }
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
