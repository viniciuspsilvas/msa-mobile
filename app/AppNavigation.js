import React from 'react'
import { Animated, Easing, View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems, createSwitchNavigator } from 'react-navigation'

import ForgottenPassword from '../src/scenes/Login/scenes/ForgottenPassword'
import Home from '../src/scenes/Home'
import Messages from '../src/scenes/Messages'
import Info from '../src/scenes/Info'
import Attendance from '../src/scenes/Attendance'
import FindUs from '../src/scenes/Find_Us'
import Schedule from '../src/scenes/Schedule'
import Login from '../src/scenes/Login'

import Username from "../src/components/Username"
import LogoutButton from "../src/components/LogoutButton"

import  StorybookUIRoot from '../storybook';
import MainContainer from './MainContainer'

// drawer Navigator
const AppDrawerStack = createDrawerNavigator({
  home: { screen: Home },
  messages: { screen: Messages },
  Info: { screen: Info },
  attendance: { screen: Attendance },
  findUs: { screen: FindUs },
  schedule: { screen: Schedule }

}, {
    gesturesEnabled: false,
    contentComponent: (props) => (
      <ScrollView>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('msa-mobile/assets/icon_white.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
           <Username />
        </View> 
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <LogoutButton {...props}/>
        </SafeAreaView>
      </ScrollView>
    )
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}
);

/* Create a Drawer (Menu) and its metadatas */
 const AppStack = createStackNavigator({
  DrawerStack: { screen: AppDrawerStack }
}, {
    headerMode: 'float',
    defaultNavigationOptions: ({ navigation }) => ({
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


const AuthStack = createStackNavigator({

  Login: { screen: Login },
  ForgottenPass: {
    screen: ForgottenPassword,
    navigationOptions: { title: 'Forgot Password' }
  }
}
  , {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Login',
    transitionConfig: noTransitionConfig,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    MainContainer: MainContainer,
    AppStack: AppStack,
    AuthStack: AuthStack,
    Storybook: StorybookUIRoot
  },
  {
    initialRouteName: 'MainContainer',
    headerMode: 'float',
  }
));
