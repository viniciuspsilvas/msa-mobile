import React, { Component } from 'react';
import { Text, View, Button, ScrollView,TextInput} from 'react-native';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            


  <ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Login
				</Text>
				<TextInput
					r//ef={component => this._username = component}
					placeholder='Username.' 
					//onChangeText={(username) => this.setState({username})}
					autoFocus={true}
					//onFocus={this.clearUsername}
				/>
				<TextInput 
					//ref={component => this._password = component}
					placeholder='Password' 
					//onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					//onFocus={this.clearPassword}
					//onSubmitEditing={this._userLogin}
				/>
				<View style={{margin:7}} />
				<Button 
                    onPress={() => this.props.navigation.navigate('drawerStack')}
		      		title="Submit"
		      	/>
	      </ScrollView>
        );
    }
}