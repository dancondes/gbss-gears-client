export function downloadFile(blob, name) {
    // Create a blob URL and trigger download
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
}

// For Employee Documents
export function updatePathFor201Files(path) {
    if (!path) return null

    return path.replace('\\\\10.0.7.2\\Documents\\', 'Documents/201 Files/')
}

// For Documents (Sidebar)
export function updatePathForTeamDocuments(path) {
    if (!path) return null

    // return path.replace('\\\\manhr\\Documents\\TeamDocument\\', 'dev/Documents/Documents/')
    return path.replace(/\\\\(?:manhr|10\.0\.7\.2)\\Documents\\TeamDocument\\(\d+)\\/i, 'Documents/Documents/$1/')
}

export async function convertToFormat(file, format = 'image/png') {
    return new Promise((resolve) => {
        const extension = format.split('/').pop()
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            canvas.getContext('2d').drawImage(img, 0, 0)
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url)
                resolve(new File([blob], `${file.name.split('.')[0]}.${extension}`, { type: format }))
            }, format)
        }
        img.src = url
    })
}

export function renameFile(file, newName) {
    const extension = file.name.split('.').pop()
    return new File([file], `${newName}.${extension}`, { type: file.type })
}