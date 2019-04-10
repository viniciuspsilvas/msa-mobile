import React from 'react'
import { storiesOf } from '@storybook/react-native';

import HomeScreen from './index'

import { View } from 'react-native';

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
}}>
    {storyFn()}
</View>;

storiesOf('HomeScreen', module)
    .add('default', () => <HomeScreen qtdMessage={3} />)
    .add('No Notification', () => <HomeScreen qtdMessage={0} />)
    .add('2 notifications', () => <HomeScreen qtdMessage={2} />)



