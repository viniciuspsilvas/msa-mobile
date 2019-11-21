import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class MainContainer extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  //Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    this.props.navigation.navigate(this.props.isAuthenticated ? 'AppStack' : 'AuthStack');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  ...state.loginReducer
});

export default connect(mapStateToProps)(MainContainer);