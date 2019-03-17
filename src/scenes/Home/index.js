import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon, Button, Badge } from 'native-base';

import { getMessagesList } from "../Messages/actions"
import { connect } from "react-redux";

class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (<Icon name='ios-home' type='Ionicons' />)
    };


    /*
    Constructor 
    */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userDetails } = this.props;
        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(userDetails));
    }

    render() {

        const { error, isLoading, messagesList } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        if (isLoading) { return <View><Text>Loading...</Text></View> }

return (
            <View style={styles.container}>
                <Image source={require('../../assets/Logo_vert.png')} style={styles.logo} />
                <Text style={styles.textWelcome}>Welcome to Mindroom Student APP. </Text>
                <Text style={styles.textContainer}>Here you cand find important info as your attedance, class schedule, notifications, our address and more.</Text>

                {messagesList.message > 0 &&
                    <Button block info onPress={() => this.props.navigation.navigate("messages")}>
                        <Badge info>
                            <Text>{messagesList.message.filter(msg => !msg.isRead).length > 1 && messagesList.message.filter(msg => !msg.isRead).length}</Text>
                        </Badge>
                        <Text>New Notifications</Text>
                    </Button>
                }

            </View>
        );
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.messagesReducer,
        userDetails: state.loginReducer.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesList: (filter) => dispatch(getMessagesList(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    textWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },

    textContainer: {
        fontSize: 20,
        //textAlignVertical: 'center',
        flexGrow: 1,
        textAlign: 'justify',
        marginTop: 20
    },

    logo: {
        height: 250,
        width: 250
    },

    container: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
});