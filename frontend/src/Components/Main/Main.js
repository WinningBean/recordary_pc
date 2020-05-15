import React, { useState } from 'react';
import './mainPage.css';

import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

const Main = (props) => {
  const [data, setData] = useState(props.data);
  const [postForm, setPostForm] = useState(0);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: this.props.data,
  //     postForm: 0,
  //   };
  // }

  const timelineList = (() => {
    console.log(data);
    if (data.post === undefined) {
      return null;
    }

    return data.post.map((value) => {
      // if (value.mediaCd !== null ? (this.state.postForm = 0) : (this.state.postForm = 1))
      switch (postForm) {
        case 0:
          return (
            <div className='timeline-Margin' key={value.postOriginCd}>
              <Timeline data={value} />
            </div>
          );
        default:
          return (
            <div className='timeline-Margin' key={value.postOriginCd}>
              <TimelineWeekSchedule data={value}></TimelineWeekSchedule>
            </div>
          );
      }
    });
  })();

  return (
    <main>
      <div id='timeline-list'>{timelineList}</div>
    </main>
  );
};

export default Main;
