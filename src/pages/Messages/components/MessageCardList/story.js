import React from 'react'
import { storiesOf } from '@storybook/react-native';

import MessageCardList from './index'

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
        category: 'info'
    },
    {
        id: 2,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'alert'
    }, {
        id: 3,
        title: 'adas',
        body: 'Body dsada idij frep bvcnbc dsf digfji  dfdfgdfg ',
        createdAt: '2019-11-22',
        category: 'info'
    },

]

storiesOf('MessageCardList', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <MessageCardList list={messageList} />)

