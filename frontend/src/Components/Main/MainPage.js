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
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    if (!props.isLogin) {
      setIsRedirect(true);
    }
    (async () => {
      try {
        const timeLineDataList = (await axios.get(`/post/timeLine/${data.userCd}`)).data;
        if (timeLineDataList.length < 0) {
          return;
        } else {
          console.log(timeLineDataList);
          setTimeline(JSON.parse(JSON.stringify(timeLineDataList)));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (isRedirect) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Header />
      <div id='main-page'>
        <div id='main-wrap'>
          <Main
            data={data}
            timeline={timeline}
            onPostDelete={(postCd) => {
              var index = undefined;
              for (let i = 0; i < timeline.length; i++) {
                console.log(postCd, timeline[i].postCd);
                if (postCd === timeline[i].postCd) {
                  index = i;
                  break;
                }
              }
              const copyTimeLine = timeline.slice();
              copyTimeLine.splice(index, 1);
              setTimeline(copyTimeLine);
            }}
          />
          <Aside data={data}></Aside>
        </div>
      </div>
    </>
  );
};

export default React.memo(MainPage, (props, newProps) => {
  return props.data === newProps.data;
});
