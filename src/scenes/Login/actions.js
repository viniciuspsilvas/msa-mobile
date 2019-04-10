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

    dispatch({ type: FETCH_LOGIN_BEGIN })

    return axios.post(config.backend.loginMoodle, { "userDetails": userDetails })

        .then(resp => {
            const { email, firstname, fullname, id, lastname, phone, username } = resp.data.return;

            const userDetailLogged = {
                tokenAdvice: userDetails.tokenAdvice,
                adviceDesc: userDetails.adviceDesc,
                email, firstname, fullname, id, lastname, phone, username
            }


            dispatch(
                // TODO Send the userDetail from the action. ATM I`m not sure in this ACTION is the best
                // place to do it.
                {
                    type: FETCH_LOGIN_SUCCESS,
                    payload: userDetailLogged
                })
        })
        .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE, payload: error }))
}

export const togleLoading = (value) => (dispatch) => {
    dispatch({ type: TOGLE_LOADING, payload: value })
}

export const getUserDetails = () => dispatch =>

    AsyncStorage.getItem('userDetails')
        .then((userDetails) => {
            //dispatch({ type: TOGLE_LOADING, isLoading: false });

            if (userDetails) {
                const userDetailsParsed = JSON.parse(userDetails);
                dispatch({ type: GET_USER_LOGGED, payload: userDetailsParsed });
            }
        })
        .catch((err) => {
            console.log(err)
            // dispatch({ type: TOGLE_LOADING, isLoading: false });
            //dispatch(error(err.message || 'error'));
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
