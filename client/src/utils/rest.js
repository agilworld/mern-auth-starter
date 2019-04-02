import axios from 'axios'
import config from '../config'
import { cacheStore } from './helpers'

const getApiUrl = () => {
    return process.env.REACT_APP_API_URL
}

const rest = () => {
    let prepare = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }

    if (cacheStore().getItem(config.tokenKey)) {
        prepare.Authorization = cacheStore().getItem(config.tokenKey)
    }

    return axios.create({
        baseURL: getApiUrl(),
        // `headers` are custom headers to be sent
        headers: prepare
    })
}

export const restForm = (bodyFormData) => {

    return axios.create({
        baseURL: getApiUrl(),
        // `headers` are custom headers to be sent
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
            'Authorization': cacheStore().getItem(config.tokenKey)
        }
    })
}

export default rest;