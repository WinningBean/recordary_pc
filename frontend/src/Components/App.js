import React from 'react';
import './default.css';
import LoginPage from 'Containers/Login/LoginPage';
import MainPage from 'Containers/Main/MainPage';
import ProfilePage from 'Components/Profile/Profile';
import GroupProfile from 'Components/Group/GroupProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  render() {
    console.log('aa');
    return (
      <div id='wrapper'>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/main' component={MainPage} />
          <Route
            exact
            path='/groupProfile/:group_cd'
            component={GroupProfile}
          />
          <Route path='/:userId' component={ProfilePage} />
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
