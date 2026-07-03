import React from 'react'
import PropTypes from 'prop-types'
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'

function UserForm({
    register,
    errors
}) {
    return (
        <div>
            <FormInput
                name="name"
                label="Name"
                register={register}
                validation={{ required: 'Name is required' }}
                error={errors.name?.message}
            />

            <FormInput
                name="username"
                label="Username"
                register={register}
                validation={{ required: 'Username is required' }}
                error={errors.username?.message}
            />

            <FormInput
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password?.message}
            />

            <FormInput
                name="pin"
                label="PIN"
                type="password"
                register={register}
                error={errors.pin?.message}
            />

            <FormSelect
                name='role'
                label='Role'
                register={register}
                // validation={{ required: 'Role is required' }}
                options={[]}
                error={errors.role?.message}
            />

            <FormSelect
                name='floor'
                label='Floor'
                register={register}
                // validation={{ required: 'Floor is required' }}
                options={[]}
                error={errors.floor?.message}
            />
        </div>
    )
}

UserForm.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

export default UserForm
