import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import loaderReducer from './loader'
import modalReducer from './modal'
import formLoaderReducer from './formLoader'
import profileReducer from './profileReducer'


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    loadingBar: loadingBarReducer,
    loadingRequest: loaderReducer,
    modal: modalReducer,
    formLoader: formLoaderReducer,
    profile: profileReducer
});
