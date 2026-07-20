
import PageTemplate from '@/components/PageTemplate'
import React from 'react'
import TicketingForm from './components/TicketingForm'

export default function Ticketing() {


    return (
        <PageTemplate
            title="Service Ticket"
            subtitle="Submit a service ticket for assistance"
        >
            <div className="p-1 sm:p-3">
                <TicketingForm />
            </div>

        </PageTemplate>
    )
}
