import React, { Component } from 'react';
import { Container, Text, Content, Icon } from 'native-base';

import MessageCard from './components/MessageCard'
import axios from 'axios';

var config = require('../../config/config');


export default class Messages extends Component {

    /*
    Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        };
    }

    componentDidMount() {

        const studentIdFilter = {
            filter: "{'where':{'studentId':" + 1 + "} , 'order':'createdAt DESC'}" // Filtrar pelo student logado
        }
        axios.get(config.backend.messages, studentIdFilter)
            .then(res => {

                this.setState({ messageList: res.data })
            })
            .catch(err =>
                console.log(err)
            );

    }

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    };

    render() {

        const messageList = this.state.messageList;

        //const isNotEmpty = messageList && messageList.length > 0;


        var messages = [];

        for (let i = 0; i < messageList.length; i++) {

            let message = messageList[i];

            messages.push(
                <MessageCard key={i}
                    title={message.title}
                    body={message.body}
                    createdAt={message.createdAt}
                    category={message.category}
                />
            )
        }

        return (
            <Container>
                <Content>

                    <Text style={{fontWeight: 'bold'}}>
                        Messages
                        </Text>
                    {messages.length > 0 ? messages
                        :
                        (<Text> Empty list </Text>)
                    }
                </Content>
            </Container>
        );
    }
}