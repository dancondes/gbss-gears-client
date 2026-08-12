import React from 'react'
import { useAuthStore } from '@/store'

function StatusBar() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 border-t border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-500" >
            {/* <span>MAC: {statusBar.mac}</span> */}
            {/* <span>IP: {statusBar.ip}</span> */}
            {user?.loggedAtLoc && <span><strong>Loc:</strong> {user?.loggedAtLoc}</span>}
            <span><strong>Shift:</strong> {user?.schedule?.[0]?.description}</span>
            <span><strong>G-Role:</strong> {user?.role?.description}</span>
            <span><strong>Company:</strong> {user?.employeeInfo?.account?.name}</span>
        </div >
    )
}

export default StatusBar
