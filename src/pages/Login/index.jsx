import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import Alert from '../../components/Alert'
import CompanyBrand from '../../components/CompanyBrand'
import { gbss_logo } from '../../assets/images'

function Login() {
    const [formError, setFormError] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentDateTime, setCurrentDateTime] = useState(new Date())

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    // Update date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format date and time like the legacy system
    function formatDateTime(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }
        return date.toLocaleString('en-US', options)
    }

    async function onSubmit(data) {
        setFormError('')

        try {
            setLoading(true)
            // TODO: Implement actual login logic
            console.log('Login attempt:', data)
        } catch (err) {
            setFormError(err?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Logo & Branding (hidden on mobile, visible on md+) */}
            <CompanyBrand
                title="Welcome to GEARS"
                description="Track your attendance and working hours efficiently"
            />

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-12 border-l border-gray-200">
                <div className="max-w-md w-full space-y-8">
                    {/* Mobile Logo (visible only on mobile) */}
                    <div className="md:hidden text-center mb-8">
                        <img
                            src={gbss_logo}
                            alt="GBSS Logo"
                            className="mx-auto h-16 w-auto"
                        />
                    </div>

                    {/* Form Header */}
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-primary">
                            Sign in to your account
                        </h2>
                        <p className="mt-3 text-center text-sm font-medium text-tertiary">
                            {formatDateTime(currentDateTime)}
                        </p>
                    </div>

                    {/* Error Message */}
                    {formError && (
                        <Alert text={formError} type="error" />
                    )}

                    {/* Login Form */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-4">
                            {/* Username */}
                            <FormInput
                                name="username"
                                type="text"
                                placeholder="Username"
                                label="Username"
                                autoComplete="username"
                                error={errors.username?.message}
                                register={register}
                                validation={{
                                    required: 'Username is required'
                                }}
                            />

                            {/* Password */}
                            <FormInput
                                name="password"
                                type="password"
                                placeholder="Password"
                                label="Password"
                                autoComplete="current-password"
                                error={errors.password?.message}
                                register={register}
                                validation={{
                                    required: 'Password is required'
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors cursor-pointer"
                            >
                                {loading ? 'Signing in...' : 'Login'}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-tertiary">
                            © {new Date().getFullYear()} GBSS. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
