import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './login';
import ProfilScreen from './profil';

class App extends Component {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }

    componentDidMount() {
        AsyncStorage.multiGet(['login', 'password']).then((token) => {
            this.setState({ hasToken: token[0][1] !== null, isLoaded: true });
        });
    }

    render() {
        if (!this.state.isLoaded) {
           return (
             <ActivityIndicator />
           )
        } else {
            return(
                <Router>
                    <Scene key='root'>
                        <Scene
                            component={LoginScreen}
                            hideNavBar={true}
                            initial={!this.state.hasToken}
                            key='LoginScreen'
                            title='Connexion'
                        />
                        <Scene
                            component={ProfilScreen}
                            hideNavBar={true}
                            initial={this.state.hasToken}
                            key='ProfilScreen'
                            title='Carte Conso+'
                        />
                    </Scene>
                </Router>
            )
        }
    }
}

export default App;