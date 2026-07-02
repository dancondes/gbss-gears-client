import PageTemplate from '@/components/PageTemplate'
import { useAuthStore } from '@/store'
import React from 'react'
import BirthdaySection from './components/BirthdaySection'
import AnniversarySection from './components/AnniversarySection'

export default function StaffNews() {
    const user = useAuthStore(state => state.user)

    const data = {
        birthdays: [
            { name: 'John Doe', account: 'GBSS' },
            { name: 'Jane Smith', account: 'GBSS' },
        ],

        anniversaries: [
            { name: 'Alice Johnson', account: 'GBSS', years: 5 },
            { name: 'Bob Brown', account: 'GBSS', years: 10 },
        ]
    }

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })

    return (
        <PageTemplate title="Staff News">
            <div className="max-w-2xl mx-auto p-1 sm:p-3">
                {/* Header */}
                <div className="mb-8 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-400 mb-1">{today}</p>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Good morning, {user?.firstname}
                    </h3>
                    <p className="text-gray-500 mt-1">
                        Here&apos;s what&apos;s happening with the team today.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <BirthdaySection data={data.birthdays} />
                    <AnniversarySection data={data.anniversaries} />
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-500">
                    <p>Best regards,</p>
                    <p className="font-medium text-gray-700">GBSSP Administration</p>
                </div>
            </div>
        </PageTemplate>
    )
}