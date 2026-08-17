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

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3'>
            <FormInput
                name="overtimeDate"
                label="OT Date"
                type="date"
                register={register}
                disabled={true}
                validation={{ required: 'OT Date is required' }}
                error={errors.overtimeDate?.message}
                className='ot-date-input'
            />

            <FormInput
                name="numHours"
                label="Num of Hours"
                type="number"
                register={register}
                validation={{
                    required: 'Num of Hours is required',
                    validate: value => value > 0 || 'Num of Hours must be greater than 0'
                }}
                error={errors.numHours?.message}
                className='ot-num-hours-input'
            />

            {/* <TypeaheadSelect
                name="approvedBy"
                label="Approved By"
                control={control}
                validation={{ required: 'Approved By is required' }}
                error={errors.approvedBy?.message}
                options={updatedOptions}
                className='col-span-1 sm:col-span-2'
                /> */}

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
        </div>
    )
}

OvertimeForm.propTypes = {
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    data: PropTypes.object,
    approverOptions: PropTypes.array.isRequired,
}

export default OvertimeForm
