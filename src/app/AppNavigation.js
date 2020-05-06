import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { useQuery } from '@apollo/react-hooks';
import { VERSION_API } from '../api/configAPI'

import HomeScreen from '../pages/Home'
import InfoScreen from '../pages/Info'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Drawer"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#E54236',
        },

        headerLeft: () => (
          <Icon name="md-menu" size={30} style={{ paddingLeft: 16 }} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        ),
      })}
    >

      <Stack.Screen name="Drawer" options={{ title: "Mindroom Student APP" }} component={DrawerScreen} />
    </Stack.Navigator>
  );
}

function DrawerScreen() {
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


function MessageScreen() {

  const { loading, error, data } = useQuery(VERSION_API);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Message Screen</Text>
      <Text>{data && data.version}</Text>
    </View>
  );
}