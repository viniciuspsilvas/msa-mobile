import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    LOGOUT

} from './actions';

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

        case FETCH_LOGIN_BEGIN:
            return { ...state, isFetching: true, error: null };

        case FETCH_LOGIN_SUCCESS:

            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                userDetails: payload,
                error: null
            };

        case FETCH_LOGIN_FAILURE:

            //let error = handleErrors(payload.response);
            return { ...state, isFetching: false, error: payload, userDetails: {} };

        case LOGOUT:
            return { ...state, userDetails: {}, isAuthenticated: false, isFetching: false, error: null };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}


/**
 * Handle the erros as network and login.
 */
handleErrors = (response) => {
    if (!response) {
        return "Network failure."
    } else {

        const status = response.status;

        if (status == 503) {
            return "Service Unavailable."
        } else if (status >= 500 && status <= 599) {
            return "Network failure."
        } else if (status >= 400 && status <= 499) {
            return "Login/password invalid."
        } else {
            return "Unknown failure."
        }
    }
}