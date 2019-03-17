import {
    FETCH_MESSAGE_BEGIN,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_FAILURE,

} from './actions';

const initialState = {

    messagesList: [],

    isLoading: false,
    error: null,
};

export default function messagesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_MESSAGE_BEGIN:
            return { ...state, isLoading: true, error: null };
        case FETCH_MESSAGE_SUCCESS:
            return { ...state, isLoading: false, messagesList: payload };
        case FETCH_MESSAGE_FAILURE:
            return { ...state, isLoading: false, error: payload.error, messagesList: [] };

        default:
            return state;
    }
}