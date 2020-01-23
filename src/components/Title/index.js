import React from 'react';

import { Text, StyleSheet } from 'react-native'

import styles from './style'
import { View, Icon } from 'native-base';

export default Title = ({ title, icon }) =>
    (

        <View style={{
            flex: 0,
            flexDirection: 'row',
            shadowColor: '#707070',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 2,
            margin:20,
        }}>
            <View style={{ width: 50, height: 50 }} >
                <Icon type='Ionicons' name={icon}
                    style={{ fontSize: 40, color: "#777777" }} />
            </View>
            <View style={{ height: 50 }} >
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </View>

    )
