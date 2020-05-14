import React from 'react'
import { storiesOf } from '@storybook/react-native';

import MessageCard from './index'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


const message = {
    title: 'asdadsadas',
    body: 'gfdg dgfh dfgdsfg sdfgd gsdgds gfsd gd ',
    createdAt: Date.now(),
    isRead: false
}

const message2 = {
    title: 'asdadsadas',
    body: 'gfdg dgfh dfgdsfg sdfgd gsdgds gfsd gd ',
    createdAt: Date.now(),
    isRead: true
}

storiesOf('MessageCard2', module)
    .addDecorator(CenterDecorator)
    .add('unRead', () =>
        <MessageCard
            message={message} />)

    .add('Read', () =>
        <MessageCard
            message={message2} />)

