const USER_GUIDE_PENDING_KEY = 'gbss_user_guide_pending'
const USER_GUIDE_LAUNCH_EVENT = 'gbss:user-guide-launch'

function setPendingUserGuide(menuId) {
    if (!menuId || typeof window === 'undefined') {
        return
    }

    const payload = {
        menuId,
        createdAt: Date.now(),
    }

    window.sessionStorage.setItem(USER_GUIDE_PENDING_KEY, JSON.stringify(payload))
    window.dispatchEvent(new CustomEvent(USER_GUIDE_LAUNCH_EVENT, { detail: payload }))
}

function getPendingUserGuide() {
    if (typeof window === 'undefined') {
        return null
    }

    const raw = window.sessionStorage.getItem(USER_GUIDE_PENDING_KEY)

    if (!raw) {
        return null
    }

    try {
        return JSON.parse(raw)
    } catch {
        clearPendingUserGuide()
        return null
    }
}

function clearPendingUserGuide() {
    if (typeof window === 'undefined') {
        return
    }

    window.sessionStorage.removeItem(USER_GUIDE_PENDING_KEY)
}

function consumePendingUserGuide() {
    const payload = getPendingUserGuide()
    clearPendingUserGuide()
    return payload
}

export {
    USER_GUIDE_LAUNCH_EVENT,
    setPendingUserGuide,
    getPendingUserGuide,
    clearPendingUserGuide,
    consumePendingUserGuide,
}
