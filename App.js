import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, Switch, ActivityIndicator } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {text: '',
        login: '9900001',
        password: '',
        masque: true,
        active: false};
    }

  handleClick = () => {
    this.setState({active: true});
    url = 'http://172.16.24.30:8080/' + this.state.login + '/' + this.state.password + '/'
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
       if (responseJson.status) {
         this.setState({text: 'Erreur de connexion', active: false});
         return;
       }
       this.setState({text: responseJson.solde + ' points', active: false});
       return responseJson.solde;
    })
    .catch((error) => {
        this.setState({active: false});
        console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.gauche]}>
            <View style={styles.form}>
              <Text>Login: </Text>
              <TextInput style={{width: 150}}
                    value={this.state.login}
                    onChangeText={(text) => this.setState({login: text})} />
            </View>
            <View style={styles.form}>
              <Text>Password: </Text>
              <TextInput style={{width: 80}} secureTextEntry={this.state.masque}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})} />
            </View>
            <View style={styles.form}>
                <Text>Afficher le password </Text>
                <Switch value={!this.state.masque}
                    onValueChange={() => this.setState({masque: !this.state.masque})} />
            </View>
        </View>
        <View style={[styles.container, styles.top]}>
          <Button title="Go" color="blue" onPress={this.handleClick} />
          <View style={{height: 45}} />
          <Text>Votre solde: {this.state.text}</Text>
        </View>
        <ActivityIndicator size="large" color="#0000ff"
                    animating={true}
                    style={{ opacity: this.state.active ? 1 : 0, position: 'absolute', top: 130 }}/>
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
  },
  form: {
    flexDirection: 'row'
  },
  gauche: {
    alignItems: 'flex-start'
  },
  top: {
    justifyContent: 'flex-start'
  }
});
