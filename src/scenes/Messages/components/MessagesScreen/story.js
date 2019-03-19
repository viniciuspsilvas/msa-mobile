import React from 'react'
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import MessagesScreen from './index'

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


const messagesList = [
    {
        id: 1,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        isRead : true
    },
    {
        id: 2,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'alert',
        isRead : true
    }, {
        id: 3,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        isRead : true
    },
    {
        id: 4,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        isRead : false
    },
    {
        id: 5,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'alert',
        isRead : false
    }, {
        id: 6,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        isRead : true
    },

]


storiesOf('MessagesScreen', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <MessagesScreen messagesList={messagesList} />)

