import React from 'react'
import { storiesOf } from '@storybook/react-native';

import MessageList from './index'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


const messageList = [
    {
        id: 1,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        read : true
    },
    {
        id: 2,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'alert',
        read : true
    }, {
        id: 3,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        read : true
    },
    {
        id: 4,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        read : false
    },
    {
        id: 5,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'alert',
        read : false
    }, {
        id: 6,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info',
        read : true
    },

]

storiesOf('MessageList', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <MessageList list={messageList} />)
    .add('empty list', () => <MessageList list={[]} />)
    .add('no array', () => <MessageList />)
    

