import React, { Component } from 'react';
import { Toast } from 'native-base';
import { View, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { connect } from "react-redux";

import LoginForm from "./components/LoginForm"

import Loader from "../../components/Loader"
import { loginMoodle, togleLoading } from "./actions";

class Login extends Component {

	/* Contructor */
	constructor(props) {
		super(props);
		this.state = {
			tokenAdvice: '',
			adviceDesc: '',
		};

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

	loginHandler = (values) => {

		const { email, password } = values;

		// Get the token that uniquely identifies this device
		let tokenAdvice = this.state.tokenAdvice;
		let adviceDesc = Expo.Constants.deviceName;

		var self = this;

		let userDetails = {
			//login: email,
			//sdfdspassword: password,

			login: "glaucomp@hotmail.com",
			password: "Password123!",

			tokenAdvice: tokenAdvice,
			adviceDesc: adviceDesc
		}

		this.props.loginMoodle(userDetails).then(res => {

			console.log(22222, res)

			if (res.userDetails.status === 200) {
				//registerForPushNotificationsAsync(userId);
				self.props.navigation.navigate('AppStack');

				AsyncStorage.setItem('userDetails', JSON.stringify(res.userDetails.data.return));

			} else {
				Toast.show({
					text: "Username/password invalid!",
					buttonText: "Okay",
					duration: 3000
				})
			}
		})

	}

	render() {
		const { error, isLoading } = this.props;

		if (isLoading) { return <Loader loading={isLoading} /> }
		if (error) {
			Toast.show({ // TODO - remove this code
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

					<LoginForm onSubmit={this.loginHandler} />

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
});

//Redux configuration
const mapStateToProps = state => {
	return state.loginReducer;
};

const mapDispatchToProps = dispatch => ({
	loginMoodle: (userDetails) => dispatch(loginMoodle(userDetails)),

	togleLoading: () => dispatch(togleLoading()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
