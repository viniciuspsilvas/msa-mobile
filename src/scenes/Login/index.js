import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import LoginForm from "./components/LoginForm"
import Loader from "../../components/Loader"

import { loginMoodle } from "./actions";

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

		let userDetails = {
			login: email.trim(),
			password: password.trim(),

			tokenAdvice: tokenAdvice,
			adviceDesc: adviceDesc
		}

		this.props.loginMoodle(userDetails);
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
		if (error) { Alert.alert(error); }

		return (
			<LoginForm onSubmit={this.loginHandler} />
		);
	}
}

//Redux configuration
const mapStateToProps = state => ({ ...state.loginReducer });

const mapDispatchToProps = dispatch => bindActionCreators({ loginMoodle }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
