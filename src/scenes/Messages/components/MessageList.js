import React from 'react';
import { List, ListItem, Body, Right, Text } from 'native-base';

export default props =>
    (
        <List>
            {props.list &&
                props.list.map(message =>
                    <ListItem key={message.id} >
                        <Body>
                            <Text>{message.title}</Text>
                            <Text note>{message.body}</Text>
                        </Body>
                        <Right>
                            <Text note>{ new Date(message.createdAt).toLocaleDateString() }</Text>
                        </Right>
                    </ListItem>
                )
            }
        </List>
    )