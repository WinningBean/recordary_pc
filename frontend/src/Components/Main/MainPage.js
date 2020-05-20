import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import MainPageButton from './MainPageButton';
import Header from '../../Containers/Header/Header';
import { Redirect } from 'react-router-dom';

const MainPage = (props) => {
  const [data, setData] = useState({
    ...props,
  });

  console.log(data);
  if (!props.isLogin) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <Header />
      <div id='main-page'>
        <div id='main-wrap'>
          <Main data={data}></Main>
          <Aside data={data.user}></Aside>
        </div>
      </div>
    </>
  );
};

export default React.memo(MainPage, (props, newProps) => {
  return props.data === newProps.data;
});
