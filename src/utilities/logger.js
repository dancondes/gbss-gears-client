/* eslint-disable no-console */
const IS_DEVELOPMENT = import.meta.env.DEV

function log(...args) {
    if (IS_DEVELOPMENT) {
        console.log(...args)
    }
}

function error(...args) {
    if (IS_DEVELOPMENT) {
        console.error(...args)
    }
}

function warn(...args) {
    if (IS_DEVELOPMENT) {
        console.warn(...args)
    }
}

function info(...args) {
    if (IS_DEVELOPMENT) {
        console.info(...args)
    }
}

const logger = { log, error, warn, info }

export default logger
