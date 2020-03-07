import React, { useState, useEffect } from 'react';
import './Timeline.css';
import AlertDialog from 'Components/Other/AlertDialog';
import Snackbar from 'Components/UI/Snackbar';
import CommentWeekSchedule from 'Components/Timeline/CommentWeekSchedule';
import Backdrop from 'Components/UI/Backdrop';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const TimelineWeekSchedule = () => {
  const [alert, setAlert] = useState(null);

  const showPostEx = async e => {
    setAlert(<Backdrop />);
    try {
      const { data } = await axios.get(`http://localhost:8080/post/write`);
      if (data.isWrite) {
        setAlert(
          <AlertDialog
            severity='success'
            content='게시물이 추가되었습니다.'
            onAlertClose={() => setAlert(null)}
          />
        );
      } else {
        setAlert(
          <Snackbar
            severity='error'
            content='게시물을 추가하지 못했습니다.'
            onClose={() => setAlert(null)}
          />
        );
      }
    } catch (error) {
      console.log(error);
      setAlert(
        <Snackbar
          severity='error'
          content='서버 에러로 게시물을 추가하지 못했습니다..'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  return (
    // 타임라인스케쥴 => 공유하고싶은 주일때
    <div className='timeline-schedule'>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img alt='profile-img' src='img/profile-image.png' />
        </div>
        <div className='profile-name'>Choi_JuEun</div>
        <div className='profile-time'>
          <div className='profile-time-text'>2일 전</div>
        </div>
        <div className='profile-moreIcon'>
          <MoreButton>
            <MoreVertIcon style={{ fontSize: 30 }}></MoreVertIcon>
          </MoreButton>
        </div>
      </div>
      <div className='timeline-schedule-info'>
        <div className='timeline-schedule-shared'>
          <div className='timeline-schedule-context'>개강두두두두두두둥</div>
          <div className='timeline-schedule-weekTable'>
            <table border='1'>
              <th>2 / 27</th>
              <th>2 / 28</th>
              <th>2 / 29</th>
              <th>3 / 1</th>
              <th>3 / 2</th>
              <th>3 / 3</th>
              <th>3 / 4</th>
              <tr>
                <td>일요일입니담</td>
                <td>월요일입니담</td>
                <td>화요일입니담</td>
                <td>졸작 하는 날</td>
                <td>목요일입니담</td>
                <td>금요일입니담</td>
                <td>졸작 하는 날</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div classNamee='comment-context'>
        <div className='comment-title'>
          <ThumbUpRoundedIcon style={{ fontSize: '20', paddingRight: '5px' }} />
          Hwang_Waterglasses 님 외 5명이 좋아합니다
        </div>
        <div className='comment-context-icon'>
          <div className='comment-icon-left'>
            <div className='likeIcon'>
              <ThumbUpRoundedIcon style={{ fontSize: 30 }}>
                like
              </ThumbUpRoundedIcon>
            </div>
            <div className='followIcon'>
              <AddCircleIcon style={{ fontSize: 30 }}>follow</AddCircleIcon>
            </div>
          </div>
          <div className='comment-icon-right'>
            <div className='shareIcon'>
              <ShareIcon style={{ fontSize: 30 }}>share</ShareIcon>
            </div>
          </div>
        </div>
        <div className='comment-write'>
          <CommentWeekSchedule style={{ marginLeft: '10px' }} />
        </div>
      </div>
    </div>
  );
};
const MoreButton = styled(Button)({
  minWidth: '30px',
  height: '60px'
});
const CommentButton = styled(Button)({
  minWidth: '50px',
  height: '50px'
});

export default TimelineWeekSchedule;
