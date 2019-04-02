const validator = require('validator')
const helper = require('../utils/helpers')

module.exports = validateProfileInput = (data) => {
    let errors = {}

    data.email = !helper.isEmpty(data.email) ? data.email : '';
    data.name = !helper.isEmpty(data.name) ? data.name : '';
    data.address = !helper.isEmpty(data.address) ? data.address : '';
    data.avatar = !helper.isEmpty(data.avatar) ? data.avatar : '';

    if (!validator.isLength(data.name, { min: 2, max: 20 })) {
        errors.name = "Name must be between min 2 chars and max 20 chars"
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email address is required"
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email address is invalid"
    }

    return {
        errors,
        isValid: helper.isEmpty(errors)
    }

}