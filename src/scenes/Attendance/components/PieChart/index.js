import React from 'react';
import {
    View,
    Text,
} from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

import PropTypes from 'prop-types';

import styles from './style'

export default MessageList = ({ progress }) => {

    let progressColor = '#ed6868'
    let text = 'You are in trouble.'



    if (progress >= 0.9) {
        progressColor = '#4ce0b3'
        text = 'You are going well. Keep doing it!'

    } else if (progress >= 0.8) {
        progressColor = '#fce988'
        text = 'Attention! Do not miss classes anymore.'
    }

    return (
        <View style={styles.container}>
            <ProgressCircle
                style={{ height: 200 }}
                progress={progress}
                animate={true}
                strokeWidth={15}
                progressColor={progressColor}
            >
                <View style={styles.gauge}>
                    <Text style={styles.gaugeText}>{progress * 100}%</Text>
                </View>

            </ProgressCircle>

            <View style={styles.textContainer} >
                <Text style={styles.text}> {text} </Text>
            </View>
        </View>
    )
}

MessageList.propTypes = {
    progress: PropTypes.number.isRequired,
};