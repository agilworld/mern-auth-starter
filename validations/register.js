const validator = require('validator')
const helper = require('../utils/helpers')

module.exports = validateRegisterInput = (data) => {
    let errors = {}

    data.name = !helper.isEmpty(data.name) ? data.name : '';
    data.email = !helper.isEmpty(data.email) ? data.email : '';
    data.password = !helper.isEmpty(data.password) ? data.password : '';
    data.password2 = !helper.isEmpty(data.password2) ? data.password2 : '';

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

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: helper.isEmpty(errors)
    }

}