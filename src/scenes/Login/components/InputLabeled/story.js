import React from 'react'
import { storiesOf } from '@storybook/react-native';

import InputLabeled from './index'

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

storiesOf('InputLabeled', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <InputLabeled meta={[true,false]} label='Label' />)
    .add('erro=true', () => <InputLabeled meta={{touched:true, error:"Field invalid!" }} label='Label' />)

    

