import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'sonner'

function CopyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    )
}

function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function CopyableText({ text, className }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy(e) {
        e.stopPropagation()
        try {
            await navigator.clipboard.writeText(text)
            toast.success('Copied to clipboard!', { duration: 1500 })
            setCopied(true)
            setTimeout(function () { setCopied(false) }, 1500)
        } catch (err) {
            console.error('Failed to copy text:', err)
        }
    }

    if (!text || !text.trim()) {
        return null
    }

    return (
        <div className={`inline-flex items-center gap-2 ${className || ''}`}>
            <span>{text}</span>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                title={copied ? 'Copied' : 'Copy to clipboard'}
            >
                {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
        </div>
    )
}

CopyableText.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default CopyableText