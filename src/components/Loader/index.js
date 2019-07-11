import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

import styles from './style'

const Loader = props => {
  const {
    loading,
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color="#000000"
            size="large"
            animating={loading} />
        </View>
      </View>
    </Modal>
  )
}

export default Loader;