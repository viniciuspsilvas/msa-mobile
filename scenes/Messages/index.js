import React, { Component } from 'react';
import { Container, Content, Icon, Text, View } from 'native-base';
import { connect } from "react-redux";

import { getMessagesList } from "./actions"

import MessageList from './components/MessageList'

class Messages extends Component {

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    };

    /*
    Constructor 
    */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userDetails } = this.props;

        const filter = { params: { filter: `{"where":{"studentId":"` + userDetails.id + `"} , "order":"createdAt DESC"}` } }

        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(filter));
    }

    componentWillUnmount() {
        /*         this.subs.forEach((sub) => {
                  sub.remove();
                }); */
    }

    render() {
        const { error, isLoading, messagesList } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        if (isLoading) { return <View><Text>Loading...</Text></View> }

        return (
            <Container>
                <Content>
                    <Text>Messages...</Text>
                    <MessageList list={messagesList} />
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