import React from 'react'
import { storiesOf } from '@storybook/react-native';

import IconButton from './index'

import { View, Alert } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;

storiesOf('IconButton', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <IconButton onPress={ () => Alert.alert('You tapped the button!')} />)
    .add('disabled={true}', () => <IconButton disabled={true} />)
    .add('loading={true}', () => <IconButton loading={true} />)

    .add('facebook', () => <IconButton iconName='facebook-f' />)
    .add('instagram', () => <IconButton iconName='instagram' />)
    .add('youtube', () => <IconButton iconName='youtube' />)

