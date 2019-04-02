import { MODAL_SHOW, MODAL_HIDE, MODAL_BUTTON_LOADING_START, MODAL_BUTTON_LOADING_END } from '../actions/types';

const initialState = {
    state: false,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MODAL_SHOW:
            return {
                state: true
            };
        case MODAL_HIDE:
            return {
                state: false
            };
        case MODAL_BUTTON_LOADING_START:
            return {
                state: true,
                loading: true
            }
        case MODAL_BUTTON_LOADING_END:
            return {
                state: true,
                loading: false
            }
        default:
            return state;
    }
}