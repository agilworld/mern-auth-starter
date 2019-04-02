const validator = require('validator')
const helper = require('../utils/helpers')

module.exports = validateLoginInput = (data) => {
    let errors = {}

    data.email = !helper.isEmpty(data.email) ? data.email : '';
    data.password = !helper.isEmpty(data.password) ? data.password : '';

    if (validator.isEmpty(data.email)) {
        errors.email = "Email address is required"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: helper.isEmpty(errors)
    }

}