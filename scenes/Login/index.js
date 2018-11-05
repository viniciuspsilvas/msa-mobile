import React, { Component } from 'react';
import { Button, Text, Toast } from 'native-base';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Expo, { Permissions, Notifications } from 'expo';

// This refers to the function defined earlier in this guide
import { registerForPushNotificationsAsync } from './registerForPushNotificationsAsync';

var config = require('../../config/config');

export default class Login extends Component {

	/* Contructor */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: true,
			notification: {},
			showToast: false
		};
	}

	componentDidMount() {
		//registerForPushNotificationsAsync();

		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		//this._notificationSubscription = Notifications.addListener(this._handleNotification);
	}

	_handleNotification = (notification) => {
		this.setState({ notification: notification });
	};


	static navigationOptions = {
		//title: '',
	};

	// Workaround to solve the problem related to font 'Roboto_medium'
	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});
		this.setState({ loading: false });
	}
	// ##### FIM do workaround 

	loginHandler = () => {

		var credential = {
			email: this.state.email,
			password: this.state.password,
		};

		var header = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credential)
		};

		var self = this;

		fetch(config.backend.login, header)
			.then(response => {
				if (response.status === 200) {
					self.props.navigation.navigate('drawerStack');
					return response.json();

				} else {

					Toast.show({
						text: "Username/password invalid!",
						buttonText: "Okay",
						duration: 3000
					})
				}
			}).then(function (json) {

				registerForPushNotificationsAsync(json.userId);

			}).catch(err => console.error(err));
	}

	render() {

		if (this.state.loading) {
			return <Expo.AppLoading />;
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