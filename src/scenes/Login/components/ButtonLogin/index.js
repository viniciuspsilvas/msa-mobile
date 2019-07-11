import React from 'react'
import styles from './style'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default ButtonLogin = props => {

    return (
        <Button
            {...props}
            titleStyle={{color:"black"}}
            buttonStyle={styles.buttonSubmit}
            disabledStyle={styles.buttonDisabled}
            title="Log in"
          
        />
    )
}
