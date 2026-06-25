import logger from '@/utilities/logger'

export const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: 2000,
    errorRetryCount: 0,
    onError: (error) => {
        if (import.meta.env.DEV) {
            logger.error('SWR Error:', error)
        }
    }
}

export const defaultFetcher = async (fn) => {
    if (typeof fn === 'function') {
        return await fn()
    }
    throw new Error('Fetcher must be a function')
}
