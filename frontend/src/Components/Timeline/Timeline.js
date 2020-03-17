import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import './Timeline.css';
import LongMenu from 'Components/Other/MoreMenu';
import PostShare from 'Components/Profile/PostShare';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CommentTimeline from 'Components/Timeline/CommentTimeline';

const Timeline = props => {
  const data = props.data;
  const [isClickList, setIsClickList] = useState(data.comment.map(() => false));
  const [commentOpen, setCommentOpen] = useState(false);
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
          <span>{`댓글 접기`}</span>
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
        {value.recommentList.length > 0
          ? showMoreComment(value.recommentList, index)
          : null}
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
          <div className='profile-time-text'>
            {`${dateFns.differenceInDays(data.uploadDate, new Date())}일 전`}
          </div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu
            options={['나에게 공유', ' 수정 ', ' 삭제 ']}
            returnValue={userPostMoreButtonClick}
          />
        </div>
      </div>
      <div className='timeline-info'>
        <div className='time-line-picture-info'>
          <div className='timeline-picture'>
            <img alt='timeline-img' src={data.post_pic} />
          </div>
          <div className='timeline-title'>
            <div>{data.post_title}</div>
            <div
              style={{
                flex: 1,
                marginLeft: '6px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <AvatarGroup>
                <Avatar alt='Remy Sharp' src='http://placehold.it/40x40' />
                <Avatar alt='Travis Howard' src='http://placehold.it/40x40' />
                <Avatar alt='Cindy Baker' src='http://placehold.it/40x40' />
                <Avatar>+3</Avatar>
              </AvatarGroup>
            </div>
          </div>
          <div className='timeline-context'>{data.post_ex}</div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ overflowY: 'auto' }}>
            {commentList()}
          </div>

          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon style={{ fontSize: 25 }}>
                  like
                </ThumbUpRoundedIcon>
              </div>
              <div className='comment-title'>
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

export default Timeline;
