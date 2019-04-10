import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    TOGLE_LOADING,
    GET_USER_LOGGED,
    REMOVE_USER_LOGGED

} from './actions';

import { AsyncStorage } from 'react-native';

const initialState = {
    isFetching: false,
    error: null,

    isAuthenticated: false,
    userDetails: {
        token: {}
    },
};

export default function loginReducer(state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {

        case TOGLE_LOADING:
            return { ...state, isFetching: payload ? payload : !state.isFetching };

        case FETCH_LOGIN_BEGIN:
            return { ...state, isFetching: true };

        case FETCH_LOGIN_SUCCESS:

            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                userDetails: payload,
                error: null
            };

        case FETCH_LOGIN_FAILURE:

            let error;

            if (!payload.response) {
                error = "Network failure."
            } else {

                const status = payload.response.status
                if ((status >= 500 && status <= 599)) {
                    error = "Network failure."
                } else if (status >= 400 && status <= 499) {
                    error = "Login/password invalid."
                } else {
                    error = "Unknown failure."
                }
            }

            return { ...state, isFetching: false, error, userDetails: {} };

        case GET_USER_LOGGED:
            return { ...state, userDetails: payload };

        case REMOVE_USER_LOGGED:
            return { ...state, userDetails: {} };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
