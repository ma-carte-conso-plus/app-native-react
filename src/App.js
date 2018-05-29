import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import Loading from 'src/components/Loading';

import Main from './scenes/Main';


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
    return !this.state.isLoaded ?
      ( <Loading /> ) :
      ( <Main /> );
  }
}

export default App;