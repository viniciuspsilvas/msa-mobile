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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Messages extends Component {

    static navigationOptions = ({ navigations }) => ({
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    });

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => this.setLastMessageRead());
    }

    setLastMessageRead = async () => {
        const { userDetails, messagesList } = this.props;

        if (messagesList && messagesList.length > 0) {
            await sleep(5000);
            messagesList.forEach(msg => {
                if (!msg.isRead) {
                    aux = true;
                    msg.isRead = true;
                    this.props.updateMessage(msg, userDetails)
                }
            });
        }
    }

    render() {
        const { error, messagesList } = this.props;

        if (error) { Alert.alert(error.message) };

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

