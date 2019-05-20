import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';

keyExtractor = (item, index) => index.toString()

export default ItemSetting = props => {
    const { icon, desc, value } = props;

    return (
        <ListItem icon>
            <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name={icon} />
                </Button>
            </Left>
            <Body>
                <Text>{desc}</Text>
            </Body>
            <Right>
                <Switch value={value} />
            </Right>
        </ListItem>
    );
}

ItemSetting.propTypes = {
    icon: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired
};