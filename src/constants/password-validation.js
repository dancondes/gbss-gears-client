export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

export const PASSWORD_MIN_LENGTH = 8

export const PASSWORD_PATTERN_MESSAGE = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'

export const PASSWORD_MIN_LENGTH_MESSAGE = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`

export const PASSWORD_VALIDATION = {
    required: 'Password is required',
    minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: PASSWORD_MIN_LENGTH_MESSAGE
    },
    pattern: {
        value: PASSWORD_PATTERN,
        message: PASSWORD_PATTERN_MESSAGE
    }
}

// PIN
export const MAX_PIN_LENGTH = 10

export const PIN_PATTERN = /^.{4,10}$/

export const PIN_PATTERN_MESSAGE = 'PIN must be 4 to 10 characters long'