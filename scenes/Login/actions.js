import axios from 'axios';
import config from '../../config/config'

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const TOGLE_LOADING = 'TOGLE_LOADING';

export const loginMoodle = (credential) => (dispatch) => {

    console.log(333, credential)

    dispatch({ type: FETCH_LOGIN_BEGIN })
    axios.post(config.backend.loginMoodle, { "credencial": credential })
        .then(res => { dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res }) })
        .catch(err => dispatch({ type: FETCH_LOGIN_FAILURE, payload: err }));

}

export const togleLoading = (value) => (dispatch) => {
    dispatch({ type: TOGLE_LOADING, payload: value })
}

