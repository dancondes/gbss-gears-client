function winVersionMap(version) {
    const map = {
        '10.0': '10/11',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista',
        '5.1': 'XP',
    }

    return map[version]
}

export function parseUserAgent(uaString) {
    const ua = uaString || (typeof navigator !== 'undefined' ? navigator.userAgent : '')

    const result = {
        browser: { name: null, version: null },
        engine: { name: null, version: null },
        os: { name: null, version: null },
        device: { type: 'desktop', vendor: null, model: null },
    }

    const browserPatterns = [
        { name: 'Edge', regex: /Edg(?:A|iOS)?\/([\d.]+)/ },
        { name: 'Opera', regex: /(?:Opera|OPR)\/([\d.]+)/ },
        { name: 'Samsung Internet', regex: /SamsungBrowser\/([\d.]+)/ },
        { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
        { name: 'Chrome', regex: /(?:Chrome|CriOS)\/([\d.]+)/ },
        { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
        { name: 'IE', regex: /(?:MSIE |rv:)([\d.]+).*Trident/ },
    ]

    for (const { name, regex } of browserPatterns) {
        const match = ua.match(regex)
        if (match) {
            result.browser.name = name
            result.browser.version = match[1]
            break
        }
    }

    if (/Gecko\/[\d.]+/.test(ua) && result.browser.name === 'Firefox') {
        result.engine.name = 'Gecko'
    } else if (/AppleWebKit\/([\d.]+)/.test(ua)) {
        const match = ua.match(/AppleWebKit\/([\d.]+)/)
        result.engine.name = /Chrome|Edg|OPR|SamsungBrowser/.test(ua) ? 'Blink' : 'WebKit'
        result.engine.version = match[1]
    } else if (/Trident\/([\d.]+)/.test(ua)) {
        result.engine.name = 'Trident'
        result.engine.version = ua.match(/Trident\/([\d.]+)/)[1]
    }

    const osPatterns = [
        { name: 'Windows', regex: /Windows NT ([\d.]+)/, map: winVersionMap },
        { name: 'macOS', regex: /Mac OS X ([\d_]+)/, transform: (value) => value.replace(/_/g, '.') },
        { name: 'iOS', regex: /OS ([\d_]+) like Mac OS X/, transform: (value) => value.replace(/_/g, '.') },
        { name: 'Android', regex: /Android ([\d.]+)/ },
        { name: 'Linux', regex: /(Linux)/, versionless: true },
        { name: 'Chrome OS', regex: /CrOS [\w]+ ([\d.]+)/ },
    ]

    for (const pattern of osPatterns) {
        const match = ua.match(pattern.regex)
        if (match) {
            result.os.name = pattern.name
            if (!pattern.versionless) {
                let value = match[1]
                if (pattern.transform) {
                    value = pattern.transform(value)
                }
                if (pattern.map) {
                    value = pattern.map(value) || value
                }
                result.os.version = value
            }
            break
        }
    }

    const isTouchMac =
        !uaString &&
        /Macintosh/.test(ua) &&
        typeof navigator !== 'undefined' &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 0

    if (/iPad/.test(ua) || (/Macintosh/.test(ua) && /Mobile/.test(ua)) || isTouchMac) {
        result.device.type = 'tablet'
        result.device.vendor = 'Apple'
    } else if (/iPhone|iPod/.test(ua)) {
        result.device.type = 'mobile'
        result.device.vendor = 'Apple'
    } else if (/Android/.test(ua)) {
        result.device.type = /Mobile/.test(ua) ? 'mobile' : 'tablet'
        result.device.vendor = 'Google'
    } else if (/Tablet|PlayBook|Silk/.test(ua)) {
        result.device.type = 'tablet'
    } else if (/Mobile|Windows Phone/.test(ua)) {
        result.device.type = 'mobile'
    }

    return result
}

export function isDesktop() {
    if (typeof navigator === 'undefined') {
        return false
    }

    const result = parseUserAgent()

    if (!result) {
        return false
    }

    const desktopOS = ['Windows', 'macOS', 'Linux', 'Chrome OS']
    const mobileOS = ['Android', 'iOS']
    const desktopDeviceTypes = ['desktop', undefined, null, '']
    const mobileDeviceTypes = ['mobile', 'tablet', 'smarttv', 'console', 'wearable', 'embedded']

    if (mobileOS.includes(result.os?.name)) {
        return false
    }

    if (mobileDeviceTypes.includes(result.device?.type)) {
        return false
    }

    return desktopOS.includes(result.os?.name) && desktopDeviceTypes.includes(result.device?.type)
}

export default parseUserAgent
