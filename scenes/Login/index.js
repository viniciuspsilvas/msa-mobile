import React, { Component } from 'react';
import { Button, Text, Toast } from 'native-base';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Expo, { Permissions, Notifications } from 'expo';
import { connect } from "react-redux";

import axios from 'axios';
import config from '../../config/config'

import Loader from "../../components/Loader"
import { loginMoodle, togleLoading } from "./actions";

class Login extends Component {

	/* Contructor */
	constructor(props) {
		super(props);
		this.state = {
			tokenAdvice: '',
			adviceDesc: '',
			email: '',
			password: '',

			notification: {},
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.loginHandler = this.loginHandler.bind(this);
	}

	async componentDidMount() {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== 'granted') {
			return;
		}

		// Get the token that uniquely identifies this device
		let tokenAdvice = await Notifications.getExpoPushTokenAsync();
		let adviceDesc = Expo.Constants.deviceName;
		this.setState({ tokenAdvice: tokenAdvice, adviceDesc: adviceDesc });
	}

	// Workaround to solve the problem related to font 'Roboto_medium'
	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});

		this.props.togleLoading(false);
	}
	// ##### FIM do workaround 

	loginHandler = () => {

		// Get the token that uniquely identifies this device
		let tokenAdvice = this.state.tokenAdvice;
		let adviceDesc = Expo.Constants.deviceName;

		var self = this;

		let credential = {
			//login: this.state.email,
			//password: this.state.password,

			login: "glaucomp@hotmail.com",
			password: "Password123!",

			tokenAdvice: tokenAdvice,
			adviceDesc: adviceDesc
		}

		//this.props.loginMoodle(credential);

		axios.post(config.backend.loginMoodle, { "credencial": credential })
			.then(res => {
				console.log(res);

				if (res.status === 200) {
					self.props.navigation.navigate('drawerStack');
					let userId = res.data;
					//registerForPushNotificationsAsync(userId);

				}
			}).catch(err => {
				console.log(err)
				Toast.show({
					text: "Username/password invalid!",
					buttonText: "Okay",
					duration: 3000
				})
			});

	}

	// Called always when a input is changed
	handleInputChange = (event) => {

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}


	render() {
		const { error, isLoading } = this.props;

		if (isLoading) { return <Loader loading={isLoading} /> }
		if (error) {
			Toast.show({
				text: "Username/password invalid!",
				buttonText: "Okay",
				duration: 3000
			})
		}

		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>

				<View style={styles.logoContainer}>
					<Image source={require('../../assets/Logo_vert.png')} style={styles.logo} />

				</View>
				<View style={styles.formContainer}>

					<TextInput
						returnKeyType='next'
						placeholder='Email'
						placeholderTextColor='rgb(38, 8, 7)'
						style={styles.input}
						keyboardType='email-address'
						autoCorrect={false}
						autoCapitalize='none'
						onChangeText={(text) => this.setState({ email: text })}
						onSubmitEditing={() => this.passwordInput.focus()}
					/>

					<TextInput
						returnKeyType='go'
						placeholder='Password'
						placeholderTextColor='rgb(38, 8, 7)'
						secureTextEntry
						onChangeText={(text) => this.setState({ password: text })}
						ref={(input) => this.passwordInput = input}
						style={styles.input} />

					<Button full
						style={styles.buttonSubmit}
						onPress={() => this.loginHandler()}
						title="Submit"
						large >
						<Text>Login</Text>
					</Button>

					<TouchableOpacity style={styles.linkForgotPassword}>
						<Text >Forgotten password?</Text>
					</TouchableOpacity>

				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E54236',
	},

	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},

	formContainer: {
		padding: 20,
		flexGrow: 1,
		justifyContent: 'center',
		//alignItems: 'center'
	},

	logo: {
		height: 250,
		width: 250
	},

	linkForgotPassword: {
		//color: '#200705',
		alignItems: 'center',
		flexGrow: 1,
		//justifyContent: 'center',
		marginTop: 20,
	},

	buttonSubmit: {
		backgroundColor: '#200705',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},

	input: {
		height: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		marginBottom: 20,
		color: '#200705',
		paddingHorizontal: 20,
	}
});

//Redux configuration
const mapStateToProps = state => {
	return state.loginReducer;
};

const mapDispatchToProps = dispatch => ({
	loginMoodle: (credential) => dispatch(loginMoodle(credential)),
	togleLoading: () => dispatch(togleLoading()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
