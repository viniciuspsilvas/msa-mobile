import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import PieChart from './components/PieChart';
import Title from '../../components/Title';

import { connect } from "react-redux";

import { getAttendance } from "./actions"

import styles from './style'

class Attendance extends Component {

    static navigationOptions = {
        drawerLabel: 'Attendance',
        drawerIcon: () => (<Icon name='ios-stats' />)
    };


    /*
    Constructor 
    */
   constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        const { userDetails } = this.props;

        this.props.navigation.addListener('willFocus', () => this.props.getAttendance(userDetails));
    }

    render() {
        const { attendance } = this.props;

        return (
            <View style={styles.container}>
                <Title title='Attendance' />
                <PieChart progress={attendance} />
            </View>
        );
    }
}

//Redux configuration
const mapStateToProps = state => {
    return {
        ...state.attendanceReducer,
        userDetails: state.loginReducer.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAttendance: (userDetails) => dispatch(getAttendance(userDetails)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Attendance);

