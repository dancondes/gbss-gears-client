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
        { name: 'Firefox', regex: /(?:Firefox|FxiOS)\/([\d.]+)/ },
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

    if (/Gecko\/[\d.]+/.test(ua) && result.browser.name === 'Firefox' && !/FxiOS/.test(ua)) {
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
        { name: 'Chrome OS', regex: /CrOS [\w]+ ([\d.]+)/ },
        { name: 'Linux', regex: /(Linux)/, versionless: true },
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

    // iPadOS 13+ reports a Macintosh UA; real Macs have no touch screen.
    // Only checkable in the browser, since it relies on the live navigator.
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
        // Android phones include "Mobile" in the UA; tablets do not.
        // Vendor is unknown (Samsung, Google, Xiaomi, ...), so leave it null.
        result.device.type = /Mobile/.test(ua) ? 'mobile' : 'tablet'
    } else if (/Tablet|PlayBook|Silk/.test(ua)) {
        result.device.type = 'tablet'
    } else if (/Mobile|Windows Phone/.test(ua)) {
        result.device.type = 'mobile'
    }

    return result
}

/**
 * Hardware-based phone check that ignores the UA string, so it still works
 * when a phone is in "Request desktop site" mode (which sends a desktop UA
 * and a desktop-sized viewport). screen.width/height stay at the physical
 * device size in that mode, and the primary input is still touch.
 * Browser-only; returns false on the server.
 */
export function looksLikeTouchFirstDevice() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false
    }

    const hasTouch = navigator.maxTouchPoints > 0
    const coarsePointer = !!window.matchMedia?.('(pointer: coarse)').matches
    const noHover = !!window.matchMedia?.('(hover: none)').matches

    // Phones and tablets: touch is the PRIMARY input (coarse pointer, no hover).
    // Touchscreen laptops have a trackpad/mouse as primary (fine pointer + hover),
    // so they are not matched. Works regardless of screen size or UA.
    return hasTouch && (coarsePointer || noHover)
}

export function looksLikePhoneHardware() {
    if (!looksLikeTouchFirstDevice()) {
        return false
    }

    return Math.min(window.screen.width, window.screen.height) < 600
}

/**
 * True when the device is a phone (not a tablet, TV, console, or desktop).
 *
 * Pass a UA string to parse server-side. Without one, uses the live browser:
 * Chromium's `userAgentData.mobile` hint is checked first because it stays
 * accurate when the UA string is reduced. Note it is also true on some
 * Android tablets, so it is only used to confirm a phone when the UA agrees
 * it is not a tablet.
 */
export function isMobilePhone(uaString) {
    if (!uaString && typeof navigator === 'undefined') {
        return false
    }

    const { device } = parseUserAgent(uaString)

    if (device.type === 'mobile') {
        return true
    }

    if (device.type === 'tablet') {
        return false
    }

    // UA looked like a desktop (e.g. "Request desktop site" on Android):
    // fall back to the Chromium hint when available.
    if (!uaString && navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
        if (navigator.userAgentData.mobile) {
            return true
        }
    }

    // Desktop mode on a phone: UA and client hints both say "desktop",
    // so fall back to the physical screen and input type.
    return !uaString && looksLikePhoneHardware()
}

export function isDesktop() {
    if (typeof navigator === 'undefined') {
        return false
    }

    const result = parseUserAgent()

    // Phones/tablets in "Request desktop site" mode look like a desktop by UA,
    // so also reject any touch-first device regardless of screen size.
    if (looksLikeTouchFirstDevice()) {
        return false
    }

    // Chromium client hint: deny-only. It can say "mobile", but a `false`
    // is never trusted as proof of a desktop.
    if (navigator.userAgentData?.mobile === true) {
        return false
    }

    const desktopOS = ['Windows', 'macOS', 'Linux', 'Chrome OS']

    // Require a recognized desktop OS AND a desktop device classification.
    // (parseUserAgent always sets device.type, defaulting to 'desktop'.)
    return desktopOS.includes(result.os?.name) && result.device?.type === 'desktop'
}

/**
 * Raw signals behind the desktop/phone decision, for logging and for testing
 * on real devices ("why was this device blocked?"). Not for making decisions.
 */
export function getDeviceDiagnostics() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return null
    }

    const mq = (query) => !!window.matchMedia?.(query).matches
    const parsed = parseUserAgent()

    return {
        userAgent: navigator.userAgent,
        os: parsed.os.name,
        deviceType: parsed.device.type,
        maxTouchPoints: navigator.maxTouchPoints,
        pointerCoarse: mq('(pointer: coarse)'),
        pointerFine: mq('(pointer: fine)'),
        hoverHover: mq('(hover: hover)'),
        hoverNone: mq('(hover: none)'),
        anyPointerFine: mq('(any-pointer: fine)'),
        screen: { width: window.screen.width, height: window.screen.height },
        uaDataMobile: navigator.userAgentData?.mobile ?? null,
        touchFirst: looksLikeTouchFirstDevice(),
        isDesktop: isDesktop(),
        isMobilePhone: isMobilePhone(),
    }
}

export default parseUserAgent