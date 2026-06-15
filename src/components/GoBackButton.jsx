import React from 'react'
import PropTypes from 'prop-types'
import useTabNavigation from '@/hooks/use-tab-navigation'

const GoBackButton = ({
    id,
    label = 'Go Back',
    divClassName = 'mb-2',
    path = -1,
    tabLabel,
}) => {
    const { navigate } = useTabNavigation()

    const handleGoBack = () => {
        navigate(path, { id, label: tabLabel }, true)
    }

    return (
        <div className={divClassName}>
            <button
                type='button'
                onClick={handleGoBack}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-bg-secondary hover:underline transition-colors cursor-pointer"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span>{label}</span>
            </button>
        </div>
    )
}

GoBackButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    path: PropTypes.string,
    divClassName: PropTypes.string,
    tabLabel: PropTypes.string,
}

export default GoBackButton
