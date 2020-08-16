import { useContext, useEffect } from 'react';
import { useLazyQuery } from "@apollo/react-hooks";
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, PUSHER_CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'
import { GET_MESSAGES_BY_STUDENTS } from 'msa-mobile/src/api/message'

export function useSubscribeMessages() {
    const { state, dispatch } = useContext(AppContext);
    const { student } = state

    const [fetchMessages, { error }] = useLazyQuery(GET_MESSAGES_BY_STUDENTS, {
        onCompleted: data => {
            dispatch({ type: 'SET_MESSAGES', messages: data.messagesSentByStudent });
        },
    });

    if (error) {
        console.error("Error at useSubscribeMessages", error)
    }

    const getMessages = () => {
        fetchMessages({ variables: { student: { id: student.id } } })
    }

    useEffect(() => {
        if (student && student.id) {
            getMessages();
            const pusher = new Pusher(PUSHER_APP_KEY, { cluster: PUSHER_CLUSTER, forceTLS: true });
            const channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);
            channel.bind(`msa.message.student.${student.id}`, () => getMessages());

            return function cleanup() {
                pusher.unsubscribe(PUSHER_MSA_MESSAGE_CHANNEL);
            };
        }
    }, [student]);

    return { getMessages };
}