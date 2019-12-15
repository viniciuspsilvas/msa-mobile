import React, { Component } from 'react';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions'

import Constants from 'expo-constants';

import LoginForm from "./components/LoginForm"

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
		let tokenAdvice = Constants.isDevice ? await Notifications.getExpoPushTokenAsync() : "DEV_TOKEN";

		let adviceDesc = Expo.Constants.deviceName;
		this.setState({ tokenAdvice: tokenAdvice, adviceDesc: adviceDesc });
	}

	loginHandler = (values) => {
		const { email, password } = values;
		const username = email.trim().toLowerCase();

		const loginInput = {
			username,
			password,
			tokenDevice: this.state.tokenAdvice,
			nameDevice: Expo.Constants.deviceName
		}

		this.props.loginMobile(loginInput);
	}

	componentDidUpdate() {
		const { isAuthenticated, userDetails } = this.props;

		if (isAuthenticated && userDetails) {
			this.props.navigation.navigate('AppStack');
		}
	}

	render() {
	
		return (
			<LoginForm {...this.props} />
		);
	}
}

export default Login;
