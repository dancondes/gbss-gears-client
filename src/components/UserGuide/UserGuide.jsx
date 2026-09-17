import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { ACTIONS, EVENTS, Joyride, STATUS } from 'react-joyride'
import PropTypes from 'prop-types'
import useMenuItemClick from '@/hooks/use-menu-item-click'

function waitForElement(selector, { timeout = 5000, interval = 100 } = {}) {
    return new Promise(function (resolve) {
        if (!selector) {
            resolve(null)
            return
        }

        const existing = document.querySelector(selector)
        if (existing) {
            resolve(existing)
            return
        }

        const startTime = Date.now()

        const timer = setInterval(function () {
            const el = document.querySelector(selector)

            if (el) {
                clearInterval(timer)
                resolve(el)
                return
            }

            if (Date.now() - startTime >= timeout) {
                clearInterval(timer)
                resolve(null)
            }
        }, interval)
    })
}

function UserGuideTooltip({
    backProps,
    closeProps,
    index,
    isLastStep,
    primaryProps,
    size,
    skipProps,
    step,
    tooltipProps,
}) {

    return (
        <div
            {...tooltipProps}
            className="w-full max-w-85 sm:max-w-95 rounded-xl border border-gray-200 bg-white shadow-lg"
        >
            <div className="flex items-center justify-between px-4 pt-3">
                <p className="text-xs text-gray-500">Step {index + 1} of {size}</p>
                <button
                    {...closeProps}
                    type="button"
                    className="h-7 w-7 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                    aria-label="Close guide"
                >
                    <svg className="mx-auto h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div className="px-4 py-2 text-sm text-gray-700">{step.content}</div>

            <div className="flex items-center justify-between gap-2 px-4 pb-4 pt-1">
                <button
                    {...skipProps}
                    type="button"
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                    Skip
                </button>

                <div className="flex items-center gap-2">
                    {index > 0 && (
                        <button
                            {...backProps}
                            type="button"
                            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs sm:text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Previous
                        </button>
                    )}

                    <button
                        {...primaryProps}
                        type="button"
                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs sm:text-sm hover:bg-dark-primary transition-colors cursor-pointer"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    )
}

UserGuideTooltip.propTypes = {
    backProps: PropTypes.object,
    closeProps: PropTypes.object,
    index: PropTypes.number,
    isLastStep: PropTypes.bool,
    primaryProps: PropTypes.object,
    size: PropTypes.number,
    skipProps: PropTypes.object,
    step: PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    tooltipProps: PropTypes.object,
}

function UserGuide({
    steps = [],
    run = false,
    onFinish = null,
    onSkip = null,
    onClose = null
}) {
    const [stepIndex, setStepIndex] = useState(0)
    const [canRun, setCanRun] = useState(false)
    const previousRunRef = useRef(run)
    const handleMenuItemClick = useMenuItemClick()

    const normalizedSteps = useMemo(function () {
        return (steps || []).map(function (step) {
            const stepDisablesBeacon = step?.disableBeacon === true

            return {
                ...step,
                skipBeacon: step?.skipBeacon ?? stepDisablesBeacon ?? true,
            }
        })
    }, [steps])

    useEffect(function () {
        if (run && !previousRunRef.current) {
            setStepIndex(0)
        }

        if (!run) {
            setStepIndex(0)
        }

        previousRunRef.current = run
    }, [run])

    // Don't let Joyride start until the first step's target actually exists in the DOM.
    useEffect(function () {
        if (!run || !normalizedSteps.length) {
            setCanRun(false)
            return
        }

        let cancelled = false
        setCanRun(false)

        waitForElement(normalizedSteps[0]?.target).then(function (el) {
            if (!cancelled) {
                setCanRun(!!el)
            }
        })

        return function () {
            cancelled = true
        }
    }, [run, normalizedSteps])

    const joyrideStyles = useMemo(function () {
        return {
            options: {
                zIndex: 9999,
                arrowColor: '#ffffff',
                backgroundColor: '#ffffff',
                overlayColor: 'rgba(13, 65, 110, 0.45)',
                primaryColor: '#0d416e',
                textColor: '#1f2937',
            },
            tooltip: {
                borderRadius: 12,
            },
        }
    }, [])

    function handleGuideEnd(data) {
        setStepIndex(0)
        if (onFinish) {
            onFinish(data)
        }
    }

    function goToStep(nextStepIndex, data) {
        if (nextStepIndex >= normalizedSteps.length) {
            handleGuideEnd(data)
            return
        }

        if (nextStepIndex < 0) {
            setStepIndex(0)
            return
        }

        const nextTarget = normalizedSteps[nextStepIndex]?.target
        const existingEl = nextTarget ? document.querySelector(nextTarget) : null

        if (existingEl) {
            // fast path — target is already there, no need to wait
            setStepIndex(nextStepIndex)
            return
        }

        // slow path — target isn't ready yet, poll for it
        waitForElement(nextTarget).then(function (el) {
            if (el) {
                setStepIndex(nextStepIndex)
            } else {
                goToStep(nextStepIndex + 1, data)
            }
        })
    }

    function handleGuideCallback(data) {
        const { action, index, status, type } = data

        if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
            const currentStep = normalizedSteps[index]

            if (currentStep?.clickTargetOnNext && currentStep.target) {
                const targetElement = document.querySelector(currentStep.target)

                if (targetElement && typeof targetElement.click === 'function') {
                    targetElement.click()
                }
            }

            if (currentStep?.menuItemClick) {
                handleMenuItemClick(currentStep.menuItemClick)
            }

            if (currentStep?.specificAction && typeof currentStep.specificAction === 'function') {
                currentStep.specificAction()
            }
        }

        if (status === STATUS.SKIPPED) {
            setStepIndex(0)
            if (onSkip) {
                onSkip(data)
            }
            return
        }

        if (action === ACTIONS.SKIP) {
            setStepIndex(0)
            if (onSkip) {
                onSkip(data)
            }
            return
        }

        if (status === STATUS.FINISHED) {
            handleGuideEnd(data)
            return
        }

        if (action === ACTIONS.CLOSE) {
            setStepIndex(0)
            if (onClose) {
                onClose(data)
            }
            return
        }

        if (type === EVENTS.TARGET_NOT_FOUND) {
            // the current step's target vanished/never rendered — wait, then retry or skip
            waitForElement(normalizedSteps[index]?.target).then(function (el) {
                if (el) {
                    // force a re-render of the same step once it's actually there
                    setStepIndex(-1)
                    setTimeout(function () {
                        setStepIndex(index)
                    }, 0)
                } else {
                    goToStep(index + 1, data)
                }
            })
            return
        }

        if (type === EVENTS.STEP_AFTER) {
            const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
            goToStep(nextStepIndex, data)
        }
    }

    if (!normalizedSteps.length) {
        return null
    }

    return (
        <Joyride
            onEvent={handleGuideCallback}
            continuous
            disableScrollParentFix={false}
            locale={{
                back: 'Previous',
                close: 'Close',
                last: 'Finish',
                next: 'Next',
                skip: 'Skip',
            }}
            run={run && canRun}
            scrollToFirstStep
            showSkipButton
            stepIndex={stepIndex}
            steps={normalizedSteps}
            styles={joyrideStyles}
            tooltipComponent={UserGuideTooltip}
        />
    )
}

UserGuide.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            placement: PropTypes.string,
            target: PropTypes.string.isRequired,
            clickTargetOnNext: PropTypes.bool,
        })
    ),
    run: PropTypes.bool,
    onFinish: PropTypes.func,
    onSkip: PropTypes.func,
    onClose: PropTypes.func,
}

export default memo(UserGuide)