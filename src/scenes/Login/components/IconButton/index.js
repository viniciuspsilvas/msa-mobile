import React from 'react'
import styles from './style'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default IconButton = props => {
    const {iconName} = props

    return (
        <Button
            {...props}
            buttonStyle={styles.buttonSubmit}
            disabledStyle={styles.buttonDisabled}
            icon={
                <Icon
                    name={iconName}
                    size={25}
                    color="white"
                />
            }
          
        />
    )
}
