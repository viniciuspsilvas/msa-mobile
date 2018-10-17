import React, { Component } from 'react';
import { Container, Text, Content, Icon } from 'native-base';

import MessageCard from './components/MessageCard'

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

        // List messages
        fetch(config.backend.messages, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(resp => resp.json())
            .then(messageList => {
                this.setState({ messageList: messageList })
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<Icon type='Ionicons' name='ios-chatboxes' />)
    };

    render() {

        const messageList = this.state.messageList;
        //const isNotEmpty = messageList && messageList.length > 0;

/* 
        var listMessagem = [

            // userId, data, title, text, isDownloaded, isRead, isArchived, category

            {
                title: "Friday! New Year Holiday",
                text: "Nao havera aula nos dias xxx ate zzz",
                date: new Date("Oct 3, 2018 20:15:10"),
                isDownloaded: true,
                isRead: true,
                isArchived: true,
                category: "info"
            },
            {
                title: "Monday! New Year Holiday",
                text: "Nao havera aula nos dias xxx ate zzz",
                date: new Date("Oct 10, 2018 20:15:10"),
                isDownloaded: true,
                isRead: true,
                isArchived: true,
                category: "alert"
            },

        ]; */

        var messages = [];

        for (let i = 0; i < messageList.length; i++) {

            let message = messageList[i];

            messages.push(
                <MessageCard key={i}
                    title={message.title}
                    text={message.text}
                    date={message.date}
                    category={message.category}
                />
            )
        }

        return (
            <Container>
                <Content>
                {messages.length > 0 ? messages
                    :
                    (<Text> Empty list </Text>)
                }
                </Content>
            </Container>
        );
    }
}