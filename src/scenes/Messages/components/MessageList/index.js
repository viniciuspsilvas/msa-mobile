import React from 'react';
import { List, ListItem, Body, Right, Text } from 'native-base';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style'

export default props =>
    (
        <List>
            {props.list &&
                props.list.map(message =>
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
                            <Text note>{new Date(message.createdAt).toLocaleDateString()}</Text>
                        </Right>
                    </ListItem>
                )
            }
        </List>
    )