import React, { Component } from 'react';
import { Container, Icon, Content, Text } from 'native-base';

import { Alert } from 'react-native'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { getMessagesList, updateMessage } from "./actions"

import MessageList from './components/MessageList'
import Title from '../../components/Title';
import Background from '../../components/Background'

import styles from './style'


class Messages extends Component {

    static navigationOptions = ({ navigations }) => ({
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    });

    render() {
        const { error, messagesList, updateMessage, userDetails } = this.props;

        if (error) { Alert.alert(error.message) };

        messagesList.find(msg => {
            if (!msg.isRead) {
                setTimeout(function () {
                    msg.isRead = true;
                    updateMessage(msg, userDetails)
                }, 5000);

                return msg;
            } else {
                return null;
            }
        })

        return (
            <Container >
                <Background />
                <Title title='Messages' icon="ios-chatboxes" />

                <Content style={styles.container}>
                    {messagesList <= 0 ? (
                        <Text>No messages.</Text>
                    ) : (
                            <MessageList list={messagesList} />
                        )}
                </Content>
            </Container>
        );
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.messagesReducer, userDetails: state.loginReducer.userDetails });

const mapDispatchToProps = dispatch => bindActionCreators({ getMessagesList, updateMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

