const BYPASS_STORAGE_KEY = 'bypass_enabled'

function getStorage() {
    if (typeof window === 'undefined' || !window.localStorage) {
        return null
    }

    try {
        return window.localStorage
    } catch {
        return null
    }
}

export function enableDeviceBypass() {
    const storage = getStorage()

    if (!storage) {
        return false
    }

    try {
        storage.setItem(BYPASS_STORAGE_KEY, 'true')
        return true
    } catch {
        return false
    }
}

export function isDeviceBypassed() {
    const storage = getStorage()

    if (!storage) {
        return false
    }

    try {
        return storage.getItem(BYPASS_STORAGE_KEY) === 'true'
    } catch {
        return false
    }
}

export default {
    enableDeviceBypass,
    isDeviceBypassed,
}
