import React from 'react'
import PropTypes from 'prop-types'
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import TypeaheadSelect from '@/components/form/TypeaheadSelect'
import { PASSWORD_REQUIREMENTS } from '@/pages/home/ChangePassword'
import { PIN_PATTERN } from '@/pages/home/ChangePin'

function UserForm({
    isAddMode,
    register,
    control,
    errors,
    roleOptions = [],
}) {
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                <TypeaheadSelect
                    name="personId"
                    label="Employee"
                    control={control}
                    validation={{ required: 'Employee is required' }}
                    error={errors.personId?.message}
                    className="col-span-1 sm:col-span-2 mb-0!"
                    options={[]} // Options will be fetched in the parent component
                    disabled={!isAddMode} // Disable the field when editing an existing user
                // autoFocus={isAddMode} // Auto-focus only when adding a new user
                />

                <FormInput
                    name="username"
                    label="Username"
                    register={register}
                    validation={{ required: 'Username is required' }}
                    error={errors.username?.message}
                    className="mb-0!"
                // autoFocus={!isAddMode} // Auto-focus only when editing an existing user
                />

                <FormSelect
                    name='roleId'
                    label='Role'
                    register={register}
                    validation={{ required: 'Role is required' }}
                    options={roleOptions}
                    error={errors.roleId?.message}
                    className="mb-0!"
                />
            </div>

            <hr className="my-4 border-t border-gray-200" />

            <p className="text-sm text-gray-500 mb-2">
                {isAddMode ? 'Set a password and PIN for the new user.' : 'Leave Password and PIN empty to keep them unchanged. If a value is entered, it will be updated.'}
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-5 gap-2'>
                <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    error={errors.password?.message}
                    className="sm:col-span-3 mb-0!"
                    validation={{
                        required: { value: isAddMode, message: 'Password is required when creating a new user' },
                        validate: (value) => {

                            // only validate in update mode if a value is provided
                            if (!isAddMode && !value) {
                                return true
                            }
                            
                            const failed = PASSWORD_REQUIREMENTS.find(r => !r.test(value))
                            return failed ? `Password must ${failed.label}` : true
                        },
                    }}
                />

                <FormInput
                    name="pin"
                    label="PIN"
                    type="password"
                    register={register}
                    error={errors.pin?.message}
                    className="sm:col-span-2 mb-0!"
                    validation={{
                        required: { value: isAddMode, message: 'PIN is required when creating a new user' },
                        pattern: {
                            value: PIN_PATTERN,
                            message: 'Pin must be exactly 4 digits',
                        },
                        onChange: (e) => {
                            // Only allow digits to be entered
                            const value = e.target.value
                            e.target.value = value.replace(/\D/g, '')
                        },
                        maxLength: { value: 4, message: 'Pin must be exactly 4 digits' },
                    }}
                />
            </div>
        </div>
    )
}

UserForm.propTypes = {
    isAddMode: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    roleOptions: PropTypes.array.isRequired,
}

export default UserForm