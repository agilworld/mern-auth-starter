import { COMPLETE_FETCH_PROFILE, COMPLETE_UPDATE_PROFILE } from '../actions/types';

const initialState = null

export default function (state = initialState, action) {
    switch (action.type) {
        case COMPLETE_FETCH_PROFILE:
            return action.payload

        default:
            return state;
    }
}