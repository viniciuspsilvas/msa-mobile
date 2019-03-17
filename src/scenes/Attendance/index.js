import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {Icon} from 'native-base' ;

export default class Attendance extends Component {

    static navigationOptions = {
        drawerLabel: 'Attendance',
        drawerIcon: () => ( <Icon name='ios-stats' /> )
        };

    render() {
        return (
            <View>
                <Text>Attendance Screen</Text>
            </View>
        );
    }
}