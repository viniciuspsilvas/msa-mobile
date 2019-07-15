import axios from 'axios';
import config from '../../../config/config'

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_UPDATED = 'FETCH_MESSAGE_UPDATED';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

// Action
export const fetchMessagesBegin = () => ({
    type: FETCH_MESSAGE_BEGIN
});

// Action
export const fetchMessagesSuccess = message => ({
    type: FETCH_MESSAGE_SUCCESS,
    payload: { message }
});

export const fetchMessagesFailure = error => ({
    type: FETCH_MESSAGE_FAILURE,
    payload: { error }
});

// Action creator
export function getMessagesList(userDetails) {

    const filter = { params: { filter: `{"where":{"studentId":"` + userDetails.id + `", "sentAt":{"neq":null }} , "order":"createdAt DESC"}` } }

    return dispatch => {
        dispatch(fetchMessagesBegin());

        return axios.get(config.backend.messages, filter)
            .then(({ data }) => {
                dispatch(fetchMessagesSuccess(data));
                return data;
            })
            .catch(error => dispatch(fetchMessagesFailure(error)));
    };
}

// Action creator
export function updateMessage(message) {

    return async dispatch => {
        try {
            dispatch({ type: FETCH_MESSAGE_BEGIN });
            console.log("### message", message)
            const { data } = await axios.put(config.backend.messages, message);

            dispatch({ type: FETCH_MESSAGE_UPDATED });
            return data.data

        } catch (error) {
            dispatch({ type: FETCH_MESSAGE_FAILURE, payload: error })
        }
    };
}
