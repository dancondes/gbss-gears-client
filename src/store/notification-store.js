import { toast } from 'sonner'
import { create } from 'zustand'

const NOTIFICATION_STORAGE_KEY = 'gears_notifications'
const NOTIFICATION_STORAGE_VERSION = 1
const NOTIFICATION_TTL_MS = 1000 * 60 * 60 * 24 * 30
const NOTIFICATION_MAX_ITEMS = 50

function isStorageAvailable() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function toValidTimestamp(value) {
    const date = new Date(value)
    const timestamp = date.getTime()

    return Number.isNaN(timestamp) ? null : timestamp
}

function normalizeNotification(notification) {
    if (!notification || typeof notification !== 'object') {
        return null
    }

    const createdAtSource = notification.createdAt || new Date().toISOString()
    const createdAtTimestamp = toValidTimestamp(createdAtSource)
    const createdAt = createdAtTimestamp ? new Date(createdAtTimestamp).toISOString() : new Date().toISOString()

    return {
        id: String(notification.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        title: typeof notification.title === 'string' && notification.title.trim() ? notification.title : 'Notification',
        message: typeof notification.message === 'string' ? notification.message : '',
        type: typeof notification.type === 'string' && notification.type.trim() ? notification.type : 'info',
        createdAt,
        isRead: Boolean(notification.isRead),
    }
}

function pruneAndSortNotifications(notifications) {
    const now = Date.now()

    return notifications
        .map(function (notification) {
            return normalizeNotification(notification)
        })
        .filter(function (notification) {
            if (!notification) {
                return false
            }

            const createdAtTimestamp = toValidTimestamp(notification.createdAt)
            if (!createdAtTimestamp) {
                return false
            }

            return now - createdAtTimestamp <= NOTIFICATION_TTL_MS
        })
        .sort(function (left, right) {
            const leftTimestamp = toValidTimestamp(left.createdAt) || 0
            const rightTimestamp = toValidTimestamp(right.createdAt) || 0

            return rightTimestamp - leftTimestamp
        })
        .slice(0, NOTIFICATION_MAX_ITEMS)
}

function countUnread(notifications) {
    return notifications.reduce(function (count, notification) {
        return notification.isRead ? count : count + 1
    }, 0)
}

function extractStoredNotifications(parsedValue) {
    if (!parsedValue) {
        return []
    }

    if (Array.isArray(parsedValue)) {
        return parsedValue
    }

    if (Array.isArray(parsedValue.notifications)) {
        return parsedValue.notifications
    }

    if (
        parsedValue.version === NOTIFICATION_STORAGE_VERSION
        && parsedValue.data
        && Array.isArray(parsedValue.data.notifications)
    ) {
        return parsedValue.data.notifications
    }

    return []
}

function getInitialNotificationState() {
    if (!isStorageAvailable()) {
        return {
            notifications: [],
            unreadCount: 0,
        }
    }

    try {
        const storedValue = window.localStorage.getItem(NOTIFICATION_STORAGE_KEY)

        if (!storedValue) {
            return {
                notifications: [],
                unreadCount: 0,
            }
        }

        const parsedValue = JSON.parse(storedValue)
        const notifications = pruneAndSortNotifications(extractStoredNotifications(parsedValue))

        return {
            notifications,
            unreadCount: countUnread(notifications),
        }
    } catch {
        return {
            notifications: [],
            unreadCount: 0,
        }
    }
}

function persistNotificationState(state) {
    if (!isStorageAvailable()) {
        return
    }

    const notifications = pruneAndSortNotifications(state.notifications)

    try {
        window.localStorage.setItem(
            NOTIFICATION_STORAGE_KEY,
            JSON.stringify({
                version: NOTIFICATION_STORAGE_VERSION,
                data: {
                    notifications,
                    unreadCount: countUnread(notifications),
                },
                updatedAt: new Date().toISOString(),
            })
        )
    } catch {
        return
    }
}

const useNotificationStore = create(function (set) {
    const initialState = getInitialNotificationState()

    return {
        notifications: initialState.notifications,
        unreadCount: initialState.unreadCount,

        addNotification: function (notification) {
            const nextNotification = normalizeNotification({
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                title: notification?.title || 'Notification',
                message: notification?.message || '',
                type: notification?.type || 'info',
                createdAt: notification?.createdAt || new Date().toISOString(),
                isRead: false,
            })

            if (notification?.showToast) {
                toast[nextNotification.type](notification?.message || '')
            }

            set(function (state) {
                const notifications = pruneAndSortNotifications([nextNotification, ...state.notifications])
                const nextState = {
                    notifications,
                    unreadCount: countUnread(notifications),
                }

                persistNotificationState(nextState)

                return nextState
            })
        },

        markAllAsRead: function () {
            set(function (state) {
                if (state.unreadCount === 0) {
                    return state
                }

                const notifications = pruneAndSortNotifications(state.notifications.map(function (notification) {
                        if (notification.isRead) {
                            return notification
                        }

                        return { ...notification, isRead: true }
                    }))
                const nextState = {
                    notifications,
                    unreadCount: 0,
                }

                persistNotificationState(nextState)

                return nextState
            })
        },

        clearNotifications: function () {
            const nextState = {
                notifications: [],
                unreadCount: 0,
            }

            persistNotificationState(nextState)

            set(nextState)
        },
    }
})

export default useNotificationStore