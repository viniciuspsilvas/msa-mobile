import { useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from "@apollo/react-hooks";
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, PUSHER_CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'
import { GET_MESSAGES_BY_STUDENTS } from 'msa-mobile/src/api/message'

export function useSubscribeMessages() {
    const { actions } = useContext(AppContext);
    const user = actions.getLoggedUser();

    const { loading, data, error, refetch } = useQuery(GET_MESSAGES_BY_STUDENTS, {
        variables: { student: { id: user.id } }
    });

    useFocusEffect(() => {
        const pusher = new Pusher(PUSHER_APP_KEY, { cluster: PUSHER_CLUSTER, forceTLS: true });
        const channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        channel.bind(`msa.message.student.${user.id}`, refetch);

        return function cleanup() {
            pusher.unsubscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        };
    }, []);

    return { loading, data, error, refetch };
}