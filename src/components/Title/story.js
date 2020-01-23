import React from 'react'
import { storiesOf } from '@storybook/react-native';

import Title from '../../components/Title'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;



storiesOf('Title', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <Title title="Message" icon="ios-chatboxes"/>)


