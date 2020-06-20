import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import Header from '../../Containers/Header/Header';
import { Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const MainPage = (props) => {
  // const scrollPaging = React.createRef();
  const [data, setData] = useState({
    ...props.data,
  });
  const [timeline, setTimeline] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // useEffect(() => {
  //   if (!props.isLogin) {
  //     setIsRedirect(true);
  //   }
  //   (async () => {
  //     try {
  //       const timeLineDataList = (await axios.get(`/post/timeLine/${data.userCd}`)).data;
  //       if (timeLineDataList.length < 0) {
  //         return;
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

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //     let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  //     let clientHeight = document.documentElement.clientHeight;
  //     const currentScrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100;
  //     if (currentScrollPercentage > 90) {
  //       (async () => {
  //         try {
  //           const moreTimeLineData = (
  //             await axios.get(`post/pagingTimeLine/${data.userCd}`, {
  //               params: { lastCd: timeline[timeline.length - 1].postCd },
  //             })
  //           ).data;
  //           if (moreTimeLineData.length < 0) {
  //             return;
  //           } else {
  //             console.log(moreTimeLineData);
  //             setTimeline(timeline.concat(moreTimeLineData)); //concat으로 추가할 것
  //           }
  //         } catch (e) {
  //           console.error(e);
  //         }
  //       })();
  //     }
  //   });
  // }, [timeline]);

  var isPaging = false;
  const paging = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    // const currentScrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!isPaging) {
        console.log('this is bottom');
        isPaging = true;
        (async () => {
          try {
            const moreTimeLineData = (
              await axios.get(`post/pagingTimeLine/${data.userCd}`, {
                params: { lastCd: timeline[timeline.length - 1].postCd },
              })
            ).data;
            if (moreTimeLineData.length <= 0) {
              setIsLastPage(true);
              window.removeEventListener('scroll', paging);
              return;
            } else {
              if (moreTimeLineData.length < 10) {
                setIsLastPage(true);
                window.removeEventListener('scroll', paging);
              }
              console.log(moreTimeLineData);
              setTimeline(timeline.concat(moreTimeLineData)); //concat으로 추가할 것
            }
          } catch (e) {
            console.error(e);
          }
        })();
      }
    }
  };

  useEffect(() => {
    if (!isLastPage) {
      setTimeout(() => {
        window.addEventListener('scroll', paging);
      }, 2000);
    }
  }, [timeline]);

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
          {isLastPage ? null : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          )}
          <Aside data={data}></Aside>
        </div>
      </div>
    </>
  );
};

export default React.memo(MainPage, (props, newProps) => {
  return props.data === newProps.data;
});
