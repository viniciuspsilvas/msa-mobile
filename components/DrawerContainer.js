import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation'; // Version can be specified in package.json

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const CustomDrawerContentComponent = (props) => (

    <ScrollView>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/icon.png')} style={{ height: 120, width: 120, borderRadius: 60 }}>
            </Image>
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
)
