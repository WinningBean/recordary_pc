import React, { useState, useEffect } from 'react';
import './mainPage.css';

import axios from 'axios';
import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

const Main = (props) => {
  useEffect(() => {
    console.log(props);
  });

  return (
    <main>
      <div id='timeline-list'>
        {props.timeline.map((value, index) => {
          if (value.mediaFK !== null) {
            return (
              <div className='timeline-Margin' key={value.postCd}>
                <Timeline data={value} />
              </div>
            );
          } else {
            return (
              <div className='timeline-Margin' key={value.postCd}>
                {/* <TimelineWeekSchedule data={value}></TimelineWeekSchedule> */}
              </div>
            );
          }
        })}
      </div>
    </main>
  );
};

export default Main;
