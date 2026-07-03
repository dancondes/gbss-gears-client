import FileDropzone from '@/components/form/FileDropzone'
import FormSelect from '@/components/form/FormSelect'
import FormTextarea from '@/components/form/FormTextarea'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { createTicket } from '@/services/ticketing-service'
import { useAuthStore } from '@/store'
import { formatArrayOfStringsAsSelectOptions, isResultSuccessful } from '@/utilities'
import logger from '@/utilities/logger'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// TODO: update this list with the actual ticket types from the backend
const TICKET_TYPE_OPTIONS = formatArrayOfStringsAsSelectOptions([
    'Room Booking',
    'HR',
    'Payroll',
    'Leave',
    'Jobs',
    'Time_Amend',
    'IT',
    'Other'
])

export default function TicketingForm({
    defaultValues = {},
    onCancel,
}) {
    // Hooks
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
    })
    const { showConfirmationModal } = useConfirmationModal()
    const user = useAuthStore((state) => state.user)

    // States
    const [filesToUpload, setFilesToUpload] = useState([])
    const [uploading, setUploading] = useState(false)

    async function onSubmit(data) {
        showConfirmationModal({
            title: 'Submit Ticket',
            message: 'Are you sure you want to submit this ticket?',
            confirmText: 'Submit',
            cancelText: 'Cancel',
            onConfirm: () => {
                handleSave(data)
            }
        })
    }

    async function handleSave(data) {
        try {
            setUploading(true)
            const params = {
                // hardcoded
                statusId: 1, // Open
                comments: null,
                closedById: null,
                assignedToId: null,
                priorityId: 4, // Low
                targetDate: null,

                // TODO: update the value for this. confirm with Sir Dan on the correct team to assign the ticket to
                teamId: 3, // IT
                teamDescription: 'IT',

                // from form
                requestedById: user?.id,
                requestedByName: (user?.firstname || '' + ' ' + user?.lastname || '').trim(),
                taskName: data.ticketType,
                details: data.description,
            }
            const result = await createTicket(params, filesToUpload, null)

            if (isResultSuccessful(result)) {
                toast.success('Ticket submitted successfully!')
                reset({
                    ticketType: '',
                    description: '',
                })
                setFilesToUpload([]) // Clear the file dropzone
                if (onCancel) onCancel() // Close the form after successful submission
            } else {
                toast.error('Failed to submit ticket. Please try again later.')
                logger.error('Error submitting ticket:', result)
            }
        } catch (error) {
            toast.error('Failed to submit ticket. Please try again later.')
            logger.error('Error submitting ticket:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <fieldset disabled={uploading} className='contents'>
                <FormSelect
                    name='ticketType'
                    label='Type'
                    options={TICKET_TYPE_OPTIONS}
                    register={register}
                    className='max-w-100'
                    validation={{
                        required: 'Please select a ticket type',
                    }}
                    error={errors.ticketType?.message}
                />

                <FileDropzone
                    files={filesToUpload}
                    onFilesChange={setFilesToUpload}
                    multiple={true}
                    maxFiles={10}
                    maxFileSize={10 * 1024 * 1024}
                    placeholder="Drag and drop files here, or click to browse"
                    disabled={uploading}
                />

                <FormTextarea
                    name='description'
                    label='Describe your issue'
                    register={register}
                    rows={7}
                    validation={{
                        required: 'Please provide a description of your issue',
                    }}
                    error={errors.description?.message}
                />


                <div className='flex justify-end gap-2 border-t border-gray-200 pt-4'>
                    {onCancel && (
                        <button
                            type='button'
                            className='btn-white'
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type='submit'
                        className='btn-primary px-8!'
                        disabled={uploading}
                    >
                        {uploading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

TicketingForm.propTypes = {
    defaultValues: PropTypes.object,
    onCancel: PropTypes.func,
}