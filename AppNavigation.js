import React from 'react'
import { Animated, Easing, Button, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { connect } from "react-redux";

import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'

import Login from './scenes/Login'
import Signup from './scenes/Login/scenes/Signup'
import ForgottenPassword from './scenes/Login/scenes/ForgottenPassword'

import Home from './scenes/Home'
import Messages from './scenes/Messages'
import Info from './scenes/Info'
import Attendance from './scenes/Attendance'
import FindUs from './scenes/Find_Us'
import Schedule from './scenes/Schedule'




// login stack
const LoginStack = createStackNavigator({

  loginScreen: { screen: Login },
  signupScreen: { screen: Signup },
  forgottenPasswordScreen: { screen: ForgottenPassword, navigationOptions: { title: 'Forgot Password' } }

}, {
    headerMode: 'none', // Header do Login
    navigationOptions: {
      gesturesEnabled: false,
    }
  })


// drawer stack
const DrawerStack = createDrawerNavigator({
  home: { screen: Home },
  messages: { screen: Messages },
  Info: { screen: Info },
  attendance: { screen: Attendance },
  findUs: { screen: FindUs },
  schedule: { screen: Schedule },
}, {
    gesturesEnabled: false,
    contentComponent: (props) => (
      <ScrollView>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/icon.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
        
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    )
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

/* Create a Drawer (Menu) and its metadatas */
const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#E54236' },
      title: 'Mindroom Student APP',
      gesturesEnabled: false,
      headerLeft: <Icon name="md-menu" size={30} style={{ paddingLeft: 16 }} color='black' onPress={() => navigation.toggleDrawer()} />
    })
  })

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false,
    },
  })


//Redux configuration
const mapStateToProps = state => {
  return {
      ...state.loginReducer,
  };
};



export default (PrimaryNav);
