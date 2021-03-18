import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Title from 'msa-mobile/src/components/Title';
import { Container, Card, CardItem, Icon, Body } from 'native-base';
import Background from 'msa-mobile/src/components/Background'

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    cardItemImage: {
        alignItems: 'center'
    },

    bold: {
        fontWeight: 'bold'
    },
    image: {
        width: deviceWidth / 1.23,
        height: deviceWidth / 1.9
    }
});


const AboutScreen = () => {
    return (
        <Container>
            <Background />
            <Title title='About' icon='ios-information-circle-outline' />

            <Card style={{ marginLeft: 20, marginRight: 20 }}>
                <CardItem>
                    <Body>
                        <View style={styles.cardItemImage}>
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={require('msa-mobile/assets/background.png')} />
                        </View>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>
                            <Text style={styles.bold}>Email: </Text>enrolments@mindroom.com.au
                            </Text>
                        <Text>
                            <Text style={styles.bold}>Telephone: </Text>07 5535 8013
                            </Text>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={styles.bold}>Gold Coast: </Text>
                        <Text>1/37 Connor St, Burleigh Heads QLD 4220 </Text>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={styles.bold}>Sunshine Coast: </Text>
                        <Text>3c/66 Jessica Blvd, Minyama QLD 4575</Text>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>
                            <Text style={styles.bold}>CRICOS Code: </Text>03586M
                            </Text>
                        <Text>
                            <Text style={styles.bold}>RTO CODE: </Text>45137
                            </Text>
                    </Body>
                </CardItem>
            </Card>
        </Container>
    );
}

export default AboutScreen