import React from "react";
import { Text, View, Image, Alert } from 'react-native';
import { Button, Badge } from 'native-base';
import styles from './style'

import Background from 'msa-mobile/src/components/Background'
import Loader from 'msa-mobile/src/components/Loader'
// import { useSubscribeMessages } from 'msa-mobile/src/hooks/useSubscribeMessages'

export default HomeScreen = ({ navigation }) => {
    // const { loading, data, error } = useSubscribeMessages()
/* 
    if (error) {
        console.log(error, data)
        Alert.alert(error.message)
    }
    if (loading || !data) { return <Loader /> } */

    const qtdMessage = 1//data.messagesSentByStudent.filter(msg => !msg.read).length;

    return (
        <View style={{ lexGrow: 1, height: '100%' }}>
            <Background />
            <View style={styles.container}>
                <Image source={require('msa-mobile/assets/Logo_vert.png')} style={styles.logo} />

                <Text style={styles.textWelcome}>Welcome to Mindroom Student APP. </Text>
                <Text style={styles.textContainer}>This app will ensure you are receiving the latest information about the school and your course.</Text>
                <Text style={styles.textDesc} >Important messages from us will appear in the app and you can always revisit them. Please note that you can't reply to these messages.</Text>

                {
                    qtdMessage > 0 ? (
                        <Button block
                            onPress={() => navigation.navigate('Messages')}
                            style={styles.newMessageButton}
                        >
                            <Badge style={styles.newMessageButton}>
                                <Text style={styles.newMessageText}>{qtdMessage}</Text>
                            </Badge>
                            <Text style={styles.newMessageText}> New Notifications</Text>
                        </Button>
                    ) : (
                            <View style={styles.noMessageButton}>
                                <Text style={styles.noMessageText}> No Notifications</Text>
                            </View>
                        )
                }

            </View>
        </View>
    )
}

