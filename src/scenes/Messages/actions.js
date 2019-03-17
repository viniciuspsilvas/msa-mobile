import axios from 'axios';
import config from '../../../config/config'

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
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

    const filter = { params: { filter: `{"where":{"studentId":"` + userDetails.id + `"} , "order":"createdAt DESC"}` } }


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