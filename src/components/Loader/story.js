import React from 'react'
import { storiesOf } from '@storybook/react-native';

import Loader from '.'
import { View } from 'react-native';

const CenterDecorator = storyFn => <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
}}>
    {storyFn()}
</View>;


storiesOf('Loader', module)
    .addDecorator(CenterDecorator)
    .add('default', () => <Loader loading={false} />)


