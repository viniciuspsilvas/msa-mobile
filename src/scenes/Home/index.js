import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';

import Background from '../../components/Background'

import { getMessagesList } from "../Messages/actions"
import { connect } from "react-redux";

class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
    };

    componentDidMount() {
        const { userDetails, messagesList } = this.props;
        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(userDetails));
        this.interval = setInterval(() => this.props.getMessagesList(userDetails), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { error, isLoading, messagesList } = this.props;
        const qtdMessage = messagesList.length > 0 ? messagesList.filter(msg => !msg.isRead).length : 0;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        //if (isLoading) { return <View><Text>Loading...</Text></View> }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }} >
                <Background />
                <HomeScreen
                    qtdMessage={qtdMessage}
                    onClick={() => this.props.navigation.navigate("messages")}
                />

            </View>
        );
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        messagesList: state.messagesReducer.messagesList,
        userDetails: state.loginReducer.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesList: (filter) => dispatch(getMessagesList(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
