import React from 'react';
import { List, Text } from 'native-base';
import PropTypes from 'prop-types';
import MessageCard from '../MessageCard'

export default MessageList = ({ list }) =>
    (
        <List>
            {list === undefined || list.length == 0 && <Text>No messages.</Text>}

            {list &&
                list.map(message =>
                    <MessageCard key={message.id} message={message} />
                )
            }
        </List>
    )

MessageList.propTypes = {
    list: PropTypes.array.isRequired,
};