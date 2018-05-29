import React from 'react';
import { AsyncStorage } from 'react-native';

import Loading from 'src/components/Loading';
import LoginForm from './components/LoginForm';

class LoginScreen extends React.Component {

  constructor ( props ) {
    super ( props );
    this.state = {
      login:           '9900001',
      password:        '',
      passwordVisible: false,
      isLoaded:        false,
      errorMessage:   ''
    };
  };

  handleClick = () => {
      this.setState({isLoaded: false});
      const url = 'http://172.16.24.30:8080/' + this.state.login + '/' + this.state.password + '/';
      const fetchOpts = {  
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": '*'
        }
      };
      fetch( url, fetchOpts )
                   .then((response) => response.json())
                   .then((responseJson) => {
                      if (responseJson.status) {
                         this.setState({ errorMessage: 'Vérifiez les informations de connexion'} );
                         this.setState({isLoaded: true});
                         console.log('wrong password!');
                      } else {
                         AsyncStorage.multiSet([['login', responseJson.noCompte], ['password', responseJson.password]])
                            .then(() => {
                                  this.setState({ errorMessage: ''});
                                  this.setState({isLoaded: true});

                                  const location = {
                                      pathname: '/profil',
                                      state: { user: responseJson }
                                    };

                                  this.props.history.push(location);
                            })
                            .catch((error) => {
                               this.setState({ errorMessage: 'Erreur de connexion!'} );
                               this.setState({isLoaded: true});
                            });
                      }
                   })
                   .catch((error) => {
                       this.setState({ errorMessage: 'Erreur de connexion!'} );
                       this.setState({isLoaded: true});
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
    return !this.state.isLoaded ?
      ( <Loading /> ) :
      ( <LoginForm
        login                      = { this.state.login }
        password                   = { this.state.password }
        passwordVisible            = { this.state.passwordVisible }
        errorMessage               = { this.state.errorMessage }
        onLoginChange              = { ( text )  => this.setState( { login: text } ) }
        onPasswordChange           = { ( text )  => this.setState( { password: text } ) }
        onPasswordVisibilityToggle = { ( value ) => this.setState( { passwordVisible: value } ) }
        onLogin                    = { this.handleClick }
      /> );
  }
}

export default LoginScreen;
