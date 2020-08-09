import React, { useContext } from "react";
import { View, TouchableOpacity, Image, KeyboardAvoidingView, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";

import Background from 'msa-mobile/src/components/Background'
import { useDeviceInfo } from "./deviceInfo"
import { LOGIN_STUDENT } from 'msa-mobile/src/api/student'
import styles from './style'
import packageJson from '../../../package.json';
import { AsyncStorage } from 'react-native';

import { AppContext } from "msa-mobile/src/app/AppContextProvider";

const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;

export default function LoginScreen() {
	const { dispatch } = useContext(AppContext);

	const { register, setValue, handleSubmit, errors } = useForm();
	const { tokenDevice, nameDevice } = useDeviceInfo();

	const resizeMode = 'contain';

	const [loginStudent, { loading }] = useMutation(LOGIN_STUDENT, {
		onCompleted(res) {
			const student = res.loginStudent.student
			student.token = res.loginStudent.token
            async function saveStorage(value) {
                await AsyncStorage.setItem(TOKEN_LOCAL_STORE, value)
            }
			saveStorage(student.token);

			// TODO ao fazer login, deve ser colocar o user no state do context,
			
			dispatch({ type: 'SIGN_IN', token: student.token });
		}
	});

	const onSubmit = ({ username, password }) => {
		const loginInput = {
			username: username.trim().toLowerCase(),
			password, tokenDevice, nameDevice
		}
		loginStudent({ variables: { loginInput } })
	};

	const LabeledInput = props => {
		const { label, nameField, disabled } = props;

		const styleInput = errors[nameField] ? styles.inputError : styles.input;
		const styleLabel = errors[nameField] ? styles.labelError : styles.label;
		return (
			<>
				<Text for={nameField} style={styleLabel}>{label}</Text>
				<TextInput
					onChangeText={text => setValue(nameField, text.trim())}
					underlineColorAndroid="transparent"
					style={disabled ? styles.inputDisabled : styleInput}
					disabled={disabled}
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

					<LabeledInput nameField="username" label="Username" disabled={loading}
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

					<LabeledInput nameField="password" label="Password" secureTextEntry={true} disabled={loading}
						ref={register({ name: 'password' }, { required: 'This is required.', max: 50, min: 3, maxLength: 30 })}
					/>

					<TouchableOpacity style={styles.buttonSubmit}
						underlayColor='#ad1616' disabled={loading}
						onPress={handleSubmit(onSubmit)}>
						<>

							{loading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
									<Text style={styles.textButton}> Login 	</Text>
								)}
						</>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		</>
	)
}
