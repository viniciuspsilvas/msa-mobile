import React from 'react';
import { Container, Icon, Content, Text, TouchableHighlight } from 'native-base';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Alert } from 'react-native'
import Loader from 'msa-mobile/src/components/Loader'

import MessageCard from './components/MessageCard'
import Title from 'msa-mobile/src/components/Title';
import Background from 'msa-mobile/src/components/Background'
import { useSubscribeMessages } from 'msa-mobile/src/hooks/useSubscribeMessages'

import styles from './style'

export default MessagesScreen = () => {
    const { loading, data, error, refetch } = useSubscribeMessages()

    if (error) {
        console.log(error, data)
        Alert.alert(error.message)
    }
    if (loading || !data) { return <Loader /> }

    const messagesList = data.messagesSentByStudent //.map((msg) => ({ key: `${msg.id}`, ...msg }));

    return (
        <Container >
            <Background />
            <Title title='Messages' icon="ios-chatboxes" />

            <Content style={styles.container}>
                {!messagesList && messagesList.length === 0 ? (
                    <Text>No messages.</Text>
                ) : (
                        messagesList.map(message => <MessageCard key={message.id} message={message} callback={refetch} />)
                    )}
            </Content>
        </Container>
    );
}