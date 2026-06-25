import React from 'react'
import PropTypes from 'prop-types'

// Reusable SVG icons for pagination buttons
const ChevronLeftIcon = ({ className }) => (
    <svg className={className || 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
)
ChevronLeftIcon.propTypes = { className: PropTypes.string }

const ChevronRightIcon = ({ className }) => (
    <svg className={className || 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
)
ChevronRightIcon.propTypes = { className: PropTypes.string }

const DoubleChevronLeftIcon = ({ className }) => (
    <svg className={className || 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
)
DoubleChevronLeftIcon.propTypes = { className: PropTypes.string }

const DoubleChevronRightIcon = ({ className }) => (
    <svg className={className || 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)
DoubleChevronRightIcon.propTypes = { className: PropTypes.string }

/**
 * Reusable pagination button component
 */
const PaginationButton = ({ onClick, disabled, title, ariaLabel, children, className }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        aria-label={ariaLabel}
        className={`p-1.5 rounded border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer transition-colors ${className || ''}`}
    >
        {children}
    </button>
)
PaginationButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    ariaLabel: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

/**
 * Results info display component
 */
const ResultsInfo = ({ startIndex, endIndex, totalItems, className }) => (
    <div className={className || ''}>
        Showing{' '}
        <span className="font-semibold">{startIndex}</span>
        -
        <span className="font-semibold">{endIndex}</span>
        {' '}of{' '}
        <span className="font-semibold">{totalItems}</span>
    </div>
)
ResultsInfo.propTypes = {
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    className: PropTypes.string,
}

/**
 * Pagination controls for the Table component
 * Includes responsive layouts for mobile and desktop
 */
const TablePagination = ({
    pageIndex,
    pageSize,
    pageCount,
    totalItems,
    canPreviousPage,
    canNextPage,
    onFirstPage,
    onPreviousPage,
    onNextPage,
    onLastPage,
    onPageChange,
}) => {
    const startIndex = totalItems === 0 ? 0 : pageIndex * pageSize + 1
    const endIndex = Math.min((pageIndex + 1) * pageSize, totalItems)

    const handlePageInputChange = (e) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        if (page >= 0 && page < pageCount) {
            onPageChange(page)
        }
    }

    return (
        <div className="mt-6 pt-4 border-t border-gray-200">
            {/* Mobile Layout */}
            <div className="lg:hidden">
                <ResultsInfo
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={totalItems}
                    className="text-xs text-gray-600 text-center mb-3"
                />

                <div className="flex justify-center items-center gap-1">
                    <PaginationButton
                        onClick={onFirstPage}
                        disabled={!canPreviousPage}
                        title="First page"
                        ariaLabel="First page"
                    >
                        <ChevronLeftIcon className="w-3.5 h-3.5" />
                    </PaginationButton>

                    <PaginationButton
                        onClick={onPreviousPage}
                        disabled={!canPreviousPage}
                        title="Previous page"
                        ariaLabel="Previous page"
                    >
                        <DoubleChevronLeftIcon className="w-3.5 h-3.5" />
                    </PaginationButton>

                    <span className="px-2 text-xs text-gray-600 font-medium">
                        {pageIndex + 1} / {pageCount}
                    </span>

                    <PaginationButton
                        onClick={onNextPage}
                        disabled={!canNextPage}
                        title="Next page"
                        ariaLabel="Next page"
                    >
                        <DoubleChevronRightIcon className="w-3.5 h-3.5" />
                    </PaginationButton>

                    <PaginationButton
                        onClick={onLastPage}
                        disabled={!canNextPage}
                        title="Last page"
                        ariaLabel="Last page"
                    >
                        <ChevronRightIcon className="w-3.5 h-3.5" />
                    </PaginationButton>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between">
                <ResultsInfo
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={totalItems}
                    className="text-sm text-gray-700"
                />

                <div className="flex items-center gap-1.5">
                    <PaginationButton
                        onClick={onFirstPage}
                        disabled={!canPreviousPage}
                        title="First page"
                        ariaLabel="First page"
                    >
                        <ChevronLeftIcon />
                    </PaginationButton>

                    <PaginationButton
                        onClick={onPreviousPage}
                        disabled={!canPreviousPage}
                        title="Previous page"
                        ariaLabel="Previous page"
                    >
                        <DoubleChevronLeftIcon />
                    </PaginationButton>

                    {/* Page Input */}
                    <div className="flex items-center gap-1 ml-1">
                        <span className="text-sm text-gray-600">Page</span>
                        <input
                            type="number"
                            min="1"
                            max={pageCount}
                            value={pageIndex + 1}
                            onChange={handlePageInputChange}
                            className="w-15 text-center border border-gray-300 rounded px-1.5 py-0.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                        />
                        <span className="text-sm text-gray-600">of {pageCount}</span>
                    </div>

                    <PaginationButton
                        onClick={onNextPage}
                        disabled={!canNextPage}
                        title="Next page"
                        ariaLabel="Next page"
                        className="ml-1"
                    >
                        <DoubleChevronRightIcon />
                    </PaginationButton>

                    <PaginationButton
                        onClick={onLastPage}
                        disabled={!canNextPage}
                        title="Last page"
                        ariaLabel="Last page"
                    >
                        <ChevronRightIcon />
                    </PaginationButton>
                </div>
            </div>
        </div>
    )
}

TablePagination.propTypes = {
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    canPreviousPage: PropTypes.bool.isRequired,
    canNextPage: PropTypes.bool.isRequired,
    onFirstPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onLastPage: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default React.memo(TablePagination)
