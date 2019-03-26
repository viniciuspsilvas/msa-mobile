import React from 'react';
import { List, ListItem, Body, Right, Text } from 'native-base';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import styles from './style'

var options = { 
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
 };


export default MessageList = ({ list }) =>
    
    
    ( 
        <List>

        {list === undefined || list.length == 0 && <Text>No messages.</Text> }

            {list &&
                list.map(message =>
                    <ListItem key={message.id} >

                        {message.isRead ? (
                            <Icon name='envelope' size={30} type='font-awesome' />
                        ) : (
                                <Icon name='envelope-open' size={30} type='font-awesome' />
                            )}
                        <Body>


                            <Text>{message.title}</Text>
                            <Text note>{message.body}</Text>
                        </Body>

                        <Button
                            titleStyle={styles.titleStyle}
                            buttonStyle={styles.buttonOpen}
                            type="outline"
                            title='+'
                        />

                        <Right>
                            <Text note>{new Date(message.createdAt).toLocaleDateString('en-US', options)}</Text>
                        </Right>
                    </ListItem>
                )
            }
        </List>
    )

MessageList.propTypes = {
    list: PropTypes.array.isRequired,
};