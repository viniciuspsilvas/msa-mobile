import { axiosInstance } from 'msa-mobile/src/util/apiClient';
import { AsyncStorage } from 'react-native';

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
            }
        }
    }
`

export const loginMobile = (loginInput) => async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_BEGIN })

    try {
        const {data} = await axiosInstance.post("/graphql", {
            query: LOGIN_STUDENT,
            variables: { loginInput }
        })

        // In case of error coming from server
        if (data.errors) {
            dispatch({ type: FETCH_LOGIN_FAILURE, payload: data.errors[0].message })
            return data.errors[0].message;
        }

        const { loginStudent } = data.data;

        const userDetailLogged = {
            ...loginStudent.student,
            token: loginStudent.token
        }
        
        await AsyncStorage.setItem('authToken', loginStudent.token);
        
        dispatch(
            {
                type: FETCH_LOGIN_SUCCESS,
                payload: userDetailLogged
            })

    } catch (error) {
        dispatch({ type: FETCH_LOGIN_FAILURE, payload: error.message })

        return error.message;
    }
}

export const logout = () => dispatch => dispatch({ type: LOGOUT });