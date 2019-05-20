import React from 'react'
import { storiesOf } from '@storybook/react-native';
import ItemSetting from './index'
import { View } from 'react-native';

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;

storiesOf('Item Setting', module)
    .addDecorator(CenterDecorator)
    .add('Importante Notifications = false', () =>
        <ItemSetting desc="Importante Notifications" value={false} icon="ios-alert" />)
    .add('Importante Notifications = true', () =>
        <ItemSetting desc="Importante Notifications" value={true} icon="ios-alert" />)

