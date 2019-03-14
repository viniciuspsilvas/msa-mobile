import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Button, Text } from 'native-base';

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
                    textContentType="username"
                />
            </View>
            <View style={styles.password} >
                <Field
                    name="password"
                    label="Password"
                    component={inputLabeled}
                    secureTextEntry={true} 
                    textContentType="password"
                    validate={[required]}
                />
            </View>
            <View style={styles.button} >
                <Button dark full
                    style={styles.buttonSubmit}
                    onPress={handleSubmit}
                    bordered={pristine || submitting}
                    disabled={pristine || submitting}
                    color="black">

                    <Text>Login</Text>
                </Button>
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
        marginTop: 55,
    },
    buttonSubmit: {
        borderColor: 'black',
        borderWidth: 1,
        color: 'black',
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