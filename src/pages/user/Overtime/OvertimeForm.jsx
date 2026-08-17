import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import FormInput from '@/components/form/FormInput'
import TypeaheadInput from '@/components/form/TypeaheadInput'

function OvertimeForm({
    register,
    control,
    errors,
    data,
    approverOptions,
    watch,
}) {

    // If the approver in the data is not in the approverOptions, add it to the options
    const updatedOptions = useMemo(() => {
        if (data) {
            const approverName = data.approvedBy
            if (!approverOptions.some(option => option.value === approverName)) {
                return [...approverOptions.map(option => option.value), approverName]
            }
        }
        return approverOptions.map(option => option.value)
    }, [data, approverOptions])

    const overtimeDateValue = watch('overtimeDate')
    const numHoursValue = watch('numHours')

    // Always resolves, but each field falls back to an empty string until its
    // source value is present and would actually pass validation.
    const summary = useMemo(() => {
        let formattedDate = ''

        if (overtimeDateValue) {
            const [year, month, day] = overtimeDateValue.split('-')
            if (year && month && day) {
                formattedDate = `${day}/${month}/${year}`
            }
        }

        let formattedHours = ''
        const numericHours = Number(numHoursValue)

        if (numHoursValue && !Number.isNaN(numericHours) && numericHours > 0) {
            const minutes = Math.round((numericHours % 1) * 100)

            if (minutes <= 59) {
                const hours = Math.floor(numericHours)
                const parts = []

                if (hours > 0) {
                    parts.push(`${hours} ${hours === 1 ? 'Hour' : 'Hours'}`)
                }

                if (minutes > 0) {
                    parts.push(`${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`)
                }

                formattedHours = parts.join(' & ')
            }
        }

        return { formattedDate, formattedHours }
    }, [overtimeDateValue, numHoursValue])

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3'>
            <FormInput
                name="overtimeDate"
                label="OT Date"
                type="date"
                register={register}
                disabled={true}
                validation={{
                    required: 'OT Date is required'
                }}
                error={errors.overtimeDate?.message}
                className='ot-date-input'
            />

            <FormInput
                name="numHours"
                label="Num of Hours"
                type="number"
                step="0.01"
                register={register}
                validation={{
                    required: 'Num of Hours is required',
                    validate: value => {
                        const numericValue = Number(value)

                        if (Number.isNaN(numericValue)) {
                            return 'Num of Hours must be a valid number'
                        }

                        if (numericValue <= 0) {
                            return 'Num of Hours must be greater than 0'
                        }

                        // The decimal portion represents minutes, not a fraction of an hour,
                        // so anything from .60 onward isn't a valid minute value.
                        const minutesPortion = Math.round((numericValue % 1) * 100)

                        if (minutesPortion > 59) {
                            return 'Minutes (the part after the decimal) can only go up to .59'
                        }

                        return true
                    }
                }}
                error={errors.numHours?.message}
                className='ot-num-hours-input'
            />

            <TypeaheadInput
                name='approvedBy'
                label='Approved By'
                control={control}
                options={updatedOptions}
                error={errors.approvedBy?.message}
                validation={{
                    required: 'Approved By is required'
                }}
                className='col-span-1 sm:col-span-2 ot-approved-by-input'
            />

            <div className='col-span-1 sm:col-span-2 mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 space-y-1.5'>
                <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
                    Overtime that will be logged
                </p>

                <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>Date</span>
                    <span className='text-sm font-medium text-gray-800'>{summary.formattedDate}</span>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>Num of Hours</span>
                    <span className='text-sm font-medium text-gray-800'>{summary.formattedHours}</span>
                </div>
            </div>

            <p className='col-span-1 sm:col-span-2 mt-2 text-xs text-gray-500'>
                The decimal represents minutes, not a fraction of an hour. For example, 1.30 means 1 hour and 30 minutes, not 1.5 hours. Only .00 to .59 is valid.
            </p>
        </div>
    )
}

OvertimeForm.propTypes = {
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    data: PropTypes.object,
    approverOptions: PropTypes.array.isRequired,
    watch: PropTypes.func.isRequired,
}

export default OvertimeForm