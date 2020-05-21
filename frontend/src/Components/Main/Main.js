import React, { useState, useEffect } from 'react';
import './mainPage.css';

import axios from 'axios';
import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

const Main = (props) => {
  useEffect(() => {
    console.log(props);
  });
  const [mediaList, setMediaList] = useState([]);

  const sendImgList = async (index) => {
    try {
      // const postMediaList = [];
      const mediaSrcList = (await axios.get(`/media/${props.timeline[index].mediaFK.mediaCd}}`)).data;
      // for (let i = 1; i < mediaSrcList.length; i++) {
      //   postMediaList.push(mediaSrcList[i]);
      // }
      // console.log(postMediaList);
      // setMediaList(mediaSrcList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div id='timeline-list'>
        {props.timeline.map((value, index) => {
          if (value.mediaFK !== null) {
            sendImgList(index);
            // console.log(mediaList);
            return (
              <div className='timeline-Margin' key={value.postCd}>
                <Timeline data={value} imgList={mediaList} />
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
