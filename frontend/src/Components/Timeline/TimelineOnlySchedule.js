import React from 'react';
import './Timeline.css';
import LongMenu from 'Components/Other/MoreMenu';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ShareIcon from '@material-ui/icons/Share';

import CommentOnlySchedule from 'Components/Timeline/CommentOnlySchedule';

const TimelineOnlySchedule = props => {
  const userPostMoreButtonClick = selectedValue => {
    switch (selectedValue) {
      case '수정':
        break;
      case '삭제':
        break;
    }
  };

  return (
    // 일정 한개 공유일때
    <div className='timeline-schedule'>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img
            alt='profile-img'
            src='https://pds.joins.com/news/component/htmlphoto_mmdata/201608/21/htm_20160821132446783592.jpg'
          />
        </div>
        <div className='profile-name'>Wee_SungHo</div>
        <div className='profile-time'>
          <div className='profile-time-text'>3일 전</div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu
            options={[' 수정 ', ' 삭제 ']}
            returnValue={userPostMoreButtonClick}
          />
        </div>
      </div>
      <div className='timeline-onlyschedule-info'>
        <div className='timeline-schedule-shared'>
          <div className='timeline-schedule-title'>내이름은 성호 탐정이지</div>
          <div className='timeline-schedule-only'>
            진실은 언제나 하나! 빠바바바
          </div>
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
              <ThumbUpRoundedIcon style={{ fontSize: 30 }}>
                like
              </ThumbUpRoundedIcon>
            </div>
            <div className='shareIcon'>
              <ShareIcon style={{ fontSize: 30 }}>share</ShareIcon>
            </div>
          </div>
          {/* <div className='comment-icon-right'> */}
          {/* <div className='shareIcon'>
              <ShareIcon style={{ fontSize: 30 }}>share</ShareIcon>
            </div> */}
          {/* </div> */}
        </div>
        <div className='comment-write'>
          <CommentOnlySchedule />
        </div>
      </div>
    </div>
  );
};

export default TimelineOnlySchedule;
