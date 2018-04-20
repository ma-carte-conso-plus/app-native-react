import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, Button, View, Switch, ActivityIndicator, YellowBox } from 'react-native';
import { Link } from 'react-router';


class LoginScreen extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
        login: '9900001',
        password: '',
          masque: true,
          active: false,
          messageErreur: ''};
    };

  async saveInfos(login, password) {
    try {
        await AsyncStorage.multiSet([['login', login], ['password', password]]);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
  }

  handleClick = () => {
      this.setState({active: true});
      const url = 'http://172.16.24.30:8080/' + this.state.login + '/' + this.state.password + '/';
      fetch(url)
                   .then((response) => response.json())
                   .then((responseJson) => {
                      if (responseJson.status) {
                          this.setState({ messageErreur: 'Vérifiez les informations de connexion'} );
                          this.setState({active: false});
                         console.log('wrong password!');
                      } else {
                          this.saveInfos(responseJson.noCompte, responseJson.password);
                          this.setState({ messageErreur: ''});
                          this.setState({active: false});

                          const location = {
                              pathname: '/other',
                              state: { fromDashboard: true }
                            };

                          this.props.history.push(location);
                          console.log('move to profilscreen');
                      }
                   })
                   .catch((error) => {
                       console.log('error M. le dev');
                       this.setState({ messageErreur: 'Erreur de connexion!'} );
                       this.setState({active: false});
                      // console.error(error);
                   });
         };

  render() {

    YellowBox.ignoreWarnings([
                  'Warning: componentWillMount is deprecated',
                  'Warning: componentWillReceiveProps is deprecated',
                ]);

    return (
      <View style={styles.container}>
        <View style={styles.gauche}>
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

        <Button title="Connexion" color="blue" onPress={ this.handleClick } style={styles.button}/>
        <View  >
            <Text style={styles.error}>{this.state.messageErreur}</Text>
        </View>
        <ActivityIndicator size="large" color="#0000ff"
             animating={true}
              style={{ opacity: this.state.active ? 1 : 0, position: 'absolute', top: 230 }} />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  button : {
    alignSelf: 'center',
  },

  error: {
    fontSize: 19,
        fontWeight: 'bold',
        color: 'red',
        padding: 20
  }
});


export default LoginScreen;