import React from 'react';
import { Card, CardItem, Thumbnail, Container, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { getDaysFromDate } from "../../../../util/dateTime"
import PropTypes from 'prop-types';

getIcon = category => {

    const INFO_ICON = require('msa-mobile/assets/icon-info.png');
    const ALERT_ICON = require('msa-mobile/assets/icon-alert.png');

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

    const { title, body, createdAt, category, handleBackButton } = props;

    let icon = getIcon(category);
    let dateNew = new Date(createdAt);
    var days = getDaysFromDate(createdAt)

    return (

        <Container>
            <Button transparent onPress={handleBackButton} >
                <Icon name='arrow-back' />
                <Text> Back</Text>
            </Button>
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
                            <Icon name="archive" />

                        </Button>
                    </Left>

                    <Right>
                        <Text>{days}d ago</Text>
                    </Right>
                </CardItem>
            </Card>
        </Container>
    );
}


MessageCard.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    handleBackButton: PropTypes.func.isRequired

};