import React from 'react'
import PropTypes from 'prop-types'

function StatusBar({
    statusBar
}) {
    return (
        <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 border-t border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-500" >
            <span>MAC: {statusBar.mac}</span>
            <span>IP: {statusBar.ip}</span>
            <span>Loc: {statusBar.loc}</span>
            <span>Shift: {statusBar.shift}</span>
            <span>G-Role: {statusBar.gRole}</span>
            <span>Company: {statusBar.company}</span>
        </div >
    )
}

StatusBar.propTypes = {
    statusBar: PropTypes.shape({
        mac: PropTypes.string.isRequired,
        ip: PropTypes.string.isRequired,
        loc: PropTypes.string.isRequired,
        shift: PropTypes.string.isRequired,
        gRole: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
    }).isRequired,
}

export default StatusBar
