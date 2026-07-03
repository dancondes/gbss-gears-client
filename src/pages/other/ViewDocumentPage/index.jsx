import React from 'react'
import { useParams } from 'react-router-dom'
import BlobViewerModal from '@/components/modals/BlobViewerModal'
import { useAuthStore } from '@/store'
import { decodePaths } from '@/utilities/blob-path-encoder'

export default function ViewDocumentPage() {
    const { encryptedPath } = useParams()
    const token = useAuthStore((state) => state.token) // adjust selector to your actual shape

    const attachments = decodePaths(encryptedPath)

    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-4 text-center max-w-sm px-6 py-10 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Access denied</p>
                        <p className="text-sm text-gray-500 leading-relaxed">You need to be signed in to view this document. Please log in and try again.</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!attachments || attachments.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-4 text-center max-w-sm px-6 py-10 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-50">
                        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Invalid link</p>
                        <p className="text-sm text-gray-500 leading-relaxed">This document link is invalid or has been corrupted. Please request a new link.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <BlobViewerModal
            isPage
            isOpen
            onClose={() => { }}
            attachments={attachments}
        />
    )
}