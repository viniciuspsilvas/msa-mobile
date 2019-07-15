import React from 'react';
import { List, ListItem, Body, Right, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import styles from './style'

var options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
};


export default MessageList = ({ list, onReadPress }) =>
    (
        <List>
            {list === undefined || list.length == 0 && <Text>No messages.</Text>}

            {list &&
                list.map(message =>
                    <ListItem key={message.id}  >
                        <TouchableOpacity onPress={() => onReadPress(message)}>
                            {message.isRead ? (
                                <Icon name='envelope-open' size={20} type='font-awesome' />
                            ) : (
                                    <Icon name='envelope' size={20} type='font-awesome' />
                                )}
                        </TouchableOpacity>
                        <Body>
                            <Text style={!message.isRead ? styles.unreadMsg : {}}>{message.title}</Text>
                            <Text style={!message.isRead ? styles.unreadMsg : {}} note>{message.body}</Text>
                        </Body>

                        <Right>
                            <Text style={!message.isRead ? styles.unreadMsg : {}} note >
                                {new Date(message.createdAt).toLocaleDateString('en-US', options)}
                            </Text>
                        </Right>
                    </ListItem>
                )
            }
        </List>
    )

MessageList.propTypes = {
    list: PropTypes.array.isRequired,
};