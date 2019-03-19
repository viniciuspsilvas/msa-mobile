import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon, Button, Badge } from 'native-base';

import { getMessagesList } from "../Messages/actions"
import { connect } from "react-redux";

class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
    };


    /*
    Constructor 
    */
    constructor(props) {
        super(props);

        this.state = { qtdMessage: 0 };
    }

    componentDidMount() {
        const { userDetails } = this.props;
        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(userDetails));

        this.setState({
            //qtdMessage: messagesList.message.filter(msg => !msg.isRead).length
        });
    }

    render() {
        const { error, isLoading, messagesList } = this.props;
        const { qtdMessage } = this.state;

        //const qtdMessage2 = messagesList.length > 0 ? messagesList.message.filter(msg => !msg.isRead).length : 0;
        console.log("$$$$$-> " + messagesList.length)

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        if (isLoading) { return <View><Text>Loading...</Text></View> }

        return (

            <HomeScreen
                qtdMessage={qtdMessage}
                onClick={() => this.props.navigation.navigate("messages")}
            />
        );
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.messagesReducer,
        userDetails: state.loginReducer.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesList: (filter) => dispatch(getMessagesList(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
