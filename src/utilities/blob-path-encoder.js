export function encodePaths(paths) {
    const arr = Array.isArray(paths) ? paths : [paths]
    return btoa(JSON.stringify(arr))
}

export function decodePaths(encoded) {
    try {
        return JSON.parse(atob(encoded))
    } catch {
        return null
    }
}