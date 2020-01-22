import React from 'react'
import { Text, View, Image } from 'react-native';

import styles from './style'

import BadgeButton from "../BadgeButton"

export default HomeScreen = ({ qtdMessage, onClick }) => {

    return (
        <View style={styles.container}>
            <Image source={require('msa-mobile/assets/Logo_vert.png')} style={styles.logo} />

            <Text style={styles.textWelcome}>Welcome to Mindroom Student APP. </Text>
            <Text style={styles.textContainer}>This app will ensure you are receiving the latest information about the school and your course.</Text>
            <Text style={styles.textDesc} >Important messages from us will appear in the app and you can always revisit them. Please note that you can't reply to these messages.</Text>

            <View style={{width:"100%"}}>
                <BadgeButton qtdMessage={qtdMessage} onClick={onClick} />
            </View>
        </View>
    )
}

