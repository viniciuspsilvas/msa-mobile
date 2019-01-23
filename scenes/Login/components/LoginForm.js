import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { inputLabeled } from "../../../components/InputLabeled"
import { required, email } from "../../../util/validators"


const LoginForm = props => {
    const { handleSubmit, pristine, submitting } = props

    return (

        <View style={styles.container}>
            <View style={styles.name} >
                <Field
                    name="email"
                    label="Email"
                    component={inputLabeled}
                    validate={[required, email]}
                    autoFocus
                />
            </View>
            <View style={styles.password} >
                <Field
                    name="password"
                    label="Password"
                    component={inputLabeled}
                    type="password"
                    validate={[required]}
                />
            </View>
            <View style={styles.button} >
                <Button
                    style={styles.buttonSubmit}
                    onPress={handleSubmit}
                    disabled={pristine || submitting}
                    title="Login"
                />
            </View>

            <View style={styles.button} >
                <TouchableOpacity style={styles.linkForgotPassword}>
                    <Text >Forgotten password?</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',

    },
    name: {
    },
    password: {
        marginTop: 15,
    },
    button: {
        marginTop: 15,
    },
    buttonSubmit: {
        
    },

    linkForgotPassword: {
        //color: '#200705',
        alignItems: 'center',
        flexGrow: 1,
        //justifyContent: 'center',
        marginTop: 20,
    },
});

export default reduxForm({
    form: 'loginForm',// a unique identifier for this form

})(LoginForm)