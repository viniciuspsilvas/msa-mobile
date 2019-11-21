import React from 'react'
import { Text } from 'react-native';
import { connect } from "react-redux";

class Username extends React.Component {

    /* Contructor */
    constructor(props) {
        super(props);
    }

    render() {
        const { username } = this.props;
        return <Text>{username}</Text>
    }
}

//Redux configuration
const mapStateToProps = state => ({ username: state.loginReducer.userDetails.fullname });

export default connect(mapStateToProps)(Username);
