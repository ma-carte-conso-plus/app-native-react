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
            isLoaded: false,
            active: true,
            messageErreur: ''
        };
    };

  handleClick = () => {
      this.setState({isLoaded: false});
      const url = 'http://172.16.24.30:8080/' + this.state.login + '/' + this.state.password + '/';
      fetch(url)
                   .then((response) => response.json())
                   .then((responseJson) => {
                      if (responseJson.status) {
                          this.setState({ messageErreur: 'Vérifiez les informations de connexion'} );
                          this.setState({active: false});
                         console.log('wrong password!');
                      } else {
                          AsyncStorage.multiSet([['login', responseJson.noCompte], ['password', responseJson.password]])
                            .then(() => {
                                  this.setState({ messageErreur: ''});
                                  this.setState({active: false});


                                  const location = {
                                      pathname: '/profil',
                                      state: { user: responseJson }
                                    };

                                  this.props.history.push(location);
                            })
                            .catch((error) => {
                               this.setState({ messageErreur: 'Erreur de connexion!'} );
                               this.setState({active: false});
                            });
                      }
                   })
                   .catch((error) => {
                       this.setState({ messageErreur: 'Erreur de connexion!'} );
                       this.setState({active: false});
                       console.error(error);
                   });
         };

  componentDidMount() {
      AsyncStorage.multiGet(['login', 'password']).then((token) => {
          if (token[0][1] !== null) {
                const url = 'http://172.16.24.30:8080/' + token[0][1] + '/' + token[1][1] + '/';
                console.log(url);
                fetch(url)
                   .then((response) => response.json())
                   .then((responseJson) => {
                      if (responseJson.status) {
                            console.log('wrong password! On reste sur l\'écran de login');
                            this.setState({ isLoaded: true });
                      } else {
                         const location = {
                             pathname: '/profil',
                             state: { user: responseJson }
                          };
                          this.props.history.push(location);
                          console.log('auto move to profilscreen');
                      }
                   })
                   .catch((error) => {
                       console.error(error);
                       this.setState({ isLoaded: true });
                   });
          } else {
            console.log('rien dans le token');
            this.setState({ isLoaded: true });
          }
       });
  };


  render() {
    if (!this.state.isLoaded) {
           return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff"
                           animating={true} />
                </View>
           )

        } else {
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
                      style={{ opacity: this.state.isLoaded ? 0 : 1, position: 'absolute', top: 230 }} />
              </View>

            );
         }
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