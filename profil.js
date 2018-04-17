import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Switch, ActivityIndicator } from 'react-native';

class ProfileScreen extends React.Component {
  constructor(props) {
      super(props);
    }

  render() {
    const { params } = this.props.navigation.state;
    console.log(params.user);
    const solde = params ? params.user.solde : null;
    const prenom = params.user ? params.user.prenom : null;

    return (
      <View style={styles.container}>
        <Text>Bienvenue {prenom}</Text>
        <Text>Votre solde: {solde}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


module.exports = ProfileScreen;