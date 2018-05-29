import React from 'react';
import { Button, Switch, Text, TextInput, View } from 'react-native';

import styles from './styles';

const LoginForm = ( props ) => {
  return (
    <View style = { styles.container } >
      <View style = { styles.left } >
          <View style = { styles.form } >
            <Text>Login: </Text>
            <TextInput
              style        = { { width: 150 } }
              value        = { props.login }
              onChangeText = { props.onLoginChange }
            />
          </View>
          <View style= { styles.form } >
            <Text>Password: </Text>
            <TextInput
              style           = { { width: 80 } }
              value           = { props.password }
              secureTextEntry = { !props.passwordVisible }
              onChangeText    = { props.onPasswordChange }
            />
          </View>
          <View style = { styles.form } >
            <Text>Show password</Text>
            <Switch
              value         = { props.passwordVisible }
              onValueChange = { props.onPasswordVisibilityToggle }
            />
          </View>
      </View>

      <Button
        style   = { styles.button }
        title   = "Connexion"
        color   = "blue"
        onPress = { props.onLogin }
      /> 
      <View>
          <Text style = { styles.error } >
            { props.errorMessage }
          </Text>
      </View>
    </View>
  );
};

export default LoginForm;