import { useState, useEffect } from 'react'

export const useMessage = (clearDelay = 3000) => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!message) return

        const timer = setTimeout(() => {
            setMessage('')
        }, clearDelay)

        return () => clearTimeout(timer)
    }, [message, clearDelay])

    return [message, setMessage]
}
