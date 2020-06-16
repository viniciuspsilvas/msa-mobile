import React, { useContext, useState, useEffect } from 'react';
import { description } from 'msa-mobile/package.json';

import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from 'msa-mobile/src/pages/Home'
import AboutScreen from 'msa-mobile/src/pages/About'
import LoginScreen from 'msa-mobile/src/pages/Login'
import MessagesScreen from 'msa-mobile/src/pages/Messages'
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import LogoutButton from 'msa-mobile/src/components/LogoutButton'
import Loader from 'msa-mobile/src/components/Loader'

const styles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
  container: {
    flex: 1,
  }
}
);

export default function AppNavigation() {
  const { actions } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true)
  const student = actions.getLoggedUser();

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 500)

  }, []);

  if (isLoading) {
    return <Loader />
  }

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('msa-mobile/assets/icon_white.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
          <Text>{student.fullName}</Text>
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItemList  {...props} options={{ drawerIcon: { size: 5, color: "blue" } }} />
          <LogoutButton />
        </SafeAreaView>
      </DrawerContentScrollView>
    );
  }

  const DrawerScreen = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { color: "#FFFFFF" },
          labelStyle: { fontSize: 15 },
        }}
        drawerStyle={{
          width: 240,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: () => <Icon name='ios-home' type='Ionicons' /> }} />
        <Drawer.Screen name="About" component={AboutScreen} options={{ drawerIcon: () => <Icon name='ios-information-circle-outline' /> }} />
        <Drawer.Screen name="Messages" component={MessagesScreen} options={{ drawerIcon: () => <Icon type='Ionicons' name='ios-chatboxes' /> }} />
      </Drawer.Navigator>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={student && student.token ? "Drawer" : "Login"}>
      <Stack.Screen name="Drawer"
        options={({ navigation }) => ({
          title: description,
          headerStyle: { backgroundColor: '#E54236', },
          headerLeft: () => (
            <Icon name="md-menu" size={30} style={{ paddingLeft: 16 }} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
          ),
        })}
        component={DrawerScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
