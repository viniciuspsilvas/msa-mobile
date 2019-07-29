import React from 'react'
import { storiesOf } from '@storybook/react-native';

import BadgeButton from './index'

import { View } from 'react-native';

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin:10,
}}>
    {storyFn()}
</View>;

storiesOf('BadgeButton', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <BadgeButton qtdMessage={3}/>)
    .add('0 message', () => <BadgeButton qtdMessage={0}/>)
    .add('No message', () => <BadgeButton qtdMessage={null}/>)

    

