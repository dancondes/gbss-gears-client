import PageTemplate from '@/components/PageTemplate'
import OpenTicketModal from '@/pages/user/Leaves/components/OpenTicketModal'
import React from 'react'
import LeaveCredits from './components/LeaveCredits'
import UpcomingLeaves from './components/UpcomingLeaves'
import useSWR from 'swr'
import { getTeamLeaves, getUpcomingLeaves } from '@/services/user-service'
import { ENQUIRY_TYPE_ID_FOR_LEAVE } from '@/constants/database-id'
import { useAuthStore } from '@/store'

export default function Leaves() {
    const user = useAuthStore((state) => state.user)
    const { data, isValidating, mutate } = useSWR(user?.userId ? ['team-leaves', user?.userId] : null, fetchTeamLeaves)

    async function fetchTeamLeaves() {
        try {
            const teamLeaves = await getTeamLeaves()
            const upcomingLeaves = await getUpcomingLeaves()


            return {
                teamLeaves: teamLeaves?.data || [],
                upcomingLeaves: upcomingLeaves?.data || [],
            }
        } catch {
            return {
                teamLeaves: [],
                upcomingLeaves: [],
            }
        }
    }

    return (
        <PageTemplate
            title="Team Leaves"
            rightSide={<OpenTicketModal concernLabel="Leaves" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_LEAVE }} />}
            subtitle="View your team's leave credits and upcoming leaves"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <LeaveCredits data={data?.teamLeaves || []} isLoading={isValidating} />
                <UpcomingLeaves data={data?.upcomingLeaves || []} isLoading={isValidating} />
            </div>


        </PageTemplate>
    )
}
