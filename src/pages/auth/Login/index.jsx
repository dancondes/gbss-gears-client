import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/form/FormInput'
import Alert from '@/components/Alert'
import CompanyBrand from '@/components/CompanyBrand'
import DevelopmentBanner from '@/components/DevelopmentBanner'
import { gbss_logo } from '@/assets/images'
import { useAuthStore } from '@/store'
import { useMessage } from '@/hooks/use-message'
import { login as loginUser } from '@/services/auth-service'
import { getUserIdFromToken } from '@/utilities/jwt-utils'
import { isResultSuccessful } from '@/utilities'

const Login = () => {
    const navigate = useNavigate()
    const token = useAuthStore((state) => state.token)
    const [formError, setFormError] = useMessage()
    const [loading, setLoading] = useState(false)

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

    useEffect(function () {
        if (token) {
            navigate('/', { replace: true })
        }
    }, [token, navigate])


    async function onSubmit(data) {
        setFormError('')

        try {
            setLoading(true)
            const result = await loginUser(data)

            if (isResultSuccessful(result)) {
                const userId = getUserIdFromToken(result.data.token)

                if (!userId) {
                    setFormError('Failed to extract user ID from token')
                    return
                }

                const { login } = useAuthStore.getState()
                login(result.data)
            }

        } catch (err) {
            setFormError(err?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DevelopmentBanner />
            <div className="flex flex-1">
                {/* Left Side - Logo & Branding (hidden on mobile, visible on md+) */}
                <CompanyBrand
                    title="Welcome to GEARS"
                    description="Employee Time In & Out System"
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
                            <p className="mt-2 text-center text-sm text-tertiary">
                                Enter your credentials to continue
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
                                    placeholder="yourname"
                                    label="Username"
                                    autoComplete="username"
                                    error={errors.username?.message}
                                    register={register}
                                    validation={{
                                        required: 'Username is required',
                                    }}
                                    autoFocus
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                {/* <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-secondary border-tertiary rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-tertiary cursor-pointer">
                                        Remember me
                                    </label>
                                </div> */}

                                <div></div>

                                {/* <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-primary hover:text-secondary">
                                        Forgot password?
                                    </Link>
                                </div> */}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors cursor-pointer"
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        {/* Register Link */}
                        {/* <div className="text-center">
                            <p className="text-sm text-tertiary">
                                New employee?{' '}
                                <Link to="/register" className="font-medium text-primary hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div> */}

                        {/* Footer */}
                        <div className="text-center">
                            <p className="text-xs text-tertiary">
                                © {new Date().getFullYear()} GBSS. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
