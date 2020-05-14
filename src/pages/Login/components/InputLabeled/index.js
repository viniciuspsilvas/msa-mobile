import React from 'react'
import { View, TextInput, Text } from 'react-native';

import styles from './style'

export default InputLabeled = ({ input, label, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error !== undefined;

    const  styleInput = hasError ? styles.inputErro : styles.input;
    const  styleLabel = hasError ? styles.labelErro : styles.label;

    return (
        <View>
            <Text for="name" style={styleLabel}>{label}</Text>
            <TextInput
                {...input}
                {...custom}
                underlineColorAndroid="transparent"
                style={styleInput}
            />
        </View>
    )
}

