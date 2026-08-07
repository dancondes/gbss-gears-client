import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NavbarUserProfile({ user, fullName, userMenuOpen, onUserMenuToggle, onUserMenuClose, onItemClick }) {

    if (!user) {
        return (
            <div className="relative">
                <div className="flex items-center gap-1.5 px-2 py-0.5">
                    <div className="h-6 w-6 rounded-full bg-white/20 animate-pulse"></div>
                    <div className="hidden sm:block h-3 w-20 bg-white/20 rounded animate-pulse"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={onUserMenuToggle}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-white hover:bg-white/20 focus:outline-none cursor-pointer"
            >
                <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-primary font-medium text-xs">
                    {user.firstname?.charAt(0)?.toUpperCase()}{user.lastname?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-xs hidden sm:inline">{fullName}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {userMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={onUserMenuClose}
                    ></div>

                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 z-20">
                        <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                                <div className="font-medium text-primary">{fullName}</div>
                                <div className="text-xs text-gray-500">Employee Number: {user?.empNo}</div>
                            </div>
                            <button
                                className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={(e) => onItemClick(e, 'profile')}
                            >
                                Your Profile
                            </button>
                            <Link
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={(e) => onItemClick(e, 'settings')}
                            >
                                Settings
                            </Link>
                            <button
                                onClick={(e) => onItemClick(e, 'logout')}
                                className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 cursor-pointer"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

NavbarUserProfile.propTypes = {
    user: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        empNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // email: PropTypes.string,
        // role: PropTypes.arrayOf(PropTypes.shape({
        //     description: PropTypes.string,
        // })),
    }),
    fullName: PropTypes.string.isRequired,
    userMenuOpen: PropTypes.bool.isRequired,
    onUserMenuToggle: PropTypes.func.isRequired,
    onUserMenuClose: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
}

export default NavbarUserProfile