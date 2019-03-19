import React from 'react'
import { View, Text } from 'react-native';

import { Button, Badge } from 'native-base';

import PropTypes from 'prop-types';

import styles from './style'

export default BadgeButton = ({ qtdMessage, onClick }) => {
    const hasMessage = qtdMessage > 0;

    return (
        <View>
            {
                hasMessage ? (
                    <Button block 
                        style={styles.newMessageButton}
                        >
                        <Badge  style={styles.newMessageButton}>
                            <Text style={styles.newMessageText}>{qtdMessage}</Text>
                        </Badge>
                        <Text style={styles.newMessageText}> New Notifications</Text>
                    </Button>
                ) : (
                        <Button block disabled
                            style={styles.noMessageButton}>
                            <Text style={styles.noMessageText}> No Notifications</Text>
                        </Button>
                    )
            }
        </View>
    )
}

BadgeButton.propTypes = {
    qtdMessage: PropTypes.number.isRequired
};