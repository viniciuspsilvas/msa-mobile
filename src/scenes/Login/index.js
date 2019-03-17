import React, { Component } from 'react';
import { Toast } from 'native-base';
import { AsyncStorage , Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

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

	loginHandler = () => {

		Alert.alert('You tapped the button!')
/* 
		const { email, password } = values;

		// Get the token that uniquely identifies this device
		let tokenAdvice = this.state.tokenAdvice;
		let adviceDesc = Expo.Constants.deviceName;

		var self = this;

		let userDetails = {
			login: email.trim(),
			password: password.trim(),

			//login: "glaucomp@hotmail.com",
			//password: "Password123!",

			tokenAdvice: tokenAdvice,
			adviceDesc: adviceDesc
		}

		this.props.loginMoodle(userDetails).then(res => {
			const { error } = this.props;


			if (res) {
				AsyncStorage.setItem('userDetails', JSON.stringify(res.payload));
				self.props.navigation.navigate('AppStack');
			} else if (error) {
				Toast.show({ // TODO - remove this code
					text: error.error,
					buttonText: "Okay",
					duration: 3000
				});
			}
		}) */
	}

	render() {
		const { error, isLoading } = this.props;

		if (isLoading) { return <Loader loading={isLoading} /> }

		return (
			<LoginForm onSubmit={this.loginHandler} />
			
		);
	}
}

//Redux configuration
const mapStateToProps = state => {
	return {
		userDetails: state.loginReducer.userDetails,
		error: state.loginReducer.error
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		loginMoodle,
		togleLoading,
	},
	dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
