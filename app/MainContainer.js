import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Notifications } from 'expo';
import { useSelector } from 'react-redux'

const MainContainer = props => {
  const { navigation } = props;
  const { isAuthenticated } = useSelector(state => state.loginReducer);

  var _notificationSubscription = null;

  useEffect(() => {
    if (isAuthenticated) {
      _notificationSubscription = Notifications.addListener(_handleNotification);
      navigation.navigate('AppStack');

    } else {
      if (_notificationSubscription) _notificationSubscription.remove();
      navigation.navigate('AuthStack');
    }
  }, []);


  const _handleNotification = notification => {
    if (isAuthenticated) {
      navigation.navigate('messages');
    }
  };

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MainContainer.navigationOptions = () => ({
  header: null
});

export default MainContainer;