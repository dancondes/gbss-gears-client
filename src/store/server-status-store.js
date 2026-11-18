import { create } from 'zustand'

const OUTAGE_STATUSES = [502, 503, 504]

export function isOutageStatus(status) {
    return OUTAGE_STATUSES.includes(status)
}

const useServerStatusStore = create(function (set) {
    return {
        isServerUnavailable: false,
        outageStatus: null,
        outageMessage: '',
        unavailableSince: null,

        setServerUnavailable: function (details = {}) {
            set(function (state) {
                const nextStatus = Number.isInteger(details.status) ? details.status : null
                const statusIsOutage = nextStatus === null || isOutageStatus(nextStatus)

                if (!statusIsOutage) {
                    return state
                }

                return {
                    isServerUnavailable: true,
                    outageStatus: nextStatus,
                    outageMessage: details.message || state.outageMessage || 'Server is unavailable',
                    unavailableSince: state.unavailableSince || new Date().toISOString(),
                }
            })
        },

        setServerAvailable: function () {
            set({
                isServerUnavailable: false,
                outageStatus: null,
                outageMessage: '',
                unavailableSince: null,
            })
        },
    }
})

export default useServerStatusStore