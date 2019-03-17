import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { View, TouchableOpacity, Image, KeyboardAvoidingView, Text } from 'react-native';

import styles from './style'

import ButtonLogin from '../ButtonLogin'

import InputLabeled from "../InputLabeled"
import { required, email } from "../../../../util/validators"

const LoginForm = props => {
    const { handleSubmit, pristine, submitting } = props
    const resizeMode = 'contain';

    return (
        <View>
            <KeyboardAvoidingView behavior='position' enabled style={styles.container}>

                <Image source={require('../../../../assets/red-ball.png')}
                    style={{
                        width: '140%',
                        position: 'absolute',
                        left: '50%',
                        right: '50%',
                        top: -120,
                        bottom: 0,
                        resizeMode
                    }} />


                <View style={styles.logoContainer}>
                    <Image source={require('../../../../assets/Logo_vert.png')} style={styles.logo} />
                </View>

                <View>
                    <Field
                        name="email"
                        label="Email"
                        component={InputLabeled}
                        validate={[required, email]}
                        textContentType="username"
                    />
                </View>

                <View>
                    <Field
                        name="password"
                        label="Password"
                        component={InputLabeled}
                        secureTextEntry={true}
                        textContentType="password"
                        validate={[required]}
                    />
                </View>

            </KeyboardAvoidingView>
            <View style={{ flex: 1,margin: 20,flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, }}>

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
        </View>
    )
}

export default reduxForm({
    form: 'loginForm',// a unique identifier for this form

})(LoginForm)