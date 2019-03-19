import React, { StyleSheet } from 'react-native'



const borderRadius =  10;

export default StyleSheet.create({

    newMessageButton: {
        backgroundColor: '#e51616',
        borderRadius,
    },

    noMessageButton: {
        backgroundColor: '#efc4c4',
        borderRadius,
       
    },

    newMessageText: {
        color: 'white',
    },

    noMessageText: {
        color: '#876a6a',
    }


});