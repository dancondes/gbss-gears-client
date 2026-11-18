export function isChunkLoadError(error) {
    const message = error?.message || ''
    return (
        message.includes('Failed to fetch dynamically imported module') || // Chrome / Edge / Firefox
        message.includes('Importing a module script failed') ||            // Safari
        message.includes('error loading dynamically imported module')      // Firefox
    )
}