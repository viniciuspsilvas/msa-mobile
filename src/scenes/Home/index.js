import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';

import Background from '../../components/Background'

import { getMessagesList } from "../Messages/actions"
import { connect } from "react-redux";

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'

class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
    };

    componentDidMount() {
        const { userDetails } = this.props;
        this.props.getMessagesList(userDetails);
        this.subscribeMessageChannel();
    }

    subscribeMessageChannel = () => {
        const { userDetails } = this.props;

        var pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: CLUSTER,
            forceTLS: true
        });
        var channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);

        channel.bind(`msa.message.student.${userDetails.id}`, () => this.props.getMessagesList(userDetails));
    }

    render() {
        const { error, messagesList } = this.props;
        const qtdMessage = messagesList.length > 0 ? messagesList.filter(msg => !msg.isRead).length : 0;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }

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
