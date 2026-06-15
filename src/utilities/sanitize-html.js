const ALLOWED_TAGS = [
    'p', 'br', 'b', 'i', 'u', 'strong', 'em', 'a', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
    'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'hr', 'sub', 'sup', 'small', 'mark', 'del', 'ins'
]

const ALLOWED_ATTRIBUTES = {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
    '*': ['class', 'style']
}

function isAllowedAttribute(tagName, attrName) {
    const tagAllowed = ALLOWED_ATTRIBUTES[tagName.toLowerCase()]
    const globalAllowed = ALLOWED_ATTRIBUTES['*']

    if (globalAllowed && globalAllowed.includes(attrName.toLowerCase())) return true
    if (tagAllowed && tagAllowed.includes(attrName.toLowerCase())) return true

    return false
}

function sanitizeNode(node, doc) {
    if (node.nodeType === Node.TEXT_NODE) {
        return doc.importNode(node, false)
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const tagName = node.tagName.toLowerCase()

    if (!ALLOWED_TAGS.includes(tagName)) {
        const fragment = doc.createDocumentFragment()
        for (const child of Array.from(node.childNodes)) {
            const sanitizedChild = sanitizeNode(child, doc)
            if (sanitizedChild) fragment.appendChild(sanitizedChild)
        }
        return fragment
    }

    const cleanElement = doc.createElement(tagName)

    for (const attr of Array.from(node.attributes)) {
        if (!isAllowedAttribute(tagName, attr.name)) continue

        let value = attr.value

        if (attr.name.toLowerCase() === 'href' || attr.name.toLowerCase() === 'src') {
            if (value.trim().toLowerCase().startsWith('javascript:')) continue
            if (value.trim().toLowerCase().startsWith('data:') && tagName !== 'img') continue
        }

        if (attr.name.toLowerCase() === 'style') {
            value = value.replace(/expression\s*\(/gi, '').replace(/url\s*\(/gi, '')
        }

        cleanElement.setAttribute(attr.name, value)
    }

    if (tagName === 'a') {
        cleanElement.setAttribute('rel', 'noopener noreferrer')
    }

    for (const child of Array.from(node.childNodes)) {
        const sanitizedChild = sanitizeNode(child, doc)
        if (sanitizedChild) cleanElement.appendChild(sanitizedChild)
    }

    return cleanElement
}

function sanitizeHtml(dirtyHtml) {
    if (!dirtyHtml || typeof dirtyHtml !== 'string') return ''

    const parser = new DOMParser()
    const parsed = parser.parseFromString(dirtyHtml, 'text/html')
    const doc = document.implementation.createHTMLDocument('')
    const container = doc.createElement('div')

    for (const node of Array.from(parsed.body.childNodes)) {
        const sanitized = sanitizeNode(node, doc)
        if (sanitized) container.appendChild(sanitized)
    }

    return container.innerHTML
}

export default sanitizeHtml
