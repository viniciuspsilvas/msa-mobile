import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../scenes/Login/actions';

const LogoutButton = (props) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.loginReducer);

    const handleLogout = () => {
        dispatch(logout(userDetails.id))
        props.navigation.navigate('AuthStack');
    };

    return <TouchableOpacity
        onPress={() => handleLogout()}>
        <Text style={styles.headline}>Log out</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20,
    }
}
);

export default LogoutButton;
