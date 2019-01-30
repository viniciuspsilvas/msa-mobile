import axios from 'axios';
import config from '../../config/config'
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
        .then(res => dispatch(fetchLoginMoodlesSuccess(res)))
        .catch(err => dispatch(fetchLoginMoodlesFailure(err)));
}

// Action
export const fetchLoginMoodlesBegin = () => ({
    type: FETCH_LOGIN_BEGIN
});

// Action
export const fetchLoginMoodlesSuccess = userDetails => ({
    type: FETCH_LOGIN_SUCCESS,
    userDetails
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
