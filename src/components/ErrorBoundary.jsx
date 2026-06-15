import React from 'react'
import PropTypes from 'prop-types'
import logger from '@/utilities/logger'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo })
        if (import.meta.env.DEV) {
            logger.error('ErrorBoundary caught an error:', error, errorInfo)
        }
    }

    reset() {
        this.setState({ hasError: false, error: null, errorInfo: null })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                if (typeof this.props.fallback === 'function') {
                    return this.props.fallback(this.state.error, this.state.errorInfo, this.reset.bind(this))
                }
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

export default ErrorBoundary
