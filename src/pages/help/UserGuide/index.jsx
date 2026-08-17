import PageTemplate from '@/components/PageTemplate'
import { USER_GUIDE_FEATURES } from '@/constants/user-guide-steps.jsx'
import React, { useMemo, useState } from 'react'
import { setPendingUserGuide } from '@/utilities/user-guide-launcher'

export default function UserGuide() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredFeatures = useMemo(function () {
        const query = searchQuery.trim().toLowerCase()

        if (!query) {
            return USER_GUIDE_FEATURES
        }

        return USER_GUIDE_FEATURES.filter(function (item) {
            const feature = item.feature?.toLowerCase() || ''
            const description = item.description?.toLowerCase() || ''

            return feature.includes(query) || description.includes(query)
        })
    }, [searchQuery])

    const groupedFeatures = useMemo(function () {
        return filteredFeatures.reduce(function (groups, item) {
            const category = item.category || 'General'

            if (!groups[category]) {
                groups[category] = []
            }

            groups[category].push(item)
            return groups
        }, {})
    }, [filteredFeatures])

    function handleStartGuide(item) {
        if (item?.actionName) {
            setPendingUserGuide(item.actionName)
        }
    }

    return (
        <PageTemplate
            title="User Guide"
            subtitle="A step-by-step guide to help you navigate and use the features of the application."
        >
            <div className="p-1 sm:p-3 space-y-6">
                <p className="text-sm text-gray-500">
                    Pick a feature to open it and walk through a short, guided tour.
                </p>

                <div className="relative">
                    <svg
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={function (event) { setSearchQuery(event.target.value) }}
                        placeholder="Search a feature or description"
                        className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                </div>

                {Object.entries(groupedFeatures).map(function ([category, items]) {
                    return (
                        <section key={category}>
                            <h2 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                {category}
                            </h2>

                            <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
                                {items.map(function (item) {
                                    return (
                                        <button
                                            key={item.actionName}
                                            type="button"
                                            onClick={function () { handleStartGuide(item) }}
                                            className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset transition-colors cursor-pointer"
                                        >
                                            <span className="min-w-0">
                                                <span className="block text-sm font-medium text-gray-800">
                                                    {item.feature}
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                    {item.description}
                                                </span>
                                            </span>

                                            <svg
                                                className="h-4 w-4 shrink-0 text-gray-300"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}

                {searchQuery.trim() && Object.keys(groupedFeatures).length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
                        <p className="text-sm text-gray-500">
                            No features match &quot;{searchQuery.trim()}&quot;.
                        </p>
                    </div>
                )}
            </div>
        </PageTemplate>
    )
}