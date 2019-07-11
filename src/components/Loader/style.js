import React, { StyleSheet } from 'react-native'

export default StyleSheet.create({

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});