import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import Header from '../../Containers/Header/Header';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const MainPage = (props) => {
  const [data, setData] = useState({
    ...props.data,
  });
  const [timeline, setTimeline] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);
  const [timelineLastCd, setTimelineLastCd] = useState(null);

  // useEffect(() => {
  //   if (!props.isLogin) {
  //     setIsRedirect(true);
  //   }
  //   (async () => {
  //     try {
  //       const timeLineDataList = (await axios.get(`/post/timeLine/${data.userCd}`)).data;
  //       if (timeLineDataList.length < 0) {
  //         return null;
  //       } else {
  //         console.log(timeLineDataList);
  //         setTimeline(JSON.parse(JSON.stringify(timeLineDataList)));
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (!props.isLogin) {
      setIsRedirect(true);
    }
    (async () => {
      try {
        const timeLineDataList = (await axios.get(`post/pagingTimeLine/${data.userCd}`)).data;
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

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //     let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  //     let clientHeight = document.documentElement.clientHeight;

  //     const currentScrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100;

  //     if (currentScrollPercentage > 90) {
  //       timeline.map((val, index) => {
  //         if (index === timeline.length - 1) {
  //           setTimelineLastCd(val.postCd);
  //         }
  //       });
  //       (async () => {
  //         try {
  //           const moreTimeLineData = (
  //             await axios.get(`post/pagingTimeLine/${data.userCd}`, { params: { lastCd: timelineLastCd } })
  //           ).data;
  //           if (moreTimeLineData.length < 0) {
  //             return null;
  //           } else {
  //             console.log(moreTimeLineData);
  //             // setTimeline(timeline.concat(JSON.parse(JSON.stringify(timeLineDataList)))); //concat으로 추가할 것
  //           }
  //         } catch (e) {
  //           console.error(e);
  //         }
  //       })();
  //     }
  //   });
  // }, [timeline]);

  if (isRedirect) {
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
