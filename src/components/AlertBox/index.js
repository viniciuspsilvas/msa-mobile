import React from 'react';
import PropTypes from 'prop-types';
import { Container, Toast } from "native-base";

class AlertBox extends React.Component {


    render() {
        const {text, buttonText, duration = 3000} = this.props;

        return (
            <Container>
           {/*      {Toast.show({
                    text: text,
                    buttonText: buttonText,
                    duration: duration
                })}} */}
            </Container>
        );
    }
}

AlertBox.propTypes = {
   // classes: PropTypes.object.isRequired,
};

export default AlertBox;