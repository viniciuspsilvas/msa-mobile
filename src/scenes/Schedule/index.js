import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {Icon} from 'native-base' ;

export default class Schedule extends Component {

    static navigationOptions = {
        drawerLabel: 'Schedule',
        drawerIcon: () => ( <Icon name='calendar' /> )
        
        };

    render() {
        return (
            <View>
                <Text>Schedule Screen</Text>
            </View>
        );
    }
}