import React, { Component } from 'react';
import { Container, Icon, Button, Text, View } from 'native-base';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { getListSettings } from "./actions"
import SettingsForm from './components/SettingsForm'

import { ActivityIndicator } from 'react-native'

import Background from '../../components/Background'

import styles from './style'

class Settings extends Component {

    static navigationOptions = {
        drawerLabel: 'Settings',
        drawerIcon: () => (<Icon name='settings' />)
    };

    /* Contructor */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        const { error, isLoading, listSettings } = this.props;

        if (error) { return <View><Text> Error! {error.message}</Text></View> }

        return (
            <Container >
                <Background />
                <Title title='Settings' icon='settings' />
                <SettingsForm listSettings={listSettings} />
            </Container>
        );
    }
}

//Redux configuration
const mapStateToProps = state => ({ ...state.settingsReducer, ...state.loginReducer });

//const mapDispatchToProps = dispatch => bindActionCreators({ getCategoriesList, setCategorieSelected }, dispatch)

export default connect(mapStateToProps, null)(Settings);

