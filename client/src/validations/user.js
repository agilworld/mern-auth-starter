import _ from 'lodash'
import lang from '../langs'
import { validateEmail } from '../utils/helpers'

export const updateProfileValidate = (userData) => {
    return new Promise((resolve, reject) => {
        let output = {}

        if (_.isEmpty(userData.name)) {
            output.name = lang('required.name')
        }

        if (_.isEmpty(userData.email)) {
            output.email = lang('required.email')
        } else {
            if (!validateEmail(userData.email)) {
                // output.email = 'Alamat email tidak valid'
            }
        }


        if (_.isEmpty(output)) {
            resolve(userData)
        } else {
            reject(output)
        }
    })

}
