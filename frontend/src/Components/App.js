import React from 'react';
import './default.css';
import LoginPage from '../Containers/Login/LoginPage';
import MainPage from '../Containers/Main/MainPage';
import ProfilePage from '../Containers/Profile/Profile';
import MainPageButton from './Main/MainPageButton';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  connectSession = async () => {
    const { data } = await axios.get('/user/currentId');
    if (data === null) {
      return;
    }
  };
  componentDidMount() {
    this.connectSession();
  }
  render() {
    console.log('aa');

    return (
      <div id='wrapper'>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/main' component={MainPage} />
          <Route path='/profile/:userId' component={ProfilePage} />
          <Route path='/group/:groupCd' component={ProfilePage} />
          <Redirect path='*' to='/' />
        </Switch>
        {this.props.isLogin ? <MainPageButton data={this.props.user} /> : null}
      </div>
    );
  }
}

export default App;
