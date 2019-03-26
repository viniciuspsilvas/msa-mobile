import React from 'react';
import Divider from 'react-native-divider';

import { Text } from 'react-native'

import PropTypes from 'prop-types';

import styles from './style'
import { View } from 'native-base';

export default Title = ({ title }) =>
    (

        <View style={{marginTop:20, marginBottom:20}}>
            <Divider
                borderColor="#c6c6c6"
                color="#777777"

                orientation="left">
                <Text style={styles.title}>
                    {title}
                </Text>
            </Divider>
        </View>
    )

Title.propTypes = {
    title: PropTypes.string.isRequired,
};