import React from 'react';
import './default.css';
import LoginPage from '../Containers/Login/LoginPage';
import MainPage from '../Containers/Main/MainPage';
import ProfilePage from './Profile/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  render() {
    console.log('aa');
    return (
      <div id='wrapper'>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/main' component={MainPage} />
          <Route path='/user/:userId' component={ProfilePage} location />
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
