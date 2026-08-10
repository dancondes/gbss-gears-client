import FileDropzone from '@/components/form/FileDropzone'
import FormInput, { validateStrictDateInput } from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import FormTextarea from '@/components/form/FormTextarea'
import TimeInput from '@/components/form/TimeInput'
import { LOCATION_OPTIONS } from '@/constants'
import { LOG_TYPES_FOR_TIME_AMENDMENT, TIME_AMENDMENT_ENQUIRY_TYPE_ID } from '@/constants/database-id'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { createTicket, createTimeAmendment, getTimeEntriesById } from '@/services/event-service'
import { getEnquiryTypes, getLogTypes } from '@/services/lookups-service'
import { useAuthStore, useNotificationStore } from '@/store'
import { isResultSuccessful } from '@/utilities'
import { getCurrentDate, getCurrentTime, to24HourTime } from '@/utilities/date-utilities'
// import { createTicket } from '@/services/ticketing-service'
import logger from '@/utilities/logger'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function generateDefaultValues() {
    return {
        ticketType: '',
        description: '',
        amendDate: getCurrentDate(),
        amendTime: getCurrentTime(true),
        amendType: '',
        location: ''
    }
}

export default function TicketingForm({
    defaultValues = null,
    onCancel,
}) {
    // Hooks
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
        // setError,
    } = useForm({
        defaultValues: defaultValues ? {
            ...generateDefaultValues(),
            ...defaultValues,
        } : generateDefaultValues(),
    })
    const { showConfirmationModal } = useConfirmationModal()
    const { options: typeOptions, loading: enquiryTypesLoading } = useFetchOptions(getEnquiryTypes, {
        transform: (list) => list.map(item => ({ ...item, description: item?.description?.replace('_', ' ') }))
    })
    const { options: logTypeOptions, loading: logTypesLoading } = useFetchOptions(getLogTypes, {
        valueKey: 'code',
        labelKey: 'definition',
        transform: (list) => list.filter(item => LOG_TYPES_FOR_TIME_AMENDMENT.includes(item.code))
    })
    const watchedTicketType = watch('ticketType')
    const watchedLogType = watch('amendType')
    const watchedAmendDate = watch('amendDate')
    const isTimeAmendment = watchedTicketType == TIME_AMENDMENT_ENQUIRY_TYPE_ID
    const isCheckInLogType = isTimeAmendment && watchedLogType == 'I'
    const user = useAuthStore(state => state.user)
    const addNotification = useNotificationStore((state) => state.addNotification)

    // States
    const [filesToUpload, setFilesToUpload] = useState([])
    const [uploading, setUploading] = useState(false)
    const [timeEntries, setTimeEntries] = useState([])

    // Applies the location of an existing Check In entry (if any) to the form's location field
    function applyCheckInLocation(entries) {
        const existingCheckInEntry = entries.find(entry => entry.logTypeCode === 'I')

        if (existingCheckInEntry) {
            const location = LOCATION_OPTIONS.find(option => option.value === existingCheckInEntry.location)?.value || null
            setValue('location', location)
        }
    }

    // Builds and dispatches the submission result notification (success or failure)
    function notifySubmissionResult(success, ticketLabel) {
        const labelSuffix = ticketLabel ? ' ' + ticketLabel : ''

        addNotification({
            type: success ? 'success' : 'error',
            title: success ? 'Ticket Submitted' : 'Ticket Submission Failed',
            message: success
                ? `Your${labelSuffix} ticket has been submitted successfully.`
                : `An error occurred while submitting your${labelSuffix} ticket. Please try again later.`,
            showToast: true,
        })
    }

    const loggedTimeForChosenDateAndType = useMemo(() => {
        if (watchedAmendDate && validateStrictDateInput(watchedAmendDate) === true && watchedLogType) {
            const existingEntry = timeEntries.find(entry => entry.logTypeCode === watchedLogType)

            if (existingEntry) {
                return to24HourTime(existingEntry.worktime)
            }
        }

        return null
    }, [watchedAmendDate, watchedLogType, timeEntries])

    const setLoggedTime = useCallback(() => {
        if (loggedTimeForChosenDateAndType) {
            setValue('amendTime', loggedTimeForChosenDateAndType)
        }
    }, [loggedTimeForChosenDateAndType])

    useEffect(() => {
        reset(defaultValues ? {
            ...generateDefaultValues(),
            ...defaultValues,
        } : generateDefaultValues())
    }, [typeOptions])

    useEffect(() => {
        async function fetchTimeEntries(date) {
            try {
                const result = await getTimeEntriesById(user?.userId, { dateFrom: date, dateTo: date })
                setTimeEntries(result?.data || [])

                if (watchedLogType === 'I') {
                    applyCheckInLocation(result?.data || [])
                }
            } catch {
                setTimeEntries([])
            }
        }

        if (isTimeAmendment && watchedAmendDate && validateStrictDateInput(watchedAmendDate) === true) {
            fetchTimeEntries(watchedAmendDate)
        } else {
            setTimeEntries([])
        }
    }, [watchedAmendDate, user, isTimeAmendment, setTimeEntries])

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

    function handleReset() {
        reset(generateDefaultValues())
        setFilesToUpload([])
        setUploading(false)
        onCancel?.()
    }

    async function handleSave(data) {
        function formatDateTimeForAPI(date, time) {
            return `${date}T${time}`
        }
        const optionSelected = typeOptions.find(option => option.value == data.ticketType)
        const ticketLabel = optionSelected?.label

        try {
            setUploading(true)
            const params = isTimeAmendment ? {
                workDate: data.amendDate,
                logType: logTypeOptions.find(option => option.value === data.amendType)?.label || '',
                requestedTime: formatDateTimeForAPI(data.amendDate, data.amendTime),
                comment: data.description,
                location: isCheckInLogType ? data.location : null
            } : {
                enquiryTypeId: data.ticketType,
                details: data.description,
            }

            if (isTimeAmendment) {
                const existingEntry = timeEntries.find(entry => entry.logTypeCode === data.amendType)
                params.logTime = existingEntry ? formatDateTimeForAPI(data.amendDate, to24HourTime(existingEntry.worktime)) : null
            }

            // auto close the form after successful submission
            toast.success('Submitting ticket. Don\'t refresh or close the page until you see a success message.')
            handleReset()

            const result = await (isTimeAmendment ? createTimeAmendment(params, filesToUpload) : createTicket(params, filesToUpload))

            if (result == 'New ticket has been added to the system!' || isResultSuccessful(result)) {
                notifySubmissionResult(true, ticketLabel)
            } else {
                notifySubmissionResult(false, ticketLabel)
                logger.error('Error submitting ticket:', result)
            }
        } catch (error) {
            notifySubmissionResult(false, ticketLabel)
            logger.error('Error submitting ticket:', error)
        } finally {
            setUploading(false)
        }
    }

    if (enquiryTypesLoading || logTypesLoading) {
        return (
            <div className='flex justify-center items-center h-32'>
                <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <fieldset disabled={uploading} className='contents'>
                <FormSelect
                    name='ticketType'
                    label='Type'
                    options={typeOptions}
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

                {
                    isTimeAmendment && (
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                            <FormInput
                                name='amendDate'
                                label='Date'
                                type='date'
                                register={register}
                                validation={{
                                    required: { value: isTimeAmendment, message: 'Please select a date for the time amendment' },
                                }}
                                error={errors.amendDate?.message}
                                className='mb-0!'
                            />

                            <div>
                                <TimeInput
                                    name='amendTime'
                                    label='Time'
                                    register={register}
                                    validation={{
                                        required: { value: isTimeAmendment, message: 'Please select a time for the time amendment' },
                                    }}
                                    error={errors.amendTime?.message}
                                    showSeconds
                                    className='mb-0!'
                                />

                                {
                                    loggedTimeForChosenDateAndType && (
                                        <button
                                            type='button'
                                            onClick={setLoggedTime}
                                            className='mt-1 inline-block text-sm font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors duration-150 hover:text-primary/80 hover:decoration-primary/80'
                                        >
                                            Set to the logged time
                                        </button>
                                    )
                                }
                            </div>

                            <FormSelect
                                name='amendType'
                                label='Log Type'
                                options={logTypeOptions}
                                register={register}
                                validation={{
                                    required: { value: isTimeAmendment, message: 'Please select a log type for the time amendment' },
                                    onChange: (e) => {
                                        const selectedLogType = e.target.value

                                        if (selectedLogType === 'I') {
                                            applyCheckInLocation(timeEntries)
                                        }
                                    }
                                }}
                                error={errors.amendType?.message}
                            // className='col-span-2 sm:col-span-1'
                            />

                            {isCheckInLogType && (
                                <FormSelect
                                    name='location'
                                    label='Location'
                                    options={LOCATION_OPTIONS}
                                    register={register}
                                    validation={{
                                        required: { value: isTimeAmendment && isCheckInLogType, message: 'Please select a location for Check In' },
                                    }}
                                    error={errors.location?.message}
                                // className='col-span-2 sm:col-span-1'
                                />
                            )}
                        </div>
                    )
                }


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