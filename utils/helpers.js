const isEmpty = (value) => {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
}

const validationError = (err) => {
    return {
        error: true,
        messages: err
    }
}

module.exports = { isEmpty, validationError }