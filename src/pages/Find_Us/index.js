import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {Icon} from 'native-base' ;

export default class FindUs extends Component {

    static navigationOptions = {
        drawerLabel: 'Find Us',
        drawerIcon: () => ( <Icon name='search' /> )
        
        };

    render() {
        return (
            <View>
                <Text>FindUs Screen</Text>
            </View>
        );
    }
}