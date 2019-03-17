import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    TOGLE_LOADING,
    GET_USER_LOGGED,
    REMOVE_USER_LOGGED

} from './actions';

const initialState = {
    isLoading: false,
    error: null,
    userDetails: {}
};

export default function loginReducer(state = initialState, action = {}) {
    const { type, payload, userDetails } = action;

    switch (type) {

        case TOGLE_LOADING:
            return { ...state, isLoading: payload ? payload : !state.isLoading };

        case FETCH_LOGIN_BEGIN:
            return { ...state, isLoading: true };

        case FETCH_LOGIN_SUCCESS:
            return { ...state, isLoading: false, userDetails: payload };

        case FETCH_LOGIN_FAILURE:
            return { ...state, isLoading: false, error: payload };

        case GET_USER_LOGGED:
            return { ...state, userDetails };

        case REMOVE_USER_LOGGED:
            return { ...state, userDetails : {}};

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
