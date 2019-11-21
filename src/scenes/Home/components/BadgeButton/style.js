import React, { StyleSheet } from 'react-native'

const borderRadius = 10;

export default StyleSheet.create({

    newMessageButton: {
        backgroundColor: '#e51616',
        borderRadius,
    },

    noMessageButton: {
        backgroundColor: '#efc4c4',
        backgroundColor: 'rgba(239, 196, 196, 0.8)',
        height: 45,
        borderRadius,
        alignItems: 'center',
    },

    newMessageText: {
        color: 'white',
    },

    noMessageText: {
        color: '#876a6a',
        marginTop: 10
    }


});