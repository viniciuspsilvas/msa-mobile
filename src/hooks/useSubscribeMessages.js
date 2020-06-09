import { useContext, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { AppContext } from "msa-mobile/src/app/AppContextProvider";

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, PUSHER_CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'
import { GET_MESSAGES_BY_STUDENTS } from 'msa-mobile/src/api/message'

export function useSubscribeMessages() {
    const { actions } = useContext(AppContext);
    const student = actions.getLoggedUser();
    const isLogged = student && student.token;

       const { loading, data, error, refetch } = useQuery(GET_MESSAGES_BY_STUDENTS, {
           variables: { student: { id: student.id } },
           skip: !isLogged 
       });

       useEffect(() => {
        refetch()
        const pusher = new Pusher(PUSHER_APP_KEY, { cluster: PUSHER_CLUSTER, forceTLS: true });
        const channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        channel.bind(`msa.message.student.${student.id}`, refetch);

        return function cleanup() {
            pusher.unsubscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        };
    }, [student]);

    return { loading, data, error, refetch };
}