export function encodePaths(paths) {
    const arr = Array.isArray(paths) ? paths : [paths]
    return btoa(JSON.stringify(arr))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

export function decodePaths(encoded) {
    try {
        const base64 = encoded
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(Math.ceil(encoded.length / 4) * 4, '=')
        return JSON.parse(atob(base64))
    } catch {
        return null
    }
}