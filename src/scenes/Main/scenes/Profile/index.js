import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';

import engrenageImg from 'assets/img/engrenage.png'

class ProfileScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = { isLoaded: false };
    }

  logout = async () => {
    try {
        AsyncStorage.multiRemove(['login', 'password'])
            .then(() => {
                const location = {
                       pathname: '/',
                       state: { }
                };
                this.props.history.push(location);
            });
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
  }

// fonction uniquement pour test - a delete avant prod
    saveFalseInfos() {
      try {
          AsyncStorage.multiSet([['login', 'popo'], ['password', 'toto']]);
      } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
      }
    }


   componentDidMount() {
        this.setState({ isLoaded: true });
  }


  render() {

    if (!this.state.isLoaded) {
       return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"
                       animating={true} />
            </View>
       )

    } else {
        const utilisateur = this.props.location.state.user;
        const solde = utilisateur ? utilisateur.solde : null;
        const prenom = utilisateur ? utilisateur.prenom : null;
        const soldeDescription = utilisateur ? utilisateur.soldeDescription : null;

        const regExp = /[\D]*[0-9]*[\D]*([0-9]*)/;
        const soldeFrancs = soldeDescription ? regExp.exec(soldeDescription)[1] : 0;

        return (
          <View style={styles.container}>
              <View style={styles.container}>
                    <Text>Bienvenue {prenom}</Text>
                    <Text>Votre solde: {soldeFrancs} XPF</Text>
                    <Text>Vos points: {solde}</Text>
              </View>
              <View style={[styles.container, styles.menuButton]} >
                <View style={{padding:10}}>
                    <Button title="False" color="red" onPress={ this.saveFalseInfos } />
                </View>
                <View style={{padding:10}}>
                    <TouchableOpacity style={styles.button} onPress={ this.logout }>
                        <Image source={engrenageImg} style={{ alignSelf: 'stretch', resizeMode: 'contain', width: 60,
                                                                                                                              height: 60 }} />
                    </TouchableOpacity>
                </View>
              </View>
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
  horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    menuButton: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 0,
        width: '100%'
    },
  button: {
    backgroundColor: '#859a9b',
        borderRadius: 10,
        padding: 5,
        marginBottom: 0,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.35,
  }
});


export default ProfileScreen;