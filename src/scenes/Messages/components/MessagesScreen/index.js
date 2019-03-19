import React from 'react';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';

import MessageCardList from '../MessageCardList'
import MessageList from '../MessageList'

import styles from './style'

export default MessagesScreen = ({ messagesList }) => {

    var msgUnreadList = messagesList.filter(msg => !msg.isRead);
    var msgList = messagesList.filter(msg => msg.isRead);

    return (
        <Container style={styles.container}>
            <Content>

                <Text style={styles.title}>Messages</Text>

                {messagesList <= 0 && <Text>No messages.</Text>}

                <MessageCardList list={msgUnreadList} />
                <MessageList list={msgList} />
            </Content>
        </Container>
    );
}

MessagesScreen.propTypes = {
    messagesList: PropTypes.array.isRequired
};