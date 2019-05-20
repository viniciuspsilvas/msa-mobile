import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { View, TouchableOpacity, Image, KeyboardAvoidingView, Text } from 'react-native';

import styles from './style'

import ButtonLogin from '../ButtonLogin'
import Background from '../../../../components/Background'

import InputLabeled from "../InputLabeled"
import { required, email } from "../../../../util/validators"

const LoginForm = props => {
    const { handleSubmit, pristine, submitting } = props
    const resizeMode = 'contain';

    return (

        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        }} >
            <Background />
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='position' enabled>
                    <Image source={require('msa-mobile/assets/Logo_vert_red.png')}
                        style={{
                            alignSelf: "center",
                            width: 250, height: 250,
                            resizeMode,
                        }}
                    />
                    <Field
                        name="email"
                        label="Email"
                        component={InputLabeled}
                        validate={[required, email]}
                        textContentType="username" />

                    <Field
                        name="password"
                        label="Password"
                        component={InputLabeled}
                        secureTextEntry={true}
                        textContentType="password"
                        validate={[required]} />

                    <TouchableOpacity style={{ alignItems: 'flex-end' }}  >
                        <Text style={styles.linkForgotPassword} >Forgot your password</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginTop: 20, }}>
                        <ButtonLogin
                            onPress={handleSubmit}
                            disabled={pristine || submitting}
                        />
                    </View>
                </KeyboardAvoidingView>

            </View>

        </View>

    )
}

export default reduxForm({
    form: 'loginForm',// a unique identifier for this form

})(LoginForm)