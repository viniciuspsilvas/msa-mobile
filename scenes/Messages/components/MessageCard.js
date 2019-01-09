import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import PropTypes from 'prop-types';

export default class MessageCard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { title, body, createdAt, category } = this.props;

        let dateNew = new Date(createdAt);
        let icon = this.getIcon(category);

        var res = Math.abs(Date.now() - dateNew) / 1000;
        var days = Math.floor(res / 86400);

        return (
            <Card>
                <CardItem >
                    <Left>
                        <Thumbnail source={icon} />
                        <Body>
                            <Text>{title}</Text>
                            <Text note>{dateNew.toDateString()}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem >
                    <Body>
                        <Text>
                            {body}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent >
                            <Icon name="thumbs-up" />

                        </Button>
                    </Left>
                    <Body>
                        <Button transparent color='black'>
                            <Icon name="chatbubbles" />

                        </Button>
                    </Body>
                    <Right>
                        <Text>{days}d ago</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }


    getIcon(category) {

        const INFO_ICON = require('../../../assets/icon-info.png');
        const ALERT_ICON = require('../../../assets/icon-alert.png');

        switch (category) {
            case 'info':
                return INFO_ICON;
            case 'alert':
                return ALERT_ICON;
            default:
                return INFO_ICON;
        }

    }
}

MessageCard.propTypes = {
    content: PropTypes.string
}
MessageCard.defaultProps = {
    content: 'Message One'
}