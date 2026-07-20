import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import logger from '@/utilities/logger'

/**
 * Generic hook to fetch and manage dropdown options
 * Works with any API service that returns a list of items
 * 
 * @param {Function} fetchFunction - The async function to fetch data (e.g., getAllRoles, getAllDepartments)
 * @param {Object} config - Configuration object
 * @param {string} config.valueKey - The key to use for option value (default: 'id')
 * @param {string} config.labelKey - The key to use for option label (default: 'description')
 * @param {Function} config.transform - Optional transform function to modify items before converting
 * @param {string[]} config.includeFields - Optional array of field names to include as-is on each option object
 * 
 * @returns {object} - { options, loading, error }
 * 
 * @example
 * // Basic usage with default keys (id, name)
 * const { options: departments } = useFetchOptions(getAllDepartments)
 * 
 * @example
 * // With custom keys
 * const { options: roles } = useFetchOptions(getAllRoles, {
 *   valueKey: 'id',
 *   labelKey: 'description'
 * })
 * 
 * @example
 * // With transform function
 * const { options: employees } = useFetchOptions(getAllEmployees, {
 *   valueKey: 'empNo',
 *   labelKey: 'description',
 *   transform: (items) => items.filter(item => item.isActive)
 * })
 * 
 * @example
 * // With includeFields - adds extra fields to each option
 * const { options: employees } = useFetchOptions(getAllEmployees, {
 *   valueKey: 'empNo',
 *   labelKey: 'description',
 *   includeFields: ['departmentId', 'isActive']
 * })
 * // => [{ value: '001', label: 'John Doe', departmentId: 5, isActive: true }, ...]
 */
export const useFetchOptions = (fetchFunction, config = {}) => {
    const {
        valueKey = 'id',
        labelKey = 'description',
        transform = null,
        sort = true,
        labelAsValue = false,
        includeFields = []
    } = config

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true)
                setError(null)
                let result = await fetchFunction()

                if (result) {
                    // Apply transform if provided
                    if (transform && typeof transform === 'function') {
                        result = transform(result)
                    }

                    // sort by description
                    if (sort) {
                        result.sort((a, b) => {
                            const labelA = a[labelKey]?.toUpperCase() || ''
                            const labelB = b[labelKey]?.toUpperCase() || ''
                            if (labelA < labelB) return -1
                            if (labelA > labelB) return 1
                            return 0
                        })
                    }

                    // Convert to options format
                    const seen = new Set()
                    const optionsList = result.reduce((acc, item) => {
                        const value = item[labelAsValue ? labelKey : valueKey]
                        // we want unique values when labelAsValue is true to avoid duplicate options with same label and value
                        if (labelAsValue && seen.has(value)) return acc
                        seen.add(value)

                        const option = { value, label: item[labelKey] }

                        // Include additional fields as-is if specified
                        if (includeFields.length > 0) {
                            includeFields.forEach((field) => {
                                option[field] = item[field]
                            })
                        }

                        acc.push(option)
                        return acc
                    }, [])

                    setOptions(optionsList)
                } else {
                    setOptions([])
                }
            } catch (err) {
                logger.error('Error fetching options:', err.message)
                toast.error('Error fetching options: ' + (err?.message || 'Unknown error'))
                setOptions([])
            } finally {
                setLoading(false)
            }
        }

        fetchOptions()
    }, [])
    // TODO: bring this back if needed
    // }, [fetchFunction, valueKey, labelKey, transform])

    return { options, loading, error }
}