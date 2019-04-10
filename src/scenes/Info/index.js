import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import {  Card, CardItem, Icon, Body } from 'native-base';

import Title from '../../components/Title';

export default class Info extends Component {

    static navigationOptions = {
        drawerLabel: 'Info',
        drawerIcon: () => (<Icon name='ios-information-circle-outline' />)
    };

    render() {
        return (
            <View style={styles.container}>
            
                <Title title='Info' />


                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Body style={styles.cardItemBody}>
                            <View style={styles.cardItemImage}>
                                <Image
                                    style={{ height: 200, width: 350 }}
                                    resizeMode="contain"
                                    source={require('msa-mobile/assets/background.png')} />
                            </View>
                        </Body>
                    </CardItem>

                    <CardItem>
                        <Body>
                            <Text>
                                <Text style={styles.bold}> Email: </Text> enrolments@mindroom.com.au
                            </Text>
                            <Text>
                                <Text style={styles.bold}> Telephone: </Text> 07 5535 8013
                            </Text>
                            <Text>
                                <Text style={styles.bold}> Address: </Text> 1/37 Connor St, Burleigh Heads QLD 4220
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Emergency</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                <Text style={styles.bold}> Police: </Text> 000
                            </Text>
                            <Text>
                                <Text style={styles.bold}> Fireman: </Text> 999
                            </Text>
                            <Text>
                                <Text style={styles.bold}> Ambulance: </Text> 999
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        margin: 5,
    },

    cardItemImage: {
        alignItems: 'center'
    },

    bold: {
        fontWeight: 'bold'
    },

    cardItemBody: {

    },
});