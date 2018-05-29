import React from 'react';
import { AsyncStorage } from 'react-native';

import Loading from 'src/components/Loading';

import Account from './components/Account';

class ProfileScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = { isLoaded: false };
  }

  logout = async () => {
    try {
      AsyncStorage.multiRemove( ['login', 'password'] ).then( () => {
        const location = {
          pathname: '/',
          state:    {}
        };
        this.props.history.push( location );
      });
    } catch (error) {
        console.error( 'AsyncStorage error: ' + error.message );
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

  formatUser ( unformattedUser ) {
    const regExp = /[\D]*[0-9]*[\D]*([0-9]*)/;
    const user = {
      firstname     : unformattedUser ? unformattedUser.prenom : null,
      pointsBalance : unformattedUser ? unformattedUser.solde : null,
      discount      : unformattedUser && unformattedUser.soldeDescription ?
                      regExp.exec( unformattedUser.soldeDescription )[1] :
                      0
    }
    return user;
  }


  render() {
    return !this.state.isLoaded ?
      ( <Loading /> ) :
      ( <Account
            user           = { this.formatUser( this.props.location.state.user ) }
            onLogoutPress  = { this.logout }
            saveFalseInfos = { this.saveFalseInfos }
      /> );
  }
}

export default ProfileScreen;