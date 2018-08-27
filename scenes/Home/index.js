import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';

import {Icon} from 'native-base' ;


export default class Login extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => ( <Icon name='ios-stats' /> )
        };

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
            </View>
        );
    }
}


