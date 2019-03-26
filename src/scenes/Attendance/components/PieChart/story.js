import React from 'react'
import { storiesOf } from '@storybook/react-native';

import PieChart from './index'

import { View } from 'react-native';


const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


storiesOf('PieChart', module)
    .addDecorator(CenterDecorator)
    .add('Attendance >= 0.9', () => <PieChart progress={0.9} />)
    .add('Attendance >= 0.8', () => <PieChart progress={0.8} />)
    .add('Attendance < 0.8', () => <PieChart progress={0.7} />)


