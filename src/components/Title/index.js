import React from 'react';
import Divider from 'react-native-divider';

import { Text } from 'react-native'

import PropTypes from 'prop-types';

import styles from './style'
import { View, Icon } from 'native-base';

export default Title = ({ title, icon }) =>
    (

        <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Divider
                borderColor="#c6c6c6"
                color="#777777"
                orientation="left">

                <Icon type='Ionicons' name={icon}
                    style={{ fontSize: 50, color:"#777777" }} />

                <Text style={styles.title}>
                    {"   "+title}
                </Text>
            </Divider>
        </View>
    )

Title.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};