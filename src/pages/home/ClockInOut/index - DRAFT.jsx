import React, { useEffect, useState, useCallback } from 'react'
import PageTemplate from '../../components/PageTemplate'
import MenuDropdown from '../../components/MenuDropdown'
import TabBar from '../../components/TabBar'
import PersonalDetails from './components/PersonalDetails'
import DailyRecords from './components/DailyRecords'
import MyRequests from './components/MyRequests'
import useTabStore from '../../store/tabStore'

function ClockInOut() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [checkInTime, setCheckInTime] = useState()
    const [userDetails] = useState({
        userName: 'Jerwin',
        mac: '00:15:5D:DC:0D:00',
        ip: '10.8.225.11',
        location: 'HOME',
        shift: '6:00am-3:00pm',
        role: 'User',
        company: 'GBSS'
    })
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    
    const tabs = useTabStore((state) => state.tabs)
    const activeTab = useTabStore((state) => state.activeTab)
    const openTabAction = useTabStore((state) => state.openTab)
    const closeTabAction = useTabStore((state) => state.closeTab)
    const setActiveTabAction = useTabStore((state) => state.setActiveTab)

    const openTab = useCallback((id, label) => {
        openTabAction(id, label)
    }, [openTabAction])

    const closeTab = useCallback((id) => {
        closeTabAction(id)
    }, [closeTabAction])

    const handleMenuItemClick = useCallback((menuLabel, itemLabel) => {
        const tabMappings = {
            'Personal Details': { id: 'personal-details', label: 'Personal Details' },
            'Daily Records': { id: 'daily-records', label: 'Daily Records' },
            'My Requests': { id: 'my-requests', label: 'My Requests' },
            'Overtime': { id: 'overtime', label: 'Overtime' },
            'Leaves': { id: 'leaves', label: 'Leaves' },
            'COE': { id: 'coe', label: 'COE' },
            'Payslip': { id: 'payslip', label: 'Payslip' },
            'Documents': { id: 'documents', label: 'Documents' },
            'User Guide': { id: 'user-guide', label: 'User Guide' },
            'FAQ': { id: 'faq', label: 'FAQ' },
            'Contact Support': { id: 'contact-support', label: 'Contact Support' },
            'View Code of Conduct': { id: 'code-of-conduct', label: 'Code of Conduct' },
            'Report Violation': { id: 'report-violation', label: 'Report Violation' },
            'Staff News': { id: 'staff-news', label: 'Staff News' },
            'Staff Bulletins': { id: 'staff-bulletins', label: 'Staff Bulletins' },
            'Change Password': { id: 'change-password', label: 'Change Password' },
            'Change Pin': { id: 'change-pin', label: 'Change Pin' }
        }

        const mapping = tabMappings[itemLabel]
        if (mapping) {
            openTab(mapping.id, mapping.label)
        }
    }, [openTab])

    const userMenuItems = [
        { label: 'Personal Details', icon: '👤', onClick: () => handleMenuItemClick('User', 'Personal Details') },
        { label: 'Daily Records', icon: '📅', onClick: () => handleMenuItemClick('User', 'Daily Records') },
        { label: 'My Requests', icon: '📝', onClick: () => handleMenuItemClick('User', 'My Requests') },
        { label: 'Overtime', icon: '⏰', onClick: () => handleMenuItemClick('User', 'Overtime') },
        { label: 'Leaves', icon: '✈️', onClick: () => handleMenuItemClick('User', 'Leaves') },
        { label: 'COE', icon: '📄', onClick: () => handleMenuItemClick('User', 'COE') },
        { label: 'Payslip', icon: '💰', onClick: () => handleMenuItemClick('User', 'Payslip') },
        { label: 'Documents', icon: '📁', onClick: () => handleMenuItemClick('User', 'Documents') }
    ]

    const helpMenuItems = [
        { label: 'User Guide', onClick: () => handleMenuItemClick('Help', 'User Guide') },
        { label: 'FAQ', onClick: () => handleMenuItemClick('Help', 'FAQ') },
        { label: 'Contact Support', onClick: () => handleMenuItemClick('Help', 'Contact Support') }
    ]

    const codeOfConductMenuItems = [
        { label: 'View Code of Conduct', onClick: () => handleMenuItemClick('Code of Conduct', 'View Code of Conduct') },
        { label: 'Report Violation', onClick: () => handleMenuItemClick('Code of Conduct', 'Report Violation') }
    ]

    const settingsMenuItems = [
        { label: 'Staff News', icon: '📰', onClick: () => handleMenuItemClick('Settings', 'Staff News') },
        { label: 'Staff Bulletins', icon: '📋', onClick: () => handleMenuItemClick('Settings', 'Staff Bulletins') },
        { label: 'Change Password', icon: '🔑', onClick: () => handleMenuItemClick('Settings', 'Change Password') },
        { label: 'Change Pin', icon: '🔒', onClick: () => handleMenuItemClick('Settings', 'Change Pin') }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (settingsMenuOpen && !event.target.closest('.relative')) {
                setSettingsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [settingsMenuOpen])

    function formatDateTime(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }
        return date.toLocaleString('en-US', options)
    }

    function handleRefresh() {
        console.log('Refresh clicked')
    }

    function handleCheckIn() {
        const now = new Date()
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        })
        setCheckInTime(timeString)
    }

    function handleBreakOut(breakType) {
        console.log(`${breakType} Out clicked`)
    }

    function handleBreakIn(breakType) {
        console.log(`${breakType} In clicked`)
    }

    function handleCheckOut(breakType = null) {
        console.log(`Check Out clicked${breakType ? ` with ${breakType}` : ''}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container-width px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                                className="w-10 h-10 bg-primary rounded flex items-center justify-center hover:bg-dark-primary transition-colors cursor-pointer"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            {settingsMenuOpen && (
                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg min-w-50 z-50">
                                    {settingsMenuItems.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (item.onClick) {
                                                    item.onClick()
                                                }
                                                setSettingsMenuOpen(false)
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                                        >
                                            {item.icon && <span className="text-gray-500">{item.icon}</span>}
                                            <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center">
                                <MenuDropdown label="User" items={userMenuItems} />
                                <MenuDropdown label="Help" items={helpMenuItems} />
                                <MenuDropdown label="Code of Conduct" items={codeOfConductMenuItems} />
                            </div>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Close
                    </button>
                </div>
            </header>

            {/* Tab Bar */}
            <div className="bg-gray-100 border-b border-gray-300">
                <div className="container-width">
                    <TabBar
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabClick={setActiveTabAction}
                        onTabClose={closeTab}
                    />
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {activeTab === 'clock-in-out' && (
                    <main className="container-width px-4 sm:px-6 lg:px-8 py-8">
                        {/* Page Title and Date */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-primary">CLOCK IN/OUT</h1>
                            <p className="text-sm font-medium text-primary">{formatDateTime(currentDateTime)}</p>
                        </div>

                <div className="bg-white rounded shadow-sm border border-gray-200 p-6">
                    {/* Start Section */}
                    <section className="mb-8">
                        <h2 className="text-base font-bold text-primary mb-4 pb-2 border-b-2 border-primary">Start</h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={handleCheckIn}
                                className="px-6 py-2 bg-primary/10 text-primary font-semibold rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                Check In
                            </button>
                            <span className="text-lg font-bold text-primary">
                                {checkInTime}
                            </span>
                            <button
                                onClick={handleRefresh}
                                className="ml-auto px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh [F5]
                            </button>
                        </div>
                    </section>

                    {/* Breaks Section */}
                    <section className="mb-8">
                        <h2 className="text-base font-bold text-primary mb-4 pb-2 border-b-2 border-primary">Breaks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 1st Break */}
                            <div className="border border-gray-300 rounded p-4">
                                <h3 className="font-bold text-gray-800 mb-3 text-sm">1st (15mins) <span className="text-tertiary">[ 0.00 min(s) ]</span></h3>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleBreakOut('1st Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        Out
                                    </button>
                                    <button
                                        onClick={() => handleBreakIn('1st Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        In
                                    </button>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600 ml-2">
                                    <p>__:__ AM/PM</p>
                                    <p>__:__ AM/PM</p>
                                </div>
                            </div>

                            {/* Lunch Break */}
                            <div className="border border-gray-300 rounded p-4">
                                <h3 className="font-bold text-gray-800 mb-3 text-sm">LUNCH <span className="text-tertiary">[ 0.00 min(s) ]</span></h3>
                                <button
                                    onClick={() => handleBreakOut('Lunch')}
                                    className="w-full px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer mb-2 text-sm"
                                >
                                    Out
                                </button>
                                <div className="text-sm text-gray-600 text-center mb-2">
                                    <p>__:__ AM/PM</p>
                                </div>
                                <button
                                    onClick={() => handleBreakIn('Lunch')}
                                    className="w-full px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer mb-2 text-sm"
                                >
                                    In
                                </button>
                                <div className="text-sm text-gray-600 text-center">
                                    <p>__:__ AM/PM</p>
                                </div>
                            </div>

                            {/* 2nd Break */}
                            <div className="border border-gray-300 rounded p-4">
                                <h3 className="font-bold text-gray-800 mb-3 text-sm">2nd (15mins) <span className="text-tertiary">[ 0.00 min(s) ]</span></h3>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleBreakOut('2nd Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        Out
                                    </button>
                                    <button
                                        onClick={() => handleBreakIn('2nd Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        In
                                    </button>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600 ml-2">
                                    <p>__:__ AM/PM</p>
                                    <p>__:__ AM/PM</p>
                                </div>
                            </div>

                            {/* Combined Break */}
                            <div className="border border-gray-300 rounded p-4">
                                <h3 className="font-bold text-tertiary mb-3 text-sm">Combined (30mins) <span className="text-gray-600">[ 0.00 min(s) ]</span></h3>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleBreakOut('Combined Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        Out
                                    </button>
                                    <button
                                        onClick={() => handleBreakIn('Combined Break')}
                                        className="flex-1 px-4 py-2 bg-primary/10 text-primary font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer text-sm"
                                    >
                                        In
                                    </button>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600 ml-2">
                                    <p>__:__ AM/PM</p>
                                    <p>__:__ AM/PM</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* End Section */}
                    <section>
                        <h2 className="text-base font-bold text-primary mb-4 pb-2 border-b-2 border-primary">End</h2>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <button
                                onClick={() => handleCheckOut()}
                                className="px-6 py-2 bg-primary/10 text-primary font-semibold rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                Check Out
                            </button>
                            <span className="text-lg font-bold text-primary">
                                __:__ AM/PM
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCheckOut('15mins Break')}
                                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                15mins Break<br />+ Check Out
                            </button>
                            <button
                                onClick={() => handleCheckOut('30mins Break')}
                                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                30mins Break<br />+ Check Out
                            </button>
                            <button
                                onClick={() => handleCheckOut('1hr Break')}
                                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                1hr Break<br />+ Check Out
                            </button>
                            <button
                                onClick={() => handleCheckOut('1hr 15 Break')}
                                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                1hr 15 Break<br />+ Check Out
                            </button>
                            <button
                                onClick={() => handleCheckOut('1hr 30 Break')}
                                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                                1hr 30 Break<br />+ Check Out
                            </button>
                        </div>
                    </section>
                </div>

                {/* Footer Info */}
                <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">MAC:</span> {userDetails.mac}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">IP:</span> {userDetails.ip}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Location:</span> {userDetails.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Shift:</span> {userDetails.shift}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Role:</span> {userDetails.role}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Company:</span> {userDetails.company}
                        </span>
                    </div>
                </div>
            </main>
                )}

                {activeTab === 'personal-details' && <PersonalDetails />}
                {activeTab === 'daily-records' && <DailyRecords />}
                {activeTab === 'my-requests' && <MyRequests />}
                {activeTab === 'overtime' && <PageTemplate title="Overtime" />}
                {activeTab === 'leaves' && <PageTemplate title="Leaves" />}
                {activeTab === 'coe' && <PageTemplate title="COE" />}
                {activeTab === 'payslip' && <PageTemplate title="Payslip" />}
                {activeTab === 'documents' && <PageTemplate title="Documents" />}
                {activeTab === 'user-guide' && <PageTemplate title="User Guide" />}
                {activeTab === 'faq' && <PageTemplate title="FAQ" />}
                {activeTab === 'contact-support' && <PageTemplate title="Contact Support" />}
                {activeTab === 'code-of-conduct' && <PageTemplate title="Code of Conduct" />}
                {activeTab === 'report-violation' && <PageTemplate title="Report Violation" />}
            </div>
        </div>
    )
}

export default ClockInOut
