import React from 'react'
import PropTypes from 'prop-types'
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import TypeaheadSelect from '@/components/form/TypeaheadSelect'
import { PASSWORD_REQUIREMENTS } from '@/pages/home/ChangePassword'
import { MAX_PIN_LENGTH, PIN_PATTERN, PIN_PATTERN_MESSAGE } from '@/constants/password-validation'

function UserForm({
    isAddMode,
    register,
    control,
    errors,
    roleOptions = [],
    employeeOptions = [],
}) {
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                <TypeaheadSelect
                    name="personId"
                    label="Employee"
                    control={control}
                    validation={{ required: { value: isAddMode, message: 'Employee is required when creating a new user' } }}
                    error={errors.personId?.message}
                    className="col-span-1 sm:col-span-2 mb-0!"
                    options={employeeOptions} // Options will be fetched in the parent component
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

                <FormInput
                    name="hasEvac"
                    label="Can Access Evacuation Button?"
                    type="checkbox"
                    register={register}
                    error={errors.hasEvac?.message}
                    className="mb-0! mt-2!"
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
                    maxLength={MAX_PIN_LENGTH}
                    validation={{
                        required: { value: isAddMode, message: 'PIN is required when creating a new user' },
                        pattern: {
                            value: PIN_PATTERN,
                            message: PIN_PATTERN_MESSAGE,
                        },
                        onChange: (e) => {
                            // Only allow digits to be entered
                            const value = e.target.value
                            e.target.value = value.replace(/\D/g, '')
                        },
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
    employeeOptions: PropTypes.array.isRequired,
}

export default UserForm