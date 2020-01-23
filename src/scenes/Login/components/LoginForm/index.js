import React from 'react'
import { View, TouchableHighlight, Image, KeyboardAvoidingView, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'

import styles from './style'
import Background from 'msa-mobile/src/components/Background'

import { loginMobile } from "../../actions";
import { useDeviceInfo } from "./deviceInfo"

export default function LoginForm({ navigation }) {
  const { register, setValue, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { tokenDevice, nameDevice } = useDeviceInfo();

  const { isFetching } = useSelector(state => state.loginReducer);

  const resizeMode = 'contain';

  const onSubmit = ({ username, password }) => {
    const loginInput = {
      username: username.trim().toLowerCase(),
      password, tokenDevice, nameDevice
    }

    dispatch(loginMobile(loginInput))
      .then(result => {
        if (result) navigation.navigate('AppStack')
      })
      .catch(error => Alert.alert(error.message))

  };

  const LabeledInput = props => {
    const { label, nameField } = props;

    const styleInput = errors[nameField] ? styles.inputError : styles.input;
    const styleLabel = errors[nameField] ? styles.labelError : styles.label;
    return (
      <>
        <Text for={nameField} style={styleLabel}>{label}</Text>

        <TextInput
          onChangeText={text => setValue(nameField, text)}
          underlineColorAndroid="transparent"
          style={styleInput}
          {...props}
        />

        <Text style={styles.labelErrorSmall}> {errors[nameField] && errors[nameField].message}</Text>
      </>
    )
  }

  return (
    <>
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

          <LabeledInput nameField="username" label="Username" disabled={isFetching}
            ref={
              register(
                { name: 'username' },
                {
                  max: 50, min: 3, maxLength: 30,
                  required: 'This is required.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address."
                  }
                }
              )
            }
          />

          <LabeledInput nameField="password" label="Password" secureTextEntry={true} disabled={isFetching}
            ref={register({ name: 'password' }, { required: 'This is required.', max: 50, min: 3, maxLength: 30 })}
          />

          <TouchableHighlight style={styles.buttonSubmit}
            underlayColor='#ad1616' editable={isFetching}
            onPress={handleSubmit(onSubmit)}>
            <>

              {isFetching ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text style={styles.textButton}>
                    Login
              </Text>
                )}
            </>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}
