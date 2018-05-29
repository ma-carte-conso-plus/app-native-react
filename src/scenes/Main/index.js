import React from 'react';

import { Router, Switch, Route } from 'src/services/Routing';

import LoginScreen   from './scenes/Login';
import ProfileScreen from './scenes/Profile';

class Main extends React.Component {
  
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/profil" component={ProfileScreen} />
        </Switch>
      </Router>
    );
  }

}

export default Main;