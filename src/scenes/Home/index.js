import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import Background from '../../components/Background'

import { getMessagesList } from "../Messages/actions"
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'native-base';

import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY, CLUSTER, PUSHER_MSA_MESSAGE_CHANNEL } from 'react-native-dotenv'

const Home = (props) => {
    const dispatch = useDispatch();

    const { error, messagesList } = useSelector(state => state.messagesReducer);
    const { userDetails } = useSelector(state => state.loginReducer);

    const qtdMessage = messagesList.length > 0 ? messagesList.filter(msg => !msg.read).length : 0;

    useEffect(() => {
        dispatch(getMessagesList(userDetails))

        const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: CLUSTER,
            forceTLS: true
        });

        const channel = pusher.subscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        channel.bind(`msa.message.student.${userDetails.id}`, () => dispatch(getMessagesList(userDetails)));

        return function cleanup() {
            pusher.unsubscribe(PUSHER_MSA_MESSAGE_CHANNEL);
        };
    }, []);

    if (error) { Alert.alert(error.message) };

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        }} >
            <Background />
            <HomeScreen
                qtdMessage={qtdMessage}
                onClick={() => props.navigation.navigate("messages")}
            />
        </View>
    );
}

Home.navigationOptions = () => ({
    drawerLabel: 'Home',
    drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
});

export default Home;