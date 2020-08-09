import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_STUDENT } from 'msa-mobile/src/api/student'
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import { AsyncStorage } from 'react-native';
import packageJson from '../../package.json';
const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;

const LogoutButton = () => {
    const { state, dispatch } = useContext(AppContext);
    const student = {}//actions.getLoggedUser();

    const [logoutStudent] = useMutation(LOGOUT_STUDENT, {
        /*  onCompleted(res) {
             // actions.logout()
         } */
    });

    const onLogoutPress = () => {
        async function removeUser() {
            await AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
        }
        removeUser();
        dispatch({ type: 'SIGN_IN', token: student.token });
        // logoutStudent({ variables: { studentId: student.id } }) // TODO chamar o logoutStudent no backend para deletar o device do user
    }

    return <TouchableOpacity
        onPress={onLogoutPress}>
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
