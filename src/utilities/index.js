export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function sortArray(array, ascending = true) {
    return array.sort((a, b) => {
        if (a < b) return ascending ? -1 : 1
        if (a > b) return ascending ? 1 : -1
        return 0
    })
}

export function formatArrayOfStringsAsSelectOptions(array) {
    return array.map(item => ({
        value: item,
        label: item
    }))
}

export function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Paginate an array based on page number and limit
 * @param {Array} array - The array to paginate
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {Object} - { data: paginatedArray, total: totalCount, page, limit, totalPages }
 */
export function paginateArray(array, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = array.slice(startIndex, endIndex)

    return {
        data: paginatedData,
        total: array.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(array.length / limit)
    }
}


export function isResultSuccessful(result) {
    return result && (result.status === 200 || result.status === 201 || result.success === true || result === 200 || (typeof result === 'string' && result.includes('success')))
}

export function convertBlankToEmptyString(array, key = 'description') {
    return array.map(item => ({
        ...item,
        [key]: item[key] === 'Blank' ? '' : item[key]
    }))
}

export function padZeroes(text, numOfZeros = 2) {
  return String(text).padStart(numOfZeros, "0");
}

export function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export function formatLabel(strings) {
    const specialCases = {
        firstname: 'first name',
        lastname: 'last name',
    }

    return strings
        .map(string => {
            const lower = string.toLowerCase()
            if (specialCases[lower]) return specialCases[lower]

            return string
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/_/g, ' ')
                .toLowerCase()
        })
        .join(', ')
}