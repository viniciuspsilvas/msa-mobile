import React from 'react'
import { Image, } from 'react-native';

export default Background = props => {

    return (
        <Image source={require('msa-mobile/assets/background2.jpg')}
            style={{
                position: 'absolute',
                width: '100%', height: '100%',

            }} />
    )
}
