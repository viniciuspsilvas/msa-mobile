import React from 'react'
import { storiesOf } from '@storybook/react-native';

import MessageCard from './index'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;

storiesOf('MessageCard', module)
    .addDecorator(CenterDecorator)
    .add('info', () =>
        <MessageCard
            title='Title'
            body='Body'
            createdAt={2019 - 11 - 22}
            category='info'
            handleBackButton={() => console.log("Teste")} />)

    .add('alert', () =>
        <MessageCard
            title='Title'
            body='Body'
            createdAt={2019 - 11 - 22}
            category='alert'
            handleBackButton={() => console.log("Teste")} />)


