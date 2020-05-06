import React from 'react'
import { storiesOf } from '@storybook/react-native';
import LoginForm from '.'

import {Alert} from 'react-native'


storiesOf('LoginForm', module)
    .add('default', () => <LoginForm handleSubmit={ () => Alert.alert('You tapped the button!')}    />)

