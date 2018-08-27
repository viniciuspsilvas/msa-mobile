import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {Icon} from 'native-base' ;

export default class Info extends Component {

    static navigationOptions = {
        drawerLabel: 'Info',
        drawerIcon: () => ( <Icon name='ios-information-circle-outline' /> )
        };

    render() {
        return (
            <View>
                <Text>Info Screen</Text>
            </View>
        );
    }
}