import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux";

import { removeUserDetails } from '../scenes/Login/actions';

class LogoutButton extends React.Component {

    /* Contructor */
    constructor(props) {
        super(props);
    }

    logout = () => {
        this.props.removeUserDetails()
            .then(() => {
                this.props.navigation.navigate('AuthStack');
            })
            .catch(error => {
                this.setState({ error })
            })
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

const mapDispatchToProps = dispatch => ({
    removeUserDetails: () => dispatch(removeUserDetails()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
