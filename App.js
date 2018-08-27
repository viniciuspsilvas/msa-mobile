import React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
//import { DrawerItems, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
//import { Header, Left, Right, Icon } from 'native-base';
import AppNavigation from './AppNavigation'

// const {width} = Dimensions.get('window');
        
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }       
});


export default class App extends React.Component {
    render() {
        return <AppNavigation />;
        
    }
}