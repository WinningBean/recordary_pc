import React from 'react';
import './default.css';
import LoginPage from './Login/LoginPage';
import MainPage from './Main/MainPage';
class App extends React.Component {
  state = {
    currPage : 0,
    page : [
      () => {
        return (
            <LoginPage onChangePage={() => this.setState({ currPage: 1 })}>
            </LoginPage>
        )},
    ()=>{return <MainPage></MainPage>}
    ]
  }
  render() {
    return (
      <div id="wrapper">
        {this.state.page[this.state.currPage]()}
      </div>
    );
  }
}

export default App;
