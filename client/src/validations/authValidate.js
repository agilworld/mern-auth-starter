import _ from 'lodash'
import lang from '../langs'

export const loginValidate = (userData) => {
    return new Promise((resolve, reject) => {
        let output = {}

        if (_.isEmpty(userData.email)) {
            output.username = lang('required.email')
        }

        if (_.isEmpty(userData.password)) {
            output.password = lang('required.password')
        }

        if (_.isEmpty(output)) {
            resolve(userData)
        } else {
            reject(output)
        }
    })

}

export const registerValidate = (userData) => {
    return new Promise((resolve, reject) => {
        let output = {}

        if (_.isEmpty(userData.email)) {
            output.username = lang('required.email')
        }

        if (_.isEmpty(userData.password)) {
            output.password = lang('required.password')
        }

        if (_.isEmpty(userData.name)) {
            output.name = lang('required.name')
        }

        if (_.isEmpty(userData.password2)) {
            output.confirm_password = lang('required.confirm_password')
        }

        if (!_.isEmpty(userData.password) && !_.isEmpty(userData.password2)) {
            if (userData.password != userData.password2) {
                output.confirm_password = 'Password confirmation must be matched with password'
            }
        }

        if (_.isEmpty(output)) {
            resolve(userData)
        } else {
            reject(output)
        }
    })

}

