import React, { useContext, useEffect } from 'react';
import { Container, Icon, Content, Text, List } from 'native-base';
import { Alert } from 'react-native'

import { useMutation, useQuery } from "@apollo/react-hooks";
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, PUSHER_CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'
import { GET_MESSAGES_BY_STUDENTS, UPDATE_MESSAGE } from 'msa-mobile/src/api/message'

import MessageCard from './components/MessageCard'
import Title from 'msa-mobile/src/components/Title';
import Background from 'msa-mobile/src/components/Background'

import styles from './style'

export default MessagesScreen = () => {
    const { actions } = useContext(AppContext);
    const user = actions.getLoggedUser();

    const { loading, data, error, refetch } = useQuery(GET_MESSAGES_BY_STUDENTS, {
        variables: { student: { id: user.id } }
    });

    useEffect(() => {
        const pusher = new Pusher(PUSHER_APP_KEY, { cluster: PUSHER_CLUSTER, forceTLS: true });
        const channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        channel.bind(`msa.message.student.${user.id}`, () => refetch());

        return function cleanup() {
            pusher.unsubscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        };
    }, []);


    if (error) {
        console.log(error, data)
        Alert.alert(error.message)
    }
    if (loading || !data) { return <Loader /> }

    const messagesList = data.messagesSentByStudent
    const [updateMessage, { loading: updateLoading }] = useMutation(UPDATE_MESSAGE,
        {
            onCompleted() {
                refetch()
            },
            onError(error) {
                console.error(error)
                Alert.alert(error.message)
            }
        });

    messagesList.find(msg => {
        if (!msg.isRead) {
            setTimeout(function () {
                msg.isRead = true;
                updateMessage({ variables: { message: { id: msg.id, read: true } } })
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
                        <List>
                            {messagesList === undefined || messagesList.length == 0 && <Text>No messages.</Text>}
                            {messagesList &&
                                messagesList.map(message =>
                                    <MessageCard key={message.id} message={message} />
                                )
                            }
                        </List>
                    )}
            </Content>
        </Container>
    );
}