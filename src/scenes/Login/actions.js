import axios from 'axios';
import config from '../../../config/config'
import { AsyncStorage } from 'react-native';

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';
export const TOGLE_LOADING = 'TOGLE_LOADING';

export const GET_USER_LOGGED = 'GET_USER_LOGGED';
export const REMOVE_USER_LOGGED = 'REMOVE_USER_LOGGED';

export const loginMoodle = (userDetails) => (dispatch) => {

    dispatch(fetchLoginMoodlesBegin())

    return axios.post(config.backend.loginMoodle, { "userDetails": userDetails })

        .then(res => dispatch(fetchLoginMoodlesSuccess(res.data.return)))

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // Falha no servidor

                dispatch(fetchLoginMoodlesFailure(error.response.data.error.message))
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js

                // Falha na requisicao
                dispatch(fetchLoginMoodlesFailure(error.message))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('3333 Error', error.message);
            }

            console.log("### ERROR Login: ", error.config); // tratamento geral de erro
        });
}

// Action
export const fetchLoginMoodlesBegin = () => ({
    type: FETCH_LOGIN_BEGIN
});

// Action
export const fetchLoginMoodlesSuccess = userDetails => ({
    type: FETCH_LOGIN_SUCCESS,
    payload: userDetails
});

export const fetchLoginMoodlesFailure = error => ({
    type: FETCH_LOGIN_FAILURE,
    payload: { error }
});

export const togleLoading = (value) => (dispatch) => {
    dispatch({ type: TOGLE_LOADING, payload: value })
}

export const getUserDetails = () => dispatch =>

    AsyncStorage.getItem('userDetails')
        .then((userDetails) => {
            //dispatch({ type: TOGLE_LOADING, isLoading: false });
            const userDetailsParsed = JSON.parse(userDetails);
            dispatch({ type: GET_USER_LOGGED, userDetails: userDetailsParsed });
        })
        .catch((err) => {
            // dispatch({ type: TOGLE_LOADING, isLoading: false });
            dispatch(error(err.message || 'error'));
        })

export const removeUserDetails = () => dispatch =>
    AsyncStorage.removeItem('userDetails')
        .then((data) => {
            //dispatch(removeUserDetails(data));
            dispatch({ type: REMOVE_USER_LOGGED });

        })
        .catch((err) => {
            //dispatch({ type: TOGLE_LOADING, isLoading: false });
            dispatch(error(err.message || 'error'));
        })
