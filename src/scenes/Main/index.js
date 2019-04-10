import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserDetails } from '../Login/actions';

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

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {

    this.props.getUserDetails().then(() => {
      this.props.navigation.navigate(this.props.loginReducer.isAuthenticated ? 'AppStack' : 'AuthStack');
    })
      .catch(error => {
        this.setState({ error })
      })
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
});


const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);