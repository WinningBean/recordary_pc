import React from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import MainPageButton from './MainPageButton';
import Header from '../../Containers/Header/Header';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {
  render() {
    var data = this.props;
    console.log(this.props);
    if (!this.props.isLogin) {
      return <Redirect to='/' />;
    }
    return (
      <>
        <Header />
        <div id='main-page'>
          <div id='main-wrap'>
            <Main data={data}></Main>
            <Aside data={data.data}></Aside>
          </div>
          <MainPageButton data={data}></MainPageButton>
        </div>
      </>
    );
  }
}

export default MainPage;
