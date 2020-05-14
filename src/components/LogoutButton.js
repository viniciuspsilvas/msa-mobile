import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_STUDENT } from 'msa-mobile/src/api/student'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

const LogoutButton = () => {
    const navigation = useNavigation();
    const { actions } = useContext(AppContext);
    const student = actions.getLoggedUser();

    const [logoutStudent] = useMutation(LOGOUT_STUDENT, {
        onCompleted(res) {
            navigation.navigate("Login") // TODO Vini - verificar se eh necessario
            actions.logout()
        }
    });

    return <TouchableOpacity
        onPress={() => logoutStudent({ variables: { studentId: student.id } })}>
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
