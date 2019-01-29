
const initialState = {
    userDetails: {},
    isLoading: true,
    error: null,
};

export default function mainReducer(state = initialState, action = {}) {
    const { type, userDetails, isLoading } = action;

    switch (type) {
            case 'GET_USER_LOGGED':
                return { ...state, userDetails };
            case 'SAVE_USER_LOGGED':
                return { ...state, userDetails };
            case 'REMOVE_USER_LOGGED':
                return { ...state, userDetails };
            case 'LOADING':
                return { ...state, isLoading: isLoading };
            case 'ERROR':
                return { ...state, error: error };
            default:
                return state;
    }
}