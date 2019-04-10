import React, { Component } from 'react';
import { Container, Icon, Content, Text, View } from 'native-base';

import { connect } from "react-redux";

import { getMessagesList } from "./actions"

import MessageList from './components/MessageList'
import Title from '../../components/Title';

import styles from './style'

class Messages extends Component {

    static navigationOptions = ({ navigations }) => ({
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    });


    /*
    Constructor 
    */
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        const { userDetails } = this.props;

        this.props.navigation.addListener('willFocus', () => this.props.getMessagesList(userDetails));
    }

    componentWillUnmount() {
    }

    render() {
        const { error, isLoading, messagesList } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }
        if (isLoading) { return <View><Text>Loading...</Text></View> }

        return (
            <Container >
                <Title title='Messages' />

                <Content style={styles.container}>
                    {messagesList <= 0 ? (
                        <Text>No messages.</Text>
                    ) : (
                        <MessageList list={messagesList.message} />
                    )}
                </Content>

            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
