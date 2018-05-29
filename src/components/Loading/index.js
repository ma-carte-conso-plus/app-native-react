import React from 'react'
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const Loading = ( props ) => {
    return (
      <View style={[styles.container]}>
          <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
}
export default Loading;
