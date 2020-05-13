import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Moment from 'react-moment';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { UPDATE_MESSAGE } from 'msa-mobile/src/api/message'
import { useMutation } from "@apollo/react-hooks";

export default MessageCard = ({ message, callback }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { title, body, createdAt, read } = message;

    const [updateMessage] = useMutation(UPDATE_MESSAGE,
        {
            onCompleted() { if (callback) callback() },
            onError(error) {
                console.error(error)
                Alert.alert(error.message)
            }
        });

    useEffect(() => {
        if (isOpen && !read) {
            updateMessage({ variables: { message: { id: message.id, read: true } } })
        }
    }, [isOpen])

    return (
        <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
            <View style={styles.container} >

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }} >

                    <View >
                        {read ? (
                            <Icon color="#707070" name='envelope-open' size={20} type='font-awesome' />
                        ) : (
                                <Icon color="#000" name='envelope' size={20} type='font-awesome' />
                            )}
                    </View>

                    <View style={{ alignItems: 'flex-start', width: 230, flexDirection: 'row', marginLeft: 5 }}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <View style={{ width: 80 }} >
                        <Text style={!read ? styles.unreadMsg : styles.readMsg} note >
                            <Moment element={Text} format={"DD/MM/YYYY HH:mm"} >{createdAt}</Moment>
                        </Text>
                    </View>
                </View>

                {isOpen && <View >
                    <Text style={styles.body}>{body}</Text>
                </View>}

                <View style={{ alignSelf: 'flex-end' }} >
                    <Icon name={`chevron-${isOpen ? 'up' : 'down'}`} color="#707070" size={12} type='font-awesome' />
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: 'rgba(192,192,192,0.3)',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,

    },

    container2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    title: {
        fontSize: 15,
        color: '#707070'
    },

    body: {
        marginTop: 5,
        fontSize: 12,
        color: '#707070'
    },

    iconRead: {
        fontSize: 20,
        color: '#707070'
    },

    dateTime: {
        fontSize: 10,
        color: '#707070'
    },

    readMsg: {
        textAlign: 'right',
        color: '#707070'
    },

    unreadMsg: {
        textAlign: 'right',
        color: '#000'
    }

});
