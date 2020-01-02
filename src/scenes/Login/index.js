import React, { Component } from 'react';

import LoginForm from "./components/LoginForm"

export default class Login extends Component {

	/* Contructor */
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<LoginForm {...this.props} />
		);
	}
}
