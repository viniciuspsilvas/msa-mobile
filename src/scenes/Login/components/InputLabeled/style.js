import React, { StyleSheet } from 'react-native'

export default StyleSheet.create({

    label: {
        color: 'black',
        fontSize: 20,
    },

    labelErro: {
        fontSize: 20,
        color: 'red',
    },

    input: {

        height: 50,
        //width: 250,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',

        marginTop: 10,

        fontSize: 20,
        color: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        textDecorationLine: 'none'
    },

    inputErro: {

        height: 50,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'white',

        marginTop: 10,

        fontSize: 20,
        color: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        textDecorationLine: 'none'
    },

});