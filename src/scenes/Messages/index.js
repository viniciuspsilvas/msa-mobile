import React, { Component } from 'react';
import { Container, Content, Icon, Text, View, H1 } from 'native-base';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native'

import { getMessagesList } from "./actions"

import MessageCardList from './components/MessageCardList'
import MessageList from './components/MessageList'

//import styles from './Stylestyle'

let count = 0;


class Messages extends Component {

    static navigationOptions = ({ navigations }) => ({
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    });


    /*
    Constructor 
    */
    constructor(props) {
        super(props);

        this.state = {
            msgUnreadList: [],
            msgList: []
        };
    }

    componentDidMount() {
        const { userDetails } = this.props;

        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(userDetails));

        this.props.navigation.addListener('willFocus', () => console.log("COUNT => ", ++count));
        
    }

    componentWillUnmount() {
    }

    render() {
        const { error, isLoading, messagesList } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        if (isLoading) { return <View><Text>Loading...</Text></View> }

        var msgUnreadList;
        var msgList;

        if (messagesList.message){
             msgUnreadList = messagesList.message.filter(msg => !msg.isRead);
             msgList = messagesList.message.filter(msg => msg.isRead);
        }
    
        return (
            <Container style={styles.container}>
                <Content>

                    <Text style={styles.title}>Messages</Text>

                    {messagesList.message <=0 && <Text>No messages.</Text>}

                    <MessageCardList list={msgUnreadList} />
                    <MessageList list={msgList} />
                </Content>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

