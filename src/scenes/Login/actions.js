import axios from 'axios';
import config from '../../../config/config'

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginMoodle =  (userDetails) => async (dispatch) => {

    dispatch({ type: FETCH_LOGIN_BEGIN })

    try {
        let resp = await axios.post(config.backend.loginMoodle, { "userDetails": userDetails });
        const { email, firstname, fullname, id, lastname, phone, username } = await resp.data.return;

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
    } catch (error) {
        dispatch({ type: FETCH_LOGIN_FAILURE, payload: error })
        throw error;
    }

}

export const logout = () => dispatch => dispatch({ type: LOGOUT });