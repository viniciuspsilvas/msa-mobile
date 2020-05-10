import React, { useContext } from 'react';
import { description } from 'msa-mobile/package.json';

import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from 'msa-mobile/src/pages/Home'
import InfoScreen from 'msa-mobile/src/pages/Info'
import LoginScreen from 'msa-mobile/src/pages/Login'
import MessagesScreen from 'msa-mobile/src/pages/Messages'
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

const styles = StyleSheet.create({
    headline: {
      textAlign: 'center',
      fontSize: 14,
      marginTop: 20,
    }
  }
);

export default function AppNavigation() {
  const { actions } = useContext(AppContext);
  const student = actions.getLoggedUser();
  const isLogged = student && student.token;

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('msa-mobile/assets/icon_white.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
          <Text>{student.fullName}</Text>
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItemList {...props} />
          <TouchableOpacity onPress={() => { actions.logout() }}>
            <Text style={styles.headline}>Log out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </DrawerContentScrollView>
    );
  }

  const DrawerScreen = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={{
          width: 240,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Info" component={InfoScreen} />
        <Drawer.Screen name="Messages" component={MessagesScreen} />
      </Drawer.Navigator>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={isLogged ? "Drawer" : "Login"}>
      {isLogged ? (
        <>
          <Stack.Screen name="Drawer"
            options={({ navigation }) => ({
              title: description,
              headerStyle: { backgroundColor: '#E54236', },
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
