/**
 * ua-parser.js
 * A small, dependency-free User-Agent parser for the browser.
 *
 * Covers: browser name/version, engine, OS name/version, device type.
 * Not exhaustive (doesn't cover every obscure UA in the wild the way
 * ua-parser-js does), but handles the vast majority of real traffic:
 * Chrome, Edge, Firefox, Safari, Opera, Samsung Internet, plus
 * Windows/macOS/Linux/Android/iOS detection and mobile/tablet flags.
 */

export function parseUserAgent(uaString) {
    const ua = uaString || (typeof navigator !== 'undefined' ? navigator.userAgent : '');

    const result = {
        browser: { name: null, version: null },
        engine: { name: null, version: null },
        os: { name: null, version: null },
        device: { type: 'desktop', vendor: null, model: null },
    };

    // ---- Browser detection (order matters: check specific before generic) ----
    const browserPatterns = [
        { name: 'Edge', regex: /Edg(?:A|iOS)?\/([\d.]+)/ },
        { name: 'Opera', regex: /(?:Opera|OPR)\/([\d.]+)/ },
        { name: 'Samsung Internet', regex: /SamsungBrowser\/([\d.]+)/ },
        { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
        { name: 'Chrome', regex: /(?:Chrome|CriOS)\/([\d.]+)/ },
        { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
        { name: 'IE', regex: /(?:MSIE |rv:)([\d.]+).*Trident/ },
    ];

    for (const { name, regex } of browserPatterns) {
        const match = ua.match(regex);
        if (match) {
            result.browser.name = name;
            result.browser.version = match[1];
            break;
        }
    }

    // ---- Engine detection ----
    if (/Gecko\/[\d.]+/.test(ua) && result.browser.name === 'Firefox') {
        result.engine.name = 'Gecko';
    } else if (/AppleWebKit\/([\d.]+)/.test(ua)) {
        const m = ua.match(/AppleWebKit\/([\d.]+)/);
        // Blink-based browsers still report AppleWebKit, so refine further
        result.engine.name = /Chrome|Edg|OPR|SamsungBrowser/.test(ua) ? 'Blink' : 'WebKit';
        result.engine.version = m[1];
    } else if (/Trident\/([\d.]+)/.test(ua)) {
        result.engine.name = 'Trident';
        result.engine.version = ua.match(/Trident\/([\d.]+)/)[1];
    }

    // ---- OS detection ----
    const osPatterns = [
        { name: 'Windows', regex: /Windows NT ([\d.]+)/, map: winVersionMap },
        { name: 'macOS', regex: /Mac OS X ([\d_]+)/, transform: (v) => v.replace(/_/g, '.') },
        { name: 'iOS', regex: /OS ([\d_]+) like Mac OS X/, transform: (v) => v.replace(/_/g, '.') },
        { name: 'Android', regex: /Android ([\d.]+)/ },
        { name: 'Linux', regex: /(Linux)/, versionless: true },
        { name: 'Chrome OS', regex: /CrOS [\w]+ ([\d.]+)/ },
    ];

    for (const p of osPatterns) {
        const match = ua.match(p.regex);
        if (match) {
            result.os.name = p.name;
            if (!p.versionless) {
                let v = match[1];
                if (p.transform) v = p.transform(v);
                if (p.map) v = p.map(v) || v;
                result.os.version = v;
            }
            break;
        }
    }

    // ---- Device type detection ----
    // Since iPadOS 13, Safari sends a UA string identical to desktop macOS
    // Safari (no "iPad" or "Mobile" token), so the string alone can't tell
    // a real Mac from an iPad. When we're parsing the current device (no
    // explicit uaString override was passed in), fall back to touch-point
    // capability: a real Mac always reports 0, any touch-capable device
    // reports > 0 (real iPads report 5; some emulators/browsers report 1).
    const isTouchMac =
        !uaString &&
        /Macintosh/.test(ua) &&
        typeof navigator !== 'undefined' &&
        navigator.maxTouchPoints > 0;

    if (/iPad/.test(ua) || (/Macintosh/.test(ua) && /Mobile/.test(ua)) || isTouchMac) {
        result.device.type = 'tablet';
        result.device.vendor = 'Apple';
    } else if (/iPhone|iPod/.test(ua)) {
        result.device.type = 'mobile';
        result.device.vendor = 'Apple';
    } else if (/Android/.test(ua)) {
        result.device.type = /Mobile/.test(ua) ? 'mobile' : 'tablet';
        result.device.vendor = 'Google';
    } else if (/Tablet|PlayBook|Silk/.test(ua)) {
        result.device.type = 'tablet';
    } else if (/Mobile|Windows Phone/.test(ua)) {
        result.device.type = 'mobile';
    }

    return result;
}

// Optional helper: map raw Windows NT version to marketing name
function winVersionMap(v) {
    const map = {
        '10.0': '10/11', // NT 10.0 covers both Win10 and Win11 (no reliable UA distinction)
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista',
        '5.1': 'XP',
    };
    return map[v];
}

export function isDesktop() {
    const result = parseUserAgent();
    if (!result) return false;

    // Must match the exact strings parseUserAgent() actually produces
    // (see the `name:` values in osPatterns above).
    const desktopOS = [
        "Windows",
        "macOS",
        "Linux",
        "Chrome OS"
    ];

    const mobileOS = [
        "Android",
        "iOS"
    ];

    // parseUserAgent() defaults device.type to 'desktop' and only overrides
    // it to 'mobile' or 'tablet' when it detects one, so 'desktop' (plus
    // the empty/unset values, for safety with other parsers) counts as desktop.
    const desktopDeviceTypes = [
        "desktop",
        undefined,
        null,
        ""
    ];

    const mobileDeviceTypes = [
        "mobile",
        "tablet",
        "smarttv",
        "console",
        "wearable",
        "embedded"
    ];

    // Explicitly reject known mobile OSes.
    if (mobileOS.includes(result.os?.name)) {
        return false;
    }

    // Explicitly reject known non-desktop device types.
    if (mobileDeviceTypes.includes(result.device?.type)) {
        return false;
    }

    // Allow only known desktop OSes with a desktop (or unset) device type.
    return (
        desktopOS.includes(result.os?.name) &&
        desktopDeviceTypes.includes(result.device?.type)
    );
}

// ---- Usage ----
// const info = parseUserAgent(); // uses navigator.userAgent
// const info = parseUserAgent(someUaString); // parse an arbitrary string
// console.log(info);
// {
//   browser: { name: 'Chrome', version: '128.0.0.0' },
//   engine: { name: 'Blink', version: '537.36' },
//   os: { name: 'Windows', version: '10/11' },
//   device: { type: 'desktop', vendor: null, model: null }
// }