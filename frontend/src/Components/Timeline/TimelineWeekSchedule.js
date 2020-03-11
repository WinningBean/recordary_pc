import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import './Timeline.css';
import LongMenu from 'Components/Other/MoreMenu';
import PostShare from 'Components/Profile/PostShare';

import PersonIcon from '@material-ui/icons/Person';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CommentTimeline from 'Components/Timeline/CommentTimeline';

const TimelineWeekSchedule = props => {
  const data = props.data;
  const [isClickList, setIsClickList] = useState(data.comment.map(() => false));
  const [menuDialog, setMenuDialog] = useState(null);

  const userPostMoreButtonClick = selectedValue => {
    switch (selectedValue) {
      case '나에게 공유':
        setMenuDialog(<PostShare onCancel={() => setMenuDialog(null)} />);
        break;
      case '수정':
        break;
      case '삭제':
        break;
    }
  };

  const showMoreComment = (list, index) => (
    <div
      className='show-more-comment'
      onClick={() =>
        setIsClickList(
          isClickList.map((value, listIndex) => {
            if (listIndex === index) {
              return !value;
            }
            return value;
          })
        )
      }
    >
      <div>
        <MoreHorizIcon
          style={{
            fontSize: '15',
            paddingTop: '3px'
          }}
        />
        {isClickList[index] === false ? (
          <span>{`댓글 ${list.length}개 모두 보기`}</span>
        ) : (
          <span>{`대댓글 접기`}</span>
        )}
      </div>
    </div>
  );

  const MoreComment = list => {
    return list.map(value => (
      <div key={value.id}>
        <div className='comment-reply-users more-comment-reply-users'>
          <div className='comment-reply-users-img'>
            <img alt={`${value.user_id} img`} src={value.user_pic} />
          </div>
          <div className='comment-reply-users-name'>
            <span className='reply-name'>{value.user_id}</span>
            <span>{value.user_comment}</span>
            <div>
              <ThumbUpRoundedIcon
                style={{
                  fontSize: '20',
                  paddingRight: '5px'
                }}
              />
              {/* <CommentIcon
                style={{
                  fontSize: '20',
                  paddingRight: '5px'
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const commentList = () => {
    return data.comment.map((value, index) => (
      <>
        <div className='comment-reply-users'>
          <div className='comment-reply-users-img'>
            <img alt={`${value.user_id} img`} src={value.user_pic} />
          </div>
          <div className='comment-reply-users-name'>
            <span className='reply-name'>{value.user_id}</span>
            <span>{value.user_comment}</span>
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
        {isClickList[index] === true ? MoreComment(value.recommentList) : null}
        {value.recommentList.length > 0 ? showMoreComment(value.recommentList, index) : null}
      </>
    ));
  };
  return (
    <div className='timeline'>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img alt={`${data.user_id} img`} src={data.user_pic} />
        </div>
        <div className='profile-name'>{data.user_id}</div>
        <div className='profile-time'>
          <div className='profile-time-text'>{`${dateFns.differenceInDays(
            data.uploadDate,
            new Date()
          )}일 전`}</div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu
            options={['나에게 공유', ' 수정 ', ' 삭제 ']}
            returnValue={userPostMoreButtonClick}
          />
        </div>
      </div>
      <div className='timeline-info' style={{ height: 'auto', alignItems: 'center' }}>
        <div className='timeline-week-info'>
          <div
            style={{
              flex: 1,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              borderBottom: '1px solid rgb(229, 229, 229)'
            }}
          >
            저녁약속
          </div>
          <div style={{ flex: 3, display: 'flex', paddingTop: '8px' }}>
            좋감힘나이러ㅏㄴ미ㅓㅏㅣㅇ너ㅏㅣㅁㄴㄹ
          </div>
          <div style={{ flex: 2 }}>
            <div
              style={{
                height: '50%',
                display: 'flex',
                fontSize: '15px',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(229, 229, 229)',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: 'bold' }}>시작</span>
              <span>2020.3.11 수 오후 8:00</span>
            </div>
            <div
              style={{
                height: '50%',
                display: 'flex',
                fontSize: '15px',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(229, 229, 229)',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: 'bold' }}>종료</span>
              <span>2020.3.11 수 오후 8:00</span>
            </div>
          </div>
          <div style={{ flex: 1, marginTop: '6px', marginLeft: '6px' }}>
            <AvatarGroup>
              <Avatar alt='Remy Sharp' src='http://placehold.it/40x40' />
              <Avatar alt='Travis Howard' src='http://placehold.it/40x40' />
              <Avatar alt='Cindy Baker' src='http://placehold.it/40x40' />
              <Avatar>+3</Avatar>
            </AvatarGroup>
          </div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ height: 'auto', maxHeight: '180px' }}>
            {commentList()}
          </div>
          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon style={{ fontSize: 30 }}>like</ThumbUpRoundedIcon>
              </div>
              <div className='comment-title'>
                {/* <ThumbUpRoundedIcon
                  style={{ fontSize: '25', paddingRight: '5px' }}
                /> */}
                {`${data.postLikePerson} 님 외 ${data.postLikeCount}명이 좋아합니다`}
              </div>
            </div>
          </div>
          <div className='comment-write'>
            <CommentTimeline />
          </div>
        </div>
      </div>
      {menuDialog}
    </div>
  );
};
export default TimelineWeekSchedule;
