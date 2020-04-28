import { axiosInstance } from 'msa-mobile/src/util/apiClient';

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_UPDATED = 'FETCH_MESSAGE_UPDATED';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

const GET_MESSAGES_BY_STUDENT =
    `query messagesSentByStudent($student : StudentInput!) {
            messagesSentByStudent(student : $student){
                id
                title
                body
                createdAt
                read
            }
        }
    `
const SET_MESSAGE_READ = `
        mutation updateMessage( $message: MessageInput!) {
            updateMessage (message: $message)
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
            var { data } = await axiosInstance.post("/graphql", {
                query: GET_MESSAGES_BY_STUDENT,
                variables: {
                    student: { id: student.id }
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
            var { data } = await axiosInstance.post("/graphql", {
                query: SET_MESSAGE_READ,
                variables: {
                    message: {
                        id: message.id,
                        read: true
                    }
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
