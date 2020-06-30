import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';

import { Link } from 'react-router-dom';

import axios from 'axios';

import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';
import PostShareTimeline from '../Timeline/PostShareTimeline';
import OnlyPostExTimeline from '../Timeline/OnlyPostExTimeline';

const ProfileTimeline = (props) => {
  const [isClose, setIsClose] = useState(false);
  const [postData, setPostData] = useState(null);

  const getUserPostDate = async () => {
    try {
      const postCd = window.location.pathname.split('/')[2];
      const { data } = await axios.get(`/post/${postCd}`);
      if (!data.currentUserShowPost) {
        setIsClose(true);
      }

      console.log(data);
      setPostData(data);
    } catch (error) {
      console.error(error);
      setIsClose(true);
    }
  };

  const getGroupPostDate = async () => {
    try {
      const groupCd = window.location.pathname.split('/')[2];
      const postCd = window.location.pathname.split('/')[3];
      const { data } = await axios.get(`/post/${postCd}`);
      if (!data.currentUserShowPost) {
        setIsClose(true);
      }
      console.log(data);
      setPostData(data);
    } catch (error) {
      console.error(error);
      setIsClose(true);
    }
  };

  useEffect(() => {
    console.log(props.match);
    if (props.match.params.userPostCd !== undefined) {
      getUserPostDate();
    } else {
      getGroupPostDate();
    }
  }, []);
  if (isClose) {
    if (props.match.params.userPostCd !== undefined) {
      const userId = props.match.url.split('/')[1];
      props.history.push('/' + userId);
    } else {
      const groupCd = window.location.pathname.split('/')[2];
      // const postCd = window.location.pathname.split('/')[3];
      props.history.push('/group/' + groupCd);
    }
  }

  const element = () => {
    if (postData === null) {
      return <div className='loading' style={{ width: '866px', height: '543px' }} />;
    }
    if (postData.mediaFK !== null) {
      return (
        <div className='profile-ScheduleTimeLine' style={{ margin: '0px 0px' }}>
          <Timeline data={postData} user={props.user} onPostDelete={undefined} />
        </div>
      );
    } else if (postData.scheduleFK !== null || postData.shareScheduleList.length > 0) {
      return (
        <div className='profile-ScheduleTimeLine' style={{ margin: '0px 0px' }}>
          <TimelineWeekSchedule data={postData} user={props.user} onPostDelete={undefined} />
        </div>
      );
    } else if (postData.postOriginFK !== null) {
      return (
        <div className='profile-ScheduleTimeLine' style={{ margin: '0px 0px' }}>
          <PostShareTimeline data={postData} user={props.user} onPostDelete={undefined} />
        </div>
      );
    } else
      return (
        <div className='profile-ScheduleTimeLine' style={{ margin: '0px 0px' }}>
          <OnlyPostExTimeline data={postData} user={props.user} onPostDelete={undefined} />
        </div>
      );
  };
  return (
    <Dialog open onClose={() => setIsClose(true)}>
      {element()}
    </Dialog>
  );
};

export default ProfileTimeline;
