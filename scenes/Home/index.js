import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Icon, Button, Badge, Left } from 'native-base';


export default class Login extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/Logo_vert.png')} style={styles.logo} />
                <Text style={styles.textWelcome}>Welcome to Mindroom Student APP. </Text>
                <Text style={styles.textContainer}>Here you cand find important info as your attedance, class schedule, notifications, our address and more.</Text>

                <Button block info>
                        <Badge info>
                            <Text>2</Text>
                        </Badge>
                    <Text>New Notifications</Text>
                    </Button>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    textWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },

    textContainer: {
        fontSize: 20,
        //textAlignVertical: 'center',
        flexGrow: 1,
        textAlign: 'justify',
        marginTop: 20
    },

    logo: {
        height: 250,
        width: 250
    },

    container: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
});