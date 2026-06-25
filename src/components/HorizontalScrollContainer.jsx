import React, {
    useRef,
    useEffect,
    useState
} from 'react'
import PropTypes from 'prop-types'

const HorizontalScrollContainer = ({
    children,
    className = '',
    autoScroll = false,
    edgeZone = 20,
    scrollSpeed = 6
}) => {
    const scrollRef = useRef(null)
    const scrollIntervalRef = useRef(null)
    const [showLeftIndicator, setShowLeftIndicator] = useState(false)
    const [showRightIndicator, setShowRightIndicator] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    // Check if container can scroll in either direction
    const updateScrollability = () => {
        if (!scrollRef.current) return

        const container = scrollRef.current
        const hasScrollLeft = container.scrollLeft > 0
        const hasScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth

        setCanScrollLeft(hasScrollLeft)
        setCanScrollRight(hasScrollRight)
    }

    const handleMouseMove = (e) => {
        if (!autoScroll || !scrollRef.current) return

        const container = scrollRef.current
        const rect = container.getBoundingClientRect()
        const mouseX = e.clientX - rect.left

        // Update scrollability
        updateScrollability()

        // Update indicator visibility based on mouse position AND scroll position
        const isInLeftZone = mouseX < edgeZone && mouseX >= 0
        const isInRightZone = mouseX > rect.width - edgeZone && mouseX <= rect.width

        setShowLeftIndicator(isInLeftZone && canScrollLeft)
        setShowRightIndicator(isInRightZone && canScrollRight)

        // Clear any existing interval
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current)
            scrollIntervalRef.current = null
        }

        // Check if mouse is in left edge zone
        if (mouseX < edgeZone && mouseX >= 0) {
            scrollIntervalRef.current = setInterval(() => {
                if (container.scrollLeft > 0) {
                    container.scrollLeft -= scrollSpeed
                } else {
                    clearInterval(scrollIntervalRef.current)
                    scrollIntervalRef.current = null
                }
            }, 16) // ~60fps
        }
        // Check if mouse is in right edge zone
        else if (mouseX > rect.width - edgeZone && mouseX <= rect.width) {
            scrollIntervalRef.current = setInterval(() => {
                if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
                    container.scrollLeft += scrollSpeed
                } else {
                    clearInterval(scrollIntervalRef.current)
                    scrollIntervalRef.current = null
                }
            }, 16) // ~60fps
        }
    }

    const handleMouseLeave = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current)
            scrollIntervalRef.current = null
        }
        // Hide indicators when mouse leaves
        setShowLeftIndicator(false)
        setShowRightIndicator(false)
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current)
            }
        }
    }, [])

    // Initial scrollability check and listener for scroll events
    useEffect(() => {
        updateScrollability()

        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updateScrollability)
            window.addEventListener('resize', updateScrollability)

            return () => {
                container.removeEventListener('scroll', updateScrollability)
                window.removeEventListener('resize', updateScrollability)
            }
        }
    }, [children])

    // Translate vertical wheel events into horizontal scroll
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        function handleWheel(e) {
            e.preventDefault()
            container.scrollLeft += e.deltaY
        }

        container.addEventListener('wheel', handleWheel, { passive: false })

        return function () {
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${className}`}
            >
                {children}
            </div>

            {/* Left scroll indicator */}
            {autoScroll && showLeftIndicator && (
                <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none bg-linear-to-r from-gray-200/30 to-transparent">
                    <div className="bg-white/90 rounded-full p-1 shadow-md">
                        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Right scroll indicator */}
            {autoScroll && showRightIndicator && (
                <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none bg-linear-to-l from-gray-200/30 to-transparent">
                    <div className="bg-white/90 rounded-full p-1 shadow-md">
                        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}

HorizontalScrollContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    autoScroll: PropTypes.bool,
    edgeZone: PropTypes.number,
    scrollSpeed: PropTypes.number
}

export default HorizontalScrollContainer
