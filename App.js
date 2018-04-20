import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native'
import { Router, Switch, Route, Link } from './Routing'

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
                <Switch>
                    <Route exact path="/" component={LoginScreen} />
                    <Route path="/other" component={ProfilScreen} />
                </Switch>
            </Router>
        )
      }
    }
}

export default App;