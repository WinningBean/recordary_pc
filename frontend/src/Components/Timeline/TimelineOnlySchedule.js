import React from 'react';
import './Timeline.css';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CommentOnlySchedule from 'Components/Timeline/CommentOnlySchedule';

class TimelineOnlySchedule extends React.Component {
  render() {
    return (
      // 일정 한개 공유일때
      <div className='timeline-schedule'>
        <div className='timeline-profile'>
          <div className='profile-picture'>
            <img alt='profile-img' src='img/profile-image.png' />
          </div>
          <div className='profile-name'>Wee_SungHo</div>
          <div className='profile-time'>
            <div className='profile-time-text'>3일 전</div>
          </div>
          <div className='profile-moreIcon'>
            <MoreButton>
              <MoreVertIcon style={{ fontSize: 30 }}></MoreVertIcon>
            </MoreButton>
          </div>
        </div>
        <div className='timeline-onlyschedule-info'>
          <div className='timeline-schedule-shared'>
            <div className='timeline-schedule-title'>내이름은 성호 탐정이지</div>
            <div className='timeline-schedule-only'>진실은 언제나 하나! 빠바바바</div>
          </div>
        </div>
        <div classNamee='comment-context'>
          <div className='comment-title'>
            <ThumbUpRoundedIcon style={{ fontSize: '20', paddingRight: '5px' }} />
            Wee_Seungbeen 님 외 5명이 좋아합니다
          </div>
          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon style={{ fontSize: 30 }}>like</ThumbUpRoundedIcon>
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
            <CommentOnlySchedule />
          </div>
        </div>
      </div>
    );
  }
}

const MoreButton = styled(Button)({
  minWidth: '30px',
  height: '60px'
});

export default TimelineOnlySchedule;
