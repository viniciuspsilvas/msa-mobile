import React from 'react'
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems, createSwitchNavigator } from 'react-navigation'

import ForgottenPassword from '../scenes/Login/scenes/ForgottenPassword'
import Home from '../scenes/Home'
import Messages from '../scenes/Messages'
import Info from '../scenes/Info'
import Attendance from '../scenes/Attendance'
import FindUs from '../scenes/Find_Us'
import Schedule from '../scenes/Schedule'

import MainContainer from '../scenes/Main'
import Login from '../scenes/Login'



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
          <Image source={require('../assets/icon.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
          <Text style={styles.headline}>nameUser</Text>
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <TouchableOpacity
            onPress={() => {

              props.removeUserToken()
                .then(() => {
                  props.navigation.navigate('Auth');
                })

            }}>
            <Text style={styles.headline}>Log out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,

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
  },
  {
    initialRouteName: 'MainContainer',
    headerMode: 'float',
  }
));
