import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Expo from "expo";

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from './RegisterNotification';


export default class Login extends Component {

	/* Contructor */
	constructor(props) {
		super(props);
		this.state = { 
			email: '',
			loading: true };

	}

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
		console.log(this.state.email);


		registerForPushNotificationsAsync();

		this.props.navigation.navigate('drawerStack')
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
						onChangeText={(text) => this.setState({text})}
						onSubmitEditing={() => this.passwordInput.focus()}
					/>

					<TextInput 
						returnKeyType='go'
						placeholder='Password'
						placeholderTextColor='rgb(38, 8, 7)'
						secureTextEntry
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