import React, { useState, useEffect } from 'react';
import './mainPage.css';

import axios from 'axios';
import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

const Main = (props) => {
  return (
    <main>
      <div id='timeline-list'>
        {props.timeline.map((value, index) => {
          if (value.mediaFK !== null) {
            return (
              <div className='timeline-Margin' key={`${value.postCd}-${index}`}>
                <Timeline data={value} user={props.data} />
              </div>
            );
          } else if (value.scheduleFK !== null) {
            return (
              <div className='timeline-Margin' key={`${value.postCd}-${index}`}>
                <TimelineWeekSchedule data={value} user={props.data}></TimelineWeekSchedule>
              </div>
            );
          } else return null;
        })}
      </div>
    </main>
  );
};

export default Main;
