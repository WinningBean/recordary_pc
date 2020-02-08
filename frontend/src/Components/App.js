import React from 'react';
import './default.css';
import LoginPage from 'Components/Login/LoginPage';
import MainPage from './Main/MainPage';
import { Route, BrowserRouter } from 'react-router-dom';
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
        {/* {this.state.page[this.state.currPage]()} */}
        <BrowserRouter>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/main" component={MainPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
