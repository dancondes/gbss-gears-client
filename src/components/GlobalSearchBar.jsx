import React, { useState, useRef, useEffect } from 'react'
import { useFormsMenuStore, useTabStore } from '@/store'
import PropTypes from 'prop-types'

function flattenMenu(menu, parent = []) {
    let items = []
    menu.forEach(item => {
        if (item.path) {
            const lastParent = parent[parent.length - 1]
            const nameParts = lastParent && lastParent === item.name 
                ? parent 
                : [...parent, item.name]
            items.push({
                name: nameParts.join(' / '),
                path: item.path,
                disabled: item.disabled || false,
            })
        }
        if (item.submenu) {
            items = items.concat(flattenMenu(item.submenu, [...parent, item.name]))
        }
    })
    return items
}

function flattenSidebarRecords(sidebarMenu) {
    // Only take the 'Records' section
    const recordsSection = sidebarMenu.find(section => section.title === 'Records')
    if (!recordsSection) return []
    return recordsSection.items.map(item => ({
        name: `Records / ${item.name}`,
        path: item.path,
        disabled: false,
    }))
}

function GlobalSearchBar({ onNavigate, autoFocus }) {
    const [query, setQuery] = useState('')
    const [activeIdx, setActiveIdx] = useState(0)
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)
    const resultsRef = useRef(null)
    const { openTab } = useTabStore()
    const menuItems = useFormsMenuStore(function (state) { return state.menuItems })
    const sidebarMenuItems = useFormsMenuStore(function (state) { return state.sidebarMenuItems })

    // Merge dynamic menu and sidebar links, then deduplicate by path
    const menuLinks = flattenMenu(menuItems)
    const sidebarLinks = flattenSidebarRecords(sidebarMenuItems)
    const allLinksMap = new Map()
    ;[...menuLinks, ...sidebarLinks].forEach(link => {
        if (link.path && !allLinksMap.has(link.path)) {
            allLinksMap.set(link.path, link)
        }
    })
    const allLinks = Array.from(allLinksMap.values())
    const filtered = (query === '' && open
        ? allLinks
        : allLinks.filter(link => link.name.toLowerCase().includes(query.toLowerCase()))
    )
    .filter(link => !link.disabled)

    useEffect(() => {
        setActiveIdx(0)
    }, [query, open])

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [autoFocus])

    useEffect(() => {
        if (resultsRef.current && open) {
            const activeElement = resultsRef.current.children[activeIdx]
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }
        }
    }, [activeIdx, open])

    const handleInput = e => {
        setQuery(e.target.value)
        setOpen(true)
    }

    const handleKeyDown = e => {
        if (!open) return
        if (e.key === 'ArrowDown') {
            setActiveIdx(idx => Math.min(idx + 1, filtered.length - 1))
        } else if (e.key === 'ArrowUp') {
            setActiveIdx(idx => Math.max(idx - 1, 0))
        } else if (e.key === 'Enter') {
            const selected = filtered[activeIdx]
            if (selected && !selected.disabled) {
                const tabId = selected.path.replace(/\//g, '-').substring(1)
                openTab({
                    id: tabId,
                    label: selected.name.split(' / ').pop(),
                    path: selected.path,
                })
                setOpen(false)
                setQuery('')
                inputRef.current?.blur()
                if (onNavigate) onNavigate()
            }
        } else if (e.key === 'Escape') {
            setOpen(false)
            inputRef.current?.blur()
        }
    }

    const handleResultClick = idx => {
        const selected = filtered[idx]
        if (selected && !selected.disabled) {
            const tabId = selected.path.replace(/\//g, '-').substring(1)
            openTab({
                id: tabId,
                label: selected.name.split(' / ').pop(),
                path: selected.path,
            })
            setOpen(false)
            setQuery('')
            inputRef.current?.blur()
            if (onNavigate) onNavigate()
        }
    }

    useEffect(() => {
        function onClickOutside(e) {
            if (
                inputRef.current && !inputRef.current.contains(e.target) &&
                resultsRef.current && !resultsRef.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    useEffect(() => {
        function handleGlobalKeyDown(e) {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handleGlobalKeyDown)
        return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [])

    return (
        <div className="relative w-full mx-0">
            <input
                ref={inputRef}
                type="text"
                className="w-full px-3 py-1.5 rounded border border-tertiary bg-white text-primary placeholder:text-gray-400 text-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                placeholder="Search pages..."
                value={query}
                onChange={handleInput}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                aria-label="Global navigation search"
                autoComplete="off"
                name="global-search"
            />
            {open && filtered.length > 0 && (
                <ul
                    ref={resultsRef}
                    className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-80 overflow-y-auto"
                >
                    {filtered.map((link, idx) => (
                        <li
                            key={link.path + link.name}
                            className={
                                `px-3 py-2 flex items-center gap-2 cursor-pointer select-none transition ` +
                                (idx === activeIdx ? 'bg-primary text-white' : 'hover:bg-gray-100') +
                                (link.disabled ? ' opacity-50 cursor-not-allowed' : '')
                            }
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => handleResultClick(idx)}
                            tabIndex={-1}
                            aria-disabled={link.disabled}
                        >
                            <span>{link.name}</span>
                            {link.disabled ? (
                                <span className="ml-auto text-xs text-gray-400">Restricted</span>
                            ) : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

GlobalSearchBar.propTypes = {
    onNavigate: PropTypes.func,
    autoFocus: PropTypes.bool,
}


export default React.memo(GlobalSearchBar)
