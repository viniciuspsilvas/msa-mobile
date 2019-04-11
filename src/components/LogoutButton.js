import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { logout } from '../scenes/Login/actions';

class LogoutButton extends React.Component {


    logout = () => { 
        this.props.logout();
        this.props.navigation.navigate('AuthStack');

    };

    render() {
        return <TouchableOpacity
            onPress={this.logout}>
            <Text style={styles.headline}>Log out</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20,
    }
}
);

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(null, mapDispatchToProps)(LogoutButton);
