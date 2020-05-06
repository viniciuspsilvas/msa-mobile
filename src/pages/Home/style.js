import React, { StyleSheet } from 'react-native'

const borderRadius = 10;


export default StyleSheet.create({
    textWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },

    textContainer: {
        fontSize: 18,
        //textAlignVertical: 'center',
        flexGrow: 1,
        textAlign: 'justify',
        marginTop: 20
    },

    textDesc: {
        fontSize: 15,
        flexGrow: 1,
        textAlign: 'justify',
    },

    logo: {
        height: 250,
        width: 250,
        resizeMode: 'contain',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },

    container: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },

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