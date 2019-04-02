import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import rest from '../utils/rest'
import config from '../config'
import { cacheStore } from '../utils/helpers'
import {
    setAuthToken,
    beforeRequest,
    beforeResponse
} from '../utils/helpers'
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_CURRENT_PROFILE,
    COMPLETE_REGISTER
} from './types';

// Login - Get User Token
export const loginUser = userData => dispatch => {
    dispatch(beforeRequest())

    return new Promise((resolve, reject) => {
        let decoded;
        rest()
            .post('login', userData)
            .then(res => {
                // Save to localStorage
                const {
                    token,
                    success
                } = res.data;
                // Set token to ls
                cacheStore().setItem(config.tokenKey, token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get user data
                decoded = jwtDecode(token);
                // Set current user
                dispatch(setCurrentUser(decoded))

                resolve(res)
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response ? err.response : err
                })
                reject(err)
            })
            .then(function () {
                dispatch(beforeResponse())
            })
    });

};


// Register new user
export const registerUser = userData => dispatch => {
    dispatch(beforeRequest())
    return new Promise((resolve, reject) => {
        rest()
            .post('register', userData)
            .then(res => {
                // Set current user
                dispatch({
                    type: COMPLETE_REGISTER
                })

                resolve(res)
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response ? err.response : err
                })
                reject(err)
            })
            .then(function () {
                dispatch(beforeResponse())
            })
    });

};

// Set logged in user
export const setCurrentUser = (decoded = {}) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    dispatch(beforeRequest())
    // Remove token from sessionStorage
    cacheStore().removeItem(config.tokenKey);
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser());
    dispatch(beforeResponse())
};