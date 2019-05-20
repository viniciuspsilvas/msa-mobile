import React from 'react';
import PropTypes from 'prop-types';

import ItemSetting from '../ItemSetting'
import { View, Text } from 'react-native'

export default SettingsForm = props => {
    const { listSettings } = props;

    if (!listSettings) return <Text> No settings.</Text>

    const listItems = listSettings.map((item) =>
        <ItemSetting key={item.desc.toString()} desc={item.desc} value={item.value} icon="ios-alert" />
    );

    return (
        <View>
            {listItems}
        </View>
    );
}

SettingsForm.propTypes = {
    listSettings: PropTypes.array.isRequired,
};