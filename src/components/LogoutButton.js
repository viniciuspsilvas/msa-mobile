import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_STUDENT } from 'msa-mobile/src/api/student'
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

const LogoutButton = () => {
    const { state, authContext } = useContext(AppContext);
    const { student } = state

    const [logoutStudent] = useMutation(LOGOUT_STUDENT, {
        onCompleted(res) {
            authContext.signOut()
        },
        onError() {
            authContext.signOut()
        }
    });

    const onLogoutPress = () => {
        authContext.signOut();
        logoutStudent({ variables: { studentId: student.id } })
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
