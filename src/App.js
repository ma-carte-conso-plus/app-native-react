import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native'
import { Router, Switch, Route } from './services/Routing'

import LoginScreen from './scenes/Main/scenes/Login';
import ProfilScreen from './scenes/Main/scenes/Profile';


class App extends Component {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: true };
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
                <Switch>
                    <Route exact path="/" component={LoginScreen} />
                    <Route path="/profil" component={ProfilScreen} />
                </Switch>
            </Router>
        )
      }
    }
}

export default App;