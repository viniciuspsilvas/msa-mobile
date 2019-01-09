import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    TOGLE_LOADING
} from './actions';

const initialState = {
    isLoading: true,
    error: null,
};

export default function loginReducer(state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {

        case TOGLE_LOADING:

            return Object.assign({}, state, { isLoading: payload? payload: !state.isLoading })

        case FETCH_LOGIN_BEGIN:
            return Object.assign({}, state, { isLoading: true })

        case FETCH_LOGIN_SUCCESS:
            return Object.assign({}, state, { isLoading: false })

        case FETCH_LOGIN_FAILURE:
            return Object.assign({}, state, { isLoading: false, error: payload })

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

