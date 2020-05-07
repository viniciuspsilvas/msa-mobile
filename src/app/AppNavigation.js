import React, { useContext } from 'react';
import { Icon } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { description } from 'msa-mobile/package.json';

import HomeScreen from '../pages/Home'
import InfoScreen from '../pages/Info'
import LoginScreen from '../pages/Login'

import { AppContext } from "msa-mobile/src/app/AppContextProvider";

export default function AppNavigation() {
  const { actions } = useContext(AppContext);
  const student = actions.getLoggedUser();
  console.log("student => ", student)
  const isSignedIn = student && student.token;


  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={isSignedIn ? "Drawer" : "Login"}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Drawer"
            options={({ navigation }) => ({
              title: description,
              headerStyle: {
                backgroundColor: '#E54236',
              },
              headerLeft: () => (
                <Icon name="md-menu" size={30} style={{ paddingLeft: 16 }} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
              ),
            })}
            component={DrawerScreen} />
        </>
      ) : (
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        )
      }
    </Stack.Navigator>
  );
}

function DrawerScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator initialRouteName="Home"
        drawerStyle={{
          backgroundColor: '#c6cbef',
          width: 240,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Info" component={InfoScreen} />
      </Drawer.Navigator>
    </>
  );
}