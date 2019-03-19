import React from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { getDaysFromDate } from "../../../../util/dateTime"

getIcon = category => {

    const INFO_ICON = require('../../../../assets/icon-info.png');
    const ALERT_ICON = require('../../../../assets/icon-alert.png');

    switch (category) {
        case 'info':
            return INFO_ICON;
        case 'alert':
            return ALERT_ICON;
        default:
            return INFO_ICON;
    }
}

export default MessageCard = props => {

    const { title, body, createdAt, category } = props;
    let icon = getIcon(category);
    let dateNew = new Date(createdAt);
    var days = getDaysFromDate(createdAt)

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
