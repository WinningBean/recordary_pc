import React from 'react';
import './default.css';
import LoginPage from '../Containers/Login/LoginPage';
import MainPage from '../Containers/Main/MainPage';
import ProfilePage from '../Containers/Profile/Profile';
import MainPageButton from './Main/MainPageButton';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class App extends React.Component {
  connectSession = async () => {
    const { data } = await axios.get('/user/currentCd');
    if (data === null) {
      return;
    }
  };
  componentDidMount() {
    this.connectSession();
    const mybutton = document.getElementById('topBtn');

    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        mybutton.style.display = 'inline-flex';
        mybutton.style.opacity = 1;
      } else {
        mybutton.style.display = 'none';
        mybutton.style.opacity = 0;
      }
    }
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
        <Fab
          id='topBtn'
          class='MuiButtonBase-root MuiFab-root MuiFab-sizeSmall MuiFab-secondary animation'
          color='secondary'
          size='small'
          style={{ display: 'none', opacity: 0, position: 'fixed', bottom: '100px', right: '65px', zIndex: 99 }}
          onClick={() => {
            window.scroll({
              behavior: 'smooth',
              left: 0,
              top: document.body.offsetTop,
            });
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    );
  }
}

export default App;
