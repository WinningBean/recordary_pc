import React, { useState, useEffect } from 'react';
import './mainPage.css';

import axios from 'axios';
import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

const Main = (props) => {
  const [data, setData] = useState(props.data);
  const [postForm, setPostForm] = useState(0);
  const [timeLine, setTimeLine] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const timelineData = await axios.get(`/post/timeLine/${data.userCd}`);
        setTimeLine(timelineData);
        console.log(timeLine);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const timelineList = (() => {
    // console.log(data);
    // if (data.post === undefined) {
    //   return null;
    // }
    // return data.post.map((value) => {
    //   // if (value.mediaCd !== null ? (this.state.postForm = 0) : (this.state.postForm = 1))
    //   switch (postForm) {
    //     case 0:
    //       return (
    //         <div className='timeline-Margin' key={value.postOriginCd}>
    //           <Timeline data={value} />
    //         </div>
    //       );
    //     default:
    //       return (
    //         <div className='timeline-Margin' key={value.postOriginCd}>
    //           <TimelineWeekSchedule data={value}></TimelineWeekSchedule>
    //         </div>
    //       );
    //   }
    // });
  })();

  return (
    <main>
      <div id='timeline-list'>{timelineList}</div>
    </main>
  );
};

export default Main;
