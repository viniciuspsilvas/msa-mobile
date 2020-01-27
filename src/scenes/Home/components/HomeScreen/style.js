import React, { StyleSheet } from 'react-native'


export default  StyleSheet.create({
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

    textDesc: {
        fontSize: 15,
        flexGrow: 1,
        textAlign: 'justify',
        marginTop: -50
    },

    logo: {
        height: 250,
        width: 250,
        resizeMode : 'contain',
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
});