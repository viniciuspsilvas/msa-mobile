import { AsyncStorage } from 'react-native';

const error = error => ({
    type: 'ERROR',
    error,
});

export const getUserDetails = () => dispatch =>

    AsyncStorage.getItem('userDetails')
        .then((userDetails) => {
            dispatch({ type: 'LOADING', isLoading: false});
            dispatch({type: 'GET_USER_LOGGED', userDetails});
        })
        .catch((err) => {
            dispatch({ type: 'LOADING', isLoading: false});
            dispatch(error(err.message || 'ERROR'));
        })

export const saveUserDetails = (userDetails) => dispatch =>
    AsyncStorage.setItem('userDetails', userDetails)
        .then((data) => {
            dispatch({ type: 'LOADING', isLoading: false});
            dispatch( {type: 'SAVE_USER_LOGGED',   userDetails});
        })
        .catch((err) => {
            dispatch({ type: 'LOADING', isLoading: false});
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserDetails = () => dispatch =>
    AsyncStorage.removeItem('userDetails')
        .then((data) => {
            dispatch({ type: 'LOADING', isLoading: false});
            //dispatch(removeUserDetails(data));
            dispatch({  type: 'REMOVE_USER_LOGGED' });
            
        })
        .catch((err) => {
            dispatch({ type: 'LOADING', isLoading: false});
            dispatch(error(err.message || 'ERROR'));
        })