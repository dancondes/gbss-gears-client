import React, { useMemo } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'
import { createOvertime, deleteOvertime, getOvertime, updateOvertime } from '@/services/event-service'
import useSWR from 'swr'
import EditableListTabModal from '@/components/EditableListTabModal'
import OvertimeForm from './OvertimeForm'
import logger from '@/utilities/logger'
import { toast } from 'react-toastify'
import { isResultSuccessful } from '@/utilities'

const currentDate = getCurrentDate()

function Overtime() {

    async function fetchOvertimeList() {
        try {
            const result = await getOvertime()
            return result?.data || []
        } catch {
            return []
        }
    }

    const { data: overtimeList, isValidating, mutate } = useSWR('overtime', fetchOvertimeList)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'overtimeDate',
                header: 'Date',
                type: 'date',
            },
            {
                accessorKey: 'numHours',
                header: 'No. of Hours',
                type: 'decimal',
            },
            {
                accessorKey: 'approvedBy',
                header: 'Approved By',
            },
            {
                accessorKey: 'dateCreated',
                header: 'Date Plotted',
                type: 'date',
            }
        ],
        []
    )

    async function handleSave(data) {
        const id = data.id
        try {
            const result = await (id ? updateOvertime(id, data) : createOvertime(data))
            if (isResultSuccessful(result)) {
                toast.success(`Overtime ${id ? 'updated' : 'created'} successfully.`)
                mutate()
            }
        } catch (error) {
            logger.error('Error saving overtime:', error)
            toast.error('Failed to save overtime. Please try again.')
        }
    }

    async function handleDelete(data) {
        try {
            await deleteOvertime(data.id)
            toast.success('Overtime deleted successfully.')
            mutate(overtimeList.filter(item => item.id !== data.id), false) // Optimistic update
        } catch (error) {
            logger.error('Error deleting overtime:', error)
            toast.error('Failed to delete overtime. Please try again.')
        }
    }

    return (
        <PageTemplate
            title="Overtime"
            subtitle="View and manage your overtime records"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <EditableListTabModal
                    data={overtimeList}
                    columns={columns}
                    FormComponent={OvertimeForm}
                    defaultItem={{
                        overtimeDate: currentDate,
                        numHours: '',
                        approvedBy: '',
                    }}
                    isLoading={isValidating}
                    singularName="Overtime"
                    onSave={handleSave}
                    onDelete={handleDelete}
                    tableProps={{
                        pageSize: 50,
                        dateRange: {
                            column: 'overtimeDate',
                            start: currentDate,
                            end: currentDate,
                        },
                        noDataLabel: 'No overtime found',
                    }}
                    modalSize="lg"
                    canAdd={true}
                    canSave={false}
                    canDelete={false}
                />
            </div>
        </PageTemplate>
    )
}

export default Overtime
