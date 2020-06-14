import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import Header from '../../Containers/Header/Header';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const MainPage = (props) => {
  // const scrollPaging = React.createRef();
  const [data, setData] = useState({
    ...props.data,
  });
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    // infiniteScroll();
    (async () => {
      try {
        const timeLineDataList = (await axios.get(`/post/timeLine/${data.userCd}`)).data;
        if (timeLineDataList.length < 0) {
          return null;
        } else {
          console.log(timeLineDataList);
          setTimeline(JSON.parse(JSON.stringify(timeLineDataList)));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // const infiniteScroll = () => {
  //   let scrollHeight = scrollPaging.current.scrollHeight;
  //   let scrollTop = scrollPaging.current.scrollTop;
  //   let clientHeight = scrollPaging.current.clientHeight;
  //   console.log(scrollHeight);
  //   console.log(scrollTop);
  //   console.log(clientHeight);
  // };

  if (!props.isLogin) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <Header />
      <div id='main-page'>
        <div id='main-wrap'>
          <Main data={data} timeline={timeline} />
          <Aside data={data}></Aside>
        </div>
      </div>
    </>
  );
};

export default React.memo(MainPage, (props, newProps) => {
  return props.data === newProps.data;
});
