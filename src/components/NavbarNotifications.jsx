import React from 'react'
import PropTypes from 'prop-types'

function NavbarNotifications({
    notificationOpen,
    onNotificationToggle,
    onNotificationClose,
    isBellShaking,
    unreadCount,
    notifications,
    onClearNotifications,
    justOpenedNotificationIds,
    getNotificationAccentClass,
    formatNotificationTimestamp,
}) {
    return (
        <div className="relative">
            <button
                onClick={onNotificationToggle}
                className={`relative p-1.5 rounded text-white hover:bg-white/20 focus:outline-none cursor-pointer ${isBellShaking ? 'animate-notificationBellShake' : ''}`}
                aria-label="Notifications"
                title="Notifications"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-danger text-white text-[10px] leading-4 text-center font-semibold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {notificationOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={onNotificationClose}
                    ></div>

                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 z-20 overflow-hidden">
                        <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Notifications</p>
                                <p className="text-xs text-gray-500">{notifications.length} total</p>
                            </div>
                            {notifications.length > 0 && (
                                <button
                                    onClick={onClearNotifications}
                                    className="text-xs text-primary hover:underline cursor-pointer"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-sm text-gray-500 text-center">
                                    No notifications yet.
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {notifications.map(function (notification) {
                                        const isFirstOpenHighlight = justOpenedNotificationIds.includes(notification.id)

                                        return (
                                            <div
                                                key={notification.id}
                                                className={`px-3 py-2 ${isFirstOpenHighlight ? 'bg-blue-100' : notification.isRead ? 'bg-white' : 'bg-blue-50/60'}`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${getNotificationAccentClass(notification.type)}`}></span>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{notification.title}</p>
                                                        <p className="text-xs text-gray-600 mt-0.5 wrap-break-word">{notification.message}</p>
                                                        <p className="text-[11px] text-gray-400 mt-1">{formatNotificationTimestamp(notification.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

NavbarNotifications.propTypes = {
    notificationOpen: PropTypes.bool.isRequired,
    onNotificationToggle: PropTypes.func.isRequired,
    onNotificationClose: PropTypes.func.isRequired,
    isBellShaking: PropTypes.bool.isRequired,
    unreadCount: PropTypes.number.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
        type: PropTypes.string,
        createdAt: PropTypes.string,
        isRead: PropTypes.bool,
    })).isRequired,
    onClearNotifications: PropTypes.func.isRequired,
    justOpenedNotificationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    getNotificationAccentClass: PropTypes.func.isRequired,
    formatNotificationTimestamp: PropTypes.func.isRequired,
}

export default NavbarNotifications