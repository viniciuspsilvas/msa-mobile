import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native';

export const inputLabeled = ({ input, label, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error !== undefined;

    return (
        <View>
            <Text for="name" style={styles.label}>{label}</Text>
            <TextInput

                {...input}
                {...custom}
                underlineColorAndroid="transparent"
                style={styles.input}
            />
            {hasError && <Text style={styles.error}>{error}</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        
    },
    input: {

        height: 50,
        borderColor: 'black',
        borderWidth: 1,

        marginTop:10,

        fontSize: 20,
        color: 'black',
        borderRadius: 3,
        paddingHorizontal: 10,

        textDecorationLine: 'none'
    },

    error: {
        color: 'white',
        marginTop:10,
        fontSize: 13,
    },
});

