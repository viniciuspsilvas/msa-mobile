import React from 'react'
import { View, Text } from 'react-native';

import { Button, Badge } from 'native-base';

import PropTypes from 'prop-types';

import styl from './style'

export default BadgeButton = ({ qtdMessage, onClick }) => {
    const hasMessage = qtdMessage > 0;

    return (
        <View>
            {
                hasMessage ? (
                    <Button block onPress={onClick}
                        style={styl.newMessageButton}
                        >
                        <Badge  style={styl.newMessageButton}>
                            <Text style={styl.newMessageText}>{qtdMessage}</Text>
                        </Badge>
                        <Text style={styl.newMessageText}> New Notifications</Text>
                    </Button>
                ) : (
                        <View style={styl.noMessageButton}>
                            <Text style={styl.noMessageText}> No Notifications</Text>
                        </View>
                    )
            }
        </View>
    )
}

BadgeButton.propTypes = {
    qtdMessage: PropTypes.number.isRequired
};