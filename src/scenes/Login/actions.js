import { axiosInstance } from 'msa-mobile/src/util/apiClient';

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const LOGIN_STUDENT = `
    mutation loginStudent($loginInput : LoginInput!) {
        loginStudent(loginInput : $loginInput){
            token
            student{
                _id
                email
                fullname
                firstname
                lastname
                phone
                isActive
            }
        }
    }
`

const LOGOUT_STUDENT = `
    mutation logoutStudent($_id : ID!) {
        logoutStudent (_id: $_id)
    }
`

export const loginMobile = loginInput => async dispatch => {
    dispatch({ type: FETCH_LOGIN_BEGIN })

    try {
        const resp = await axiosInstance.post("/graphql", {
            query: LOGIN_STUDENT,
            variables: { loginInput }
        })

        // In case of error coming from server
        if (resp.data.errors) throw resp.data.errors[0];

        const { loginStudent } = resp.data.data;

        const userDetailLogged = {
            ...loginStudent.student,
            token: loginStudent.token
        }

        dispatch(
            {
                type: FETCH_LOGIN_SUCCESS,
                payload: userDetailLogged
            })

        return userDetailLogged;

    } catch (error) {
        dispatch({ type: FETCH_LOGIN_FAILURE, payload: error.message })
        throw new Error(error.message);
    }
}

export const logout = _id => async dispatch => {
    dispatch({ type: LOGOUT })

    try {
        const resp = await axiosInstance.post("/graphql", {
            query: LOGOUT_STUDENT,
            variables: { _id }
        })

        // In case of error coming from server
        if (resp.data.errors) throw resp.data.errors[0];
        const { logoutStudent } = resp.data.data;

        return logoutStudent;
    } catch (error) {
        dispatch({ type: FETCH_LOGIN_FAILURE, payload: error.message })
        throw new Error(error.message);
    }
}