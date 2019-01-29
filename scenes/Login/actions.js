import axios from 'axios';
import config from '../../config/config'

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const TOGLE_LOADING = 'TOGLE_LOADING';

export const loginMoodle = (userDetails) => (dispatch) => {

    dispatch(fetchLoginMoodlesBegin())
    return axios.post(config.backend.loginMoodle, { "userDetails": userDetails })
        .then(res =>  dispatch(fetchLoginMoodlesSuccess(res)))
        .catch(err => dispatch(fetchLoginMoodlesFailure(err)));

}

// Action
export const fetchLoginMoodlesBegin = () => ({
    type: FETCH_LOGIN_BEGIN
});

// Action
export const fetchLoginMoodlesSuccess = credential => ({
    type: FETCH_LOGIN_SUCCESS,
    payload: { credential }
});

export const fetchLoginMoodlesFailure = error => ({
    type: FETCH_LOGIN_FAILURE,
    payload: { error }
});

export const togleLoading = (value) => (dispatch) => {
    dispatch({ type: TOGLE_LOADING, payload: value })
}

