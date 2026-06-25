import { createContext, useContext } from 'react'

export const TabActiveContext = createContext(true)
export const TabPathContext = createContext('')

function useIsTabActive() {
    return useContext(TabActiveContext)
}

export function useTabPath() {
    return useContext(TabPathContext)
}

export default useIsTabActive
