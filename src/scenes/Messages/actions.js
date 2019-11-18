import { axiosInstance } from 'msa-mobile/src/util/apiClient';

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_UPDATED = 'FETCH_MESSAGE_UPDATED';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

const GET_MESSAGES_BY_STUDENT =
    `query messagesSentByStudent($student : StudentInput!) {
            messagesSentByStudent(student : $student){
                _id
                title
                body
                createdAt
                isRead
            }
        }
    `
const SET_MESSAGE_READ = `
        mutation setMessageAsRead($_id:ID!) {
            setMessageAsRead (_id:$_id) {
            _id
            }
        }
    `

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
export function getMessagesList(student) {
    return async dispatch => {
        try {
            dispatch(fetchMessagesBegin());

            // fetch data from a url endpoint
            var { data } = await axiosInstance.post("", {
                query: GET_MESSAGES_BY_STUDENT,
                variables: {
                    student: { _id: student._id }
                }
            })


            // In case of error coming from server
            if (data.errors) throw data.errors[0];

            dispatch(fetchMessagesSuccess(data.data.messagesSentByStudent));
            return data.data.messagesSentByStudent;
        } catch (error) {
            dispatch(fetchMessagesFailure(error))
        }
    };
}

// Action creator
export function updateMessage(message, userDetails) {

    return async dispatch => {
        try {
            dispatch({ type: FETCH_MESSAGE_BEGIN });

            // fetch data from a url endpoint
            var { data } = await axiosInstance.post("", {
                query: SET_MESSAGE_READ,
                variables: {
                    _id: message._id
                }
            })

            getMessagesList(userDetails);
            dispatch({ type: FETCH_MESSAGE_UPDATED });

            return data.data

        } catch (error) {
            dispatch({ type: FETCH_MESSAGE_FAILURE, payload: error })
        }
    };
}
