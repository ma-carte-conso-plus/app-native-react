import React from 'react';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import gearImg from 'assets/img/gear.png';

import styles from './styles'

const Account = ( props ) => {
  return (
    <View style = { styles.container } >
      <View style = { styles.container } >
        <Text>Welcome { props.user.firstname }</Text>
        <Text>Discount Balance : { props.user.discount } XPF</Text>
        <Text>Remaining Points: { props.user.pointsBalance }</Text>
      </View>
      <View style = { [ styles.container, styles.menuButton ] } >
        <View style = { { padding:10 } } >
          <Button title = "False" color = "red" onPress = { props.saveFalseInfos } />
        </View>
        <View style={{padding:10}}>
          <TouchableOpacity
            style = { styles.button }
            onPress = { props.onLogoutPress }
          >
            <Image
              style = { styles.logoutButton }
              source = { gearImg }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Account;