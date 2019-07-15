import React, { Component } from 'react';
import { Container, Icon, Content, Text, View } from 'native-base';

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

    componentDidMount() {
        const { userDetails } = this.props;
        this.props.navigation.addListener('willFocus', () => this.loadMessageList(userDetails));
    }

    loadMessageList = (userDetails) => {
        this.props.getMessagesList(userDetails)
        const { messagesList } = this.props;
        
    }

    constructor(props) {
        super(props);
        this.handleReadPress = this.handleReadPress.bind(this);
    }

    handleReadPress = async (msg) => {
        const { userDetails } = this.props;

        msg.isRead = !msg.isRead
        await this.props.updateMessage(msg)
        this.props.getMessagesList(userDetails);
    }

    render() {
        const { error, isLoading, messagesList } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        //if (isLoading) { return <View><Text>Loading...</Text></View> }

        return (
            <Container >
                <Background />
                <Title title='Messages' icon="ios-chatboxes" />

                <Content style={styles.container}>
                    {messagesList <= 0 ? (
                        <Text>No messages.</Text>
                    ) : (
                            <MessageList list={messagesList} onReadPress={this.handleReadPress} />
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

