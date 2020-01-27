import React from 'react';
import { List, ListItem, Body, Right, Text } from 'native-base';
import Moment from 'react-moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './style'

import MessageCard from '../MessageCard'

export default MessageList = ({ list }) =>
    (
        <List>
            {list === undefined || list.length == 0 && <Text>No messages.</Text>}

            {list &&
                list.map(message =>
                    <MessageCard key={message._id} message={message} />
                )
            }
        </List>
    )

MessageList.propTypes = {
    list: PropTypes.array.isRequired,
};