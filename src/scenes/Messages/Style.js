import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        backgroundColor: '#ededed',
        flexWrap: 'wrap'
    }
})

const buttons = StyleSheet.create({
    primary: {
        flex: 1,
        height: 70,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    }
})

export { styles, buttons }           