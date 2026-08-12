import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/form/FormInput'
import Alert from '@/components/Alert'
import CompanyBrand from '@/components/CompanyBrand'
import DevelopmentBanner from '@/components/DevelopmentBanner'
import { useAuthStore } from '@/store'
import { useMessage } from '@/hooks/use-message'
import { login as loginUser } from '@/services/auth-service'
import { getUserIdFromToken } from '@/utilities/jwt-utils'
import { isResultSuccessful } from '@/utilities'
import AcronymBreakdown from '@/components/AcronymBreakdown'

// Small inline icons — kept dependency-free rather than pulling in an icon library
const ClockIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
    </svg>
)

const brandItems = [
    { letter: 'GBSS' },
    { letter: 'Employee' },
    { letter: 'Attendance' },
    { letter: 'Recording' },
    { letter: 'System' },
]

const Login = () => {
    const navigate = useNavigate()
    const token = useAuthStore((state) => state.token)
    const [formError, setFormError] = useMessage()
    const [loading, setLoading] = useState(false)
    const [now, setNow] = useState(new Date())

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onSubmit'
    })

    useEffect(function () {
        if (token) {
            navigate('/', { replace: true })
        }
    }, [token, navigate])

    // Running timestamp — small, functional nod to what an attendance system is for
    useEffect(function () {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

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

    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Manila' })
    const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' })

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <DevelopmentBanner />

            <div className="flex min-h-0 flex-1">
                {/* Left Side - Branding panel (desktop only) */}
                <div className="hidden md:flex md:w-1/2 lg:w-3/5">
                    <CompanyBrand
                        variant="panel"
                        title="Welcome to GEARS"
                        extra={<AcronymBreakdown items={brandItems} />}
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="relative flex min-h-0 flex-1 flex-col">
                    {/* Decorative background — desktop only; on mobile the card banner already carries the brand color */}
                    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-white to-secondary/5" />
                        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                    </div>

                    {/* Scrollable content area — the card stays reachable on short viewports */}
                    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
                        <div className="w-full max-w-md">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-primary/10 ring-1 ring-primary/5 sm:rounded-3xl md:shadow-xl md:shadow-primary/5">

                                {/* Full-bleed color banner — mobile & tablet only, replaces the old floating logo */}
                                <div className="md:hidden">
                                    <CompanyBrand
                                        variant="compact"
                                        title="GEARS"
                                        description="GBSS Employee Attendance Recording System"
                                    />
                                </div>

                                <div className="px-6 py-8 sm:px-10 sm:py-10">
                                    {/* Running timestamp */}
                                    <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-tertiary">
                                        <ClockIcon className="h-3.5 w-3.5" />
                                        <span className="tabular-nums">{timeString}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{dateString}</span>
                                    </div>

                                    {/* Form Header */}
                                    <div className="mb-8 text-center">
                                        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-[28px]">
                                            Sign in
                                        </h2>
                                        <p className="mt-2 text-sm text-tertiary">
                                            Enter your credentials to continue
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {formError && (
                                        <div className="mb-6">
                                            <Alert text={formError} type="error" />
                                        </div>
                                    )}

                                    {/* Login Form */}
                                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
                                        >
                                            {loading && (
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            )}
                                            {loading ? 'Signing in…' : 'Sign in'}
                                        </button>
                                    </form>

                                    {/* Footer */}
                                    <p className="mt-8 text-center text-xs text-tertiary">
                                        © {new Date().getFullYear()} GBSS. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login