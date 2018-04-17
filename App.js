import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Switch, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';


import LoginScreen from './login';
import ProfilScreen from './profil';

export default StackNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: ProfilScreen }
});

