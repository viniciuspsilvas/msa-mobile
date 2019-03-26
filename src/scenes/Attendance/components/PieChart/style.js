import React, { StyleSheet } from 'react-native'

const color = '#b2b2b2'


export default StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
       
    },

    titleStyle: {
        color: color,
    },

    gauge: {
        position: 'relative',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },

    textContainer: {
        position: 'relative',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 22,
    },

});