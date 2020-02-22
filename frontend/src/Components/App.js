import React from 'react';
import './default.css';
import LoginPage from 'Containers/Login/LoginPage';
import MainPage from 'Containers/Main/MainPage';
import ProfilePage from 'Components/Profile/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';
class App extends React.Component {
  // state = {
  //   currPage : 0,
  //   page : [
  //     () => {
  //       return (
  //           <LoginPage onChangePage={() => this.setState({ currPage: 1 })}>
  //           </LoginPage>
  //       )},
  //   ()=>{return <MainPage></MainPage>}
  //   ]
  // }
  render() {
    return (
      <div id="wrapper">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/main" component={MainPage}/>
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/profile/:userId" component={ProfilePage} />
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
