import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { View, TouchableOpacity, Image, KeyboardAvoidingView, Text } from 'react-native';

import styles from './style'

import ButtonLogin from '../ButtonLogin'
import IconButton from '../IconButton'

import InputLabeled from "../InputLabeled"
import { required, email } from "../../../../util/validators"

const LoginForm = props => {
    const { handleSubmit, pristine, submitting } = props
    const resizeMode = 'contain';

    return (
        <View style={styles.container}>

            <Image source={require('msa-mobile/assets/background2.png')}
                style={{
                    position: 'absolute',
                    width: '100%', height: '100%',
                    top: 25,
                }} />

            <KeyboardAvoidingView behavior='position' enabled style={styles.keyboardContainer}>

                <View style={styles.logoContainer}>
                    <Image source={require('msa-mobile/assets/Logo_horiz.png')}
                        style={{
                            width: '100%',
                            top: '-20%',
                            resizeMode
                        }}
                    />
                </View>

                <View >
                    <Field
                        name="email"
                        label="Email"
                        component={InputLabeled}
                        validate={[required, email]}
                        textContentType="username"
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Field
                        name="password"
                        label="Password"
                        component={InputLabeled}
                        secureTextEntry={true}
                        textContentType="password"
                        validate={[required]}
                    />
                </View>

                <View style={{ height: 20 }} />

            </KeyboardAvoidingView>
            <View style={{ flex: 1, marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View >
                    <TouchableOpacity >
                        <Text style={styles.linkForgotPassword} >Forgot your password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ButtonLogin
                        onPress={handleSubmit}
                        disabled={pristine || submitting}
                    />
                </View>
            </View>

            <View style={styles.footerContainer} >
                <View style={styles.footer} >

                    <Image source={require('msa-mobile/assets/logo3.png')}
                        style={{
                            width: '50%',
                            resizeMode
                        }} />


                    <IconButton iconName='facebook-f' />
                    <IconButton iconName='instagram' />
                    <IconButton iconName='youtube' />
                </View>

            </View>
        </View>
    )
}

export default reduxForm({
    form: 'loginForm',// a unique identifier for this form

})(LoginForm)