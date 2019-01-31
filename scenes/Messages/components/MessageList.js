import React from 'react';
import { View } from 'native-base';

import MessageCard from './MessageCard'

export default props =>
    (
        <View>
            { props.list.message && 
                props.list.message.map(message => <MessageCard key={message.id}
                    title={message.title}
                    body={message.body}
                    createdAt={message.createdAt}
                    category={message.category}
                />)
            }
        </View>
    )