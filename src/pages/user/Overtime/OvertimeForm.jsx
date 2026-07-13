import React from 'react'
import PropTypes from 'prop-types'
import FormInput from '@/components/form/FormInput'
import TypeaheadSelect from '@/components/form/TypeaheadSelect'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'

function OvertimeForm({
    register,
    control,
    errors
}) {
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
            />

            <TypeaheadSelect
                name="approvedBy"
                label="Approved By"
                control={control}
                validation={{ required: 'Approved By is required' }}
                error={errors.approvedBy?.message}
                options={formatArrayOfStringsAsSelectOptions(['John Doe', 'Jane Smith', 'Bob Johnson'])} // TODO: Replace with actual options from API or state
                className='col-span-1 sm:col-span-2'
            />
        </div>
    )
}

OvertimeForm.propTypes = {
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

export default OvertimeForm
