import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions'

import Constants from 'expo-constants';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import LoginForm from "./components/LoginForm"
import Loader from "../../components/Loader"

import { loginMobile } from "./actions";

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
		const { error, isFetching } = this.props;

		if (isFetching) { return <Loader loading={isFetching} /> }
		if (error) {
			Alert.alert(error);
		}

		return (
			<LoginForm onSubmit={this.loginHandler} />
		);
	}
}

//Redux configuration
const mapStateToProps = state => ({ ...state.loginReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ loginMobile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
