import React from 'react'
import { storiesOf } from '@storybook/react-native';

import ButtonLogin from './index'

import { View, Alert } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;

storiesOf('ButtonLogin', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <ButtonLogin onPress={ () => Alert.alert('You tapped the button!')} />)
    .add('disabled={true} ', () => <ButtonLogin disabled={true} />)
    .add('loading={true} ', () => <ButtonLogin loading={true} />)

