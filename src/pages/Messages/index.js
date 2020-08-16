import React, { useContext } from 'react';
import { Container, Content, Text } from 'native-base';
import MessageCard from './components/MessageCard'
import Title from 'msa-mobile/src/components/Title';
import Background from 'msa-mobile/src/components/Background'
import { useLazyQuery } from "@apollo/react-hooks";
import { AppContext } from "msa-mobile/src/app/AppContextProvider";
import { GET_MESSAGES_BY_STUDENTS } from 'msa-mobile/src/api/message'
import { useSubscribeMessages } from 'msa-mobile/src/hooks/useSubscribeMessages'

import styles from './style'

export default MessagesScreen = () => {
  useSubscribeMessages();
  const { state, authContext } = useContext(AppContext);
  const { student } = state

  const [fetchMessages] = useLazyQuery(GET_MESSAGES_BY_STUDENTS, {
    onCompleted: data => {
      authContext.setMessages(data.messagesSentByStudent)
    },
  });

  const { messages } = state

  return <Container >
    <Background />
    <Title title='Messages' icon="ios-chatboxes" />

    <Content style={styles.container}>
      {messages == null || messages.length === 0 ? (
        <Text>No messages.</Text>
      ) : (
          messages.map(message => <MessageCard key={message.id} message={message} callback={() => fetchMessages({ variables: { student: { id: student.id } } })} />)
        )}
    </Content>
  </Container>
}