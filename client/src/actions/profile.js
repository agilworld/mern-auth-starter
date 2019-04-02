
import _ from 'lodash'
import rest from '../utils/rest'
import config from '../config'
import {
    GET_ERRORS,
    FETCH_PROFILE,
    COMPLETE_FETCH_PROFILE,
    COMPLETE_UPDATE_PROFILE,
} from './types';


// Register new user
export const fetchProfile = () => dispatch => {
    const promise = new Promise((resolve, reject) => {
        return rest()
            .get('current')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })

    dispatch({
        type: FETCH_PROFILE,
        promise: promise.then(function (res) {
            dispatch({
                type: COMPLETE_FETCH_PROFILE,
                payload: res
            })
        })
    })

};