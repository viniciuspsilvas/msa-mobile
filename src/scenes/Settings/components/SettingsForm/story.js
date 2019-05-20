import React from 'react'
import { storiesOf } from '@storybook/react-native';
import SettingsForm from './index'
import { View } from 'react-native';

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


const list = [
    { desc: "Important Notifications", value: false },
    { desc: "Info Notifications", value: true },
    { desc: "Classes Notifications", value: false }
]

storiesOf('Settings Form', module)
    .addDecorator(CenterDecorator)
    .add('default', () =>
        <SettingsForm listSettings={list} />)

