import React from 'react';
import { StyleSheet } from 'react-native';
//import { DrawerItems, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Root } from 'native-base';
import AppNavigation from './AppNavigation'

// const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default class App extends React.Component {
    render() {
        return <Root>
            <AppNavigation />
        </Root>;

    }
}