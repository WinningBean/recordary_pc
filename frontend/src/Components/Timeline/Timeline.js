import React from 'react';
import './Timeline.css';
import LongMenu from 'Components/Other/MoreMenu';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';

import CommentTimeline from 'Components/Timeline/CommentTimeline';

const Timeline = props => {
  const data = props.data;

  const userPostMoreButtonClick = selectedValue => {
    switch (selectedValue) {
      case '수정':
        break;
      case '삭제':
        break;
    }
  };

  return (
    <div className='timeline'>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img
            alt='profile-img'
            src='https://pds.joins.com/news/component/htmlphoto_mmdata/201608/21/htm_20160821132446783592.jpg'
          />
        </div>
        <div className='profile-name'>Hwang_WaterGlasses</div>
        <div className='profile-time'>
          <div className='profile-time-text'>1일 전</div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu options={[' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
        </div>
      </div>
      <div className='timeline-info'>
        <div className='time-line-picture-info'>
          <div className='timeline-picture'>
            <img alt='timeline-img' src='img/1579501322063.jpg' />
          </div>
          <div className='timeline-title'>팔색조와 여행~^ㅡ^</div>
          <div className='timeline-context'>
            1일차 : 천사곱창에서 1차😍 보드게임방 2차🐱‍👤
            <br />
            2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻
            <br />
            3일차 : 김밥천국에서 냠냠🍳🍱🍜
            <br />
            4일차 : 본캠 카페!~~!~!🥛☕
          </div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply'>
            <div className='comment-reply-users'>
              <div className='comment-reply-users-img'>
                <img
                  alt='profile-img'
                  src='https://ojsfile.ohmynews.com/STD_IMG_FILE/2012/0820/IE001479170_STD.jpg'
                />
              </div>
              <div className='comment-reply-users-name'>
                <span>Wee_SungHo</span>
                가나다라마바사아자차카타파하
                <div>
                  <ThumbUpRoundedIcon
                    style={{
                      fontSize: '20',
                      paddingRight: '5px'
                    }}
                  />
                  <CommentIcon
                    style={{
                      fontSize: '20',
                      paddingRight: '5px'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='comment-reply-users'>
              <div className='comment-reply-users-img'>
                <img
                  alt='profile-img'
                  src='https://ojsfile.ohmynews.com/STD_IMG_FILE/2012/0820/IE001479170_STD.jpg'
                />
              </div>
              <div className='comment-reply-users-name'>
                <span>Wee_SungHo</span>
                가나다라마바사아자차카타파하
                <div>
                  <ThumbUpRoundedIcon
                    style={{
                      fontSize: '20',
                      paddingRight: '5px'
                    }}
                  />
                  <CommentIcon
                    style={{
                      fontSize: '20',
                      paddingRight: '5px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='comment-title'>
            <ThumbUpRoundedIcon style={{ fontSize: '20', paddingRight: '5px' }} />
            Wee_SungHo 님 외 5명이 좋아합니다
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
                <ShareIcon
                  style={{
                    fontSize: 30
                  }}
                >
                  share
                </ShareIcon>
              </div>
            </div>
          </div>
          <div className='comment-write'>
            <CommentTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
