import React from 'react'

import PropTypes from 'prop-types';

import styles from './style'

import { Text, View, Image } from 'react-native';

import BadgeButton from "../BadgeButton"

export default HomeScreen = ({ qtdMessage, onClick }) => {

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/Logo_vert.png')} style={styles.logo} />

            <Text style={styles.textWelcome}>Welcome to Mindroom Student APP. </Text>
            <Text style={styles.textContainer}>Here you can find important infos as your attedance, class schedule, notifications, our address and more.</Text>

            <View style={{width:"100%"}}>
                <BadgeButton qtdMessage={qtdMessage} onClick={onClick} />
            </View>
        </View>
    )
}

