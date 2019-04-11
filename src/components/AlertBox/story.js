import React from 'react'
import { storiesOf } from '@storybook/react-native';

import AlertBox from '../../components/AlertBox'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;



storiesOf('AlertBox', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <AlertBox title="Message" />)


