import React, { useEffect, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import Toggle from '@/components/form/Toggle'
import { SettingSection } from './components/SettingsSection'
import { useUIStore } from '@/store'

function Settings() {
    const enableSound = useUIStore((state) => state.enableSound)
    const setEnableSound = useUIStore((state) => state.setEnableSound)
    const enableAlertForLunchBreak = useUIStore((state) => state.enableAlertForLunchBreak)
    const setEnableAlertForLunchBreak = useUIStore((state) => state.setEnableAlertForLunchBreak)

    const [showAlertForLunchBreak, setShowAlertForLunchBreak] = useState(false)

    useEffect(() => {
        window.showToggleAlertForLunchBreak = () => setShowAlertForLunchBreak(true)
        return () => { delete window.showToggleAlertForLunchBreak }
    }, [])

    return (
        <PageTemplate
            title="Settings"
            subtitle="Customize your application preferences and behavior"
        >
            <div className="p-1 sm:p-3">
                <SettingSection
                    title="Sounds"
                    description="Enable or disable sound notifications."
                >
                    <Toggle
                        id="enableSoundNotification"
                        checked={enableSound}
                        onChange={setEnableSound}
                        label="Enable sound notifications"
                        description="When enabled, you'll hear a sound notification when a longer-running action finishes."
                    />

                    {showAlertForLunchBreak && (
                        <Toggle
                            id="enableSoundLunch"
                            checked={enableAlertForLunchBreak}
                            onChange={setEnableAlertForLunchBreak}
                            label="Get Alert for Lunch Break"
                            description="When enabled, you'll get an alert sound when your lunch break is almost over."
                        />
                    )}
                </SettingSection>
            </div>
        </PageTemplate>
    )
}


export default Settings
