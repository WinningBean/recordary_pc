import React, { useState, useMemo, useEffect } from 'react';
import * as dateFns from 'date-fns';

import './Timeline.css';
import LongMenu from '../Other/MoreMenu';
import PostShare from '../Profile/PostShare';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TodayIcon from '@material-ui/icons/Today';
import CloseIcon from '@material-ui/icons/Close';
import CommentTimeline from './CommentTimeline';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Timeline = (props) => {
  const data = props.data;
  const imgList = props.imgList;
  const [isClickList, setIsClickList] = useState(data.commentList.map(() => false));
  const [menuDialog, setMenuDialog] = useState(null);
  const [pictureCount, setPictureCount] = useState(0);
  const [clickSchedule, setClickSchedule] = useState(false);

  useEffect(() => {
    console.log(data);
  }, []);

  const userPostMoreButtonClick = (selectedValue) => {
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
            paddingTop: '3px',
          }}
        />
        {isClickList[index] === false ? <span>{`댓글 ${list.length}개 모두 보기`}</span> : <span>{`댓글 접기`}</span>}
      </div>
    </div>
  );

  const MoreComment = (list) => {
    return list.map((value) => (
      <div key={value.id}>
        <div className='comment-reply-users more-comment-reply-users'>
          <div className='comment-reply-users-img'>
            <img alt={`${value.userId} img`} src={value.userPic} />
          </div>
          <div className='comment-reply-users-name'>
            <span className='reply-name'>
              {value.userId}({value.userNm})
            </span>
            <span>{value.userComment}</span>
            <div>
              <ThumbUpRoundedIcon
                style={{
                  fontSize: '20',
                  paddingRight: '5px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const commentList = () => {
    return data.commentList.map((value, index) => (
      <>
        <div className='comment-reply-users'>
          <div className='comment-reply-users-img'>
            <img alt={`${value.userId} img`} src={value.userPic} />
          </div>
          <div className='comment-reply-users-name'>
            <span className='reply-name'>
              {value.userId}({value.userNm})
            </span>
            <span>{value.userComment}</span>
            <div>
              <ThumbUpRoundedIcon
                style={{
                  fontSize: '20',
                  paddingRight: '5px',
                }}
              />
              <CommentIcon
                style={{
                  fontSize: '20',
                  paddingRight: '5px',
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

  const pictureList = useMemo(() => {
    console.log('render pic');
    if (imgList.length < 2) {
      return <img alt='timeline-img' src={imgList[0]} />;
    } else {
      return (
        <>
          <div
            style={{
              transition: 'transform 363.693ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s',
              transform: `translateX(${-500 * pictureCount}px)`,
              position: 'relative',
            }}
          >
            <ul style={{ height: '100%', position: 'relative' }}>
              {imgList.map((value, index) => {
                return (
                  <li
                    key={`${data.postCd}-${index}`}
                    style={{ position: 'absolute', transform: `translateX(${500 * index}px)` }}
                  >
                    <img
                      alt='timeline-img'
                      src={value}
                      style={{ width: '490px', height: '330px', objectFit: 'cover' }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '150px',
              height: '30px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '15px',
              paddingLeft: '10px',
            }}
          >
            {pictureCount === 0 ? (
              <div />
            ) : (
              <div
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor: 'rgba(253,253,253,.7)',
                  borderRadius: '50%',
                  marginLeft: '5px',
                }}
                onClick={() => setPictureCount(pictureCount - 1)}
              >
                <KeyboardArrowLeftIcon />
              </div>
            )}
            {pictureCount >= imgList.length - 1 ? (
              <div />
            ) : (
              <div
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor: 'rgba(253,253,253,.7)',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
                onClick={() => setPictureCount(pictureCount + 1)}
              >
                <KeyboardArrowRightIcon />
              </div>
            )}
          </div>
          <div
            style={{
              bottom: '15px',
              left: '6px',
              position: 'absolute',
              right: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {imgList.map((value, index) => {
              if (index === pictureCount) {
                return (
                  <div
                    key={`post-bottom-${data.postCd}-${index}`}
                    className='timeline-picture-bottom'
                    style={{
                      opacity: '1',
                    }}
                  />
                );
              }
              return (
                <div
                  key={`post-bottom-${data.postCd}-${index}`}
                  className='timeline-picture-bottom'
                  style={{
                    opacity: '.4',
                  }}
                />
              );
            })}
          </div>
        </>
      );
      //165 160 10
    }
  }, [pictureCount, data]);

  return (
    <div className='timeline'>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img alt={`${data.userFK.userId} img`} src={data.userFK.userPic} />
        </div>
        <div className='profile-name'>
          {data.userFK.userId}({data.userFK.userNm})
        </div>
        {data.scheduleFK === null ? (
          <div />
        ) : (
          <div className='timeline-showSchedule' onClick={() => setClickSchedule(true)}>
            <TodayIcon style={{ fontSize: '40px' }} />
          </div>
        )}
        <div className='profile-time'>
          <div className='profile-time-text'>{`${Math.abs(
            dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date())
          )}일 전`}</div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu options={['나에게 공유', ' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
        </div>
      </div>
      <div className='timeline-info'>
        <div className='time-line-picture-info'>
          <div className='timeline-picture'>
            {/* 이미지 */}
            {pictureList}
            <div
              className='transition-all'
              style={
                !clickSchedule
                  ? {
                      position: 'absolute',
                      bottom: '0',
                      height: 0,
                      width: '100%',
                      backgroundColor: 'rgb(253,253,253)',
                    }
                  : {
                      position: 'absolute',
                      bottom: '0',
                      width: '98%',
                      height: '100%',
                      zIndex: '1',
                      backgroundColor: 'rgb(253,253,253)',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '5px 5px',
                      borderTop: `3px solid ${data.scheduleFK.scheduleCol}`,
                    }
              }
            >
              {!clickSchedule ? null : (
                <>
                  <div
                    style={{
                      flex: 1,
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      borderBottom: '1px solid rgb(229, 229, 229)',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ paddingLeft: '8px' }}>
                      <h2>{data.scheduleFK.scheduleNm}</h2>
                    </div>
                    <div style={{ paddingRight: '8px', display: 'flex' }} className='Close-hover'>
                      <CloseIcon onClick={() => setClickSchedule(false)} />
                    </div>
                  </div>
                  <div style={{ flex: 3, height: '150px', display: 'flex', paddingTop: '8px' }}>
                    {data.scheduleFK.scheduleEx}
                  </div>
                  <div style={{ flex: 2 }}>
                    <div
                      style={{
                        height: '50%',
                        display: 'flex',
                        fontSize: '15px',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgb(229, 229, 229)',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>시작</span>
                      <span style={{ fontWeight: 'bold' }}>
                        {dateFns.format(Date.parse(data.scheduleFK.scheduleStr), 'yyyy.M.d EEE h:mm a')}
                      </span>
                    </div>
                    <div
                      style={{
                        height: '50%',
                        display: 'flex',
                        fontSize: '15px',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgb(229, 229, 229)',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>종료</span>
                      <span style={{ fontWeight: 'bold' }}>
                        {dateFns.format(Date.parse(data.scheduleFK.scheduleStr), 'yyyy.M.d EEE h:mm a')}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: '6px',
                      marginLeft: '6px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div>
                      <AvatarGroup>
                        <Avatar alt='Remy Sharp' src='http://placehold.it/40x40' />
                        <Avatar alt='Travis Howard' src='http://placehold.it/40x40' />
                        <Avatar alt='Cindy Baker' src='http://placehold.it/40x40' />
                        <Avatar>+3</Avatar>
                      </AvatarGroup>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='timeline-context'>{data.postEx}</div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ overflowY: 'auto' }}>
            {data.commentList.length > 0 ? commentList() : <div></div>}
          </div>

          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon style={{ fontSize: 25 }}>like</ThumbUpRoundedIcon>
              </div>
              {/* <div className='comment-title'>{`${data.postLikePerson} 님 외 ${data.postLikeCount}명이 좋아합니다`}</div> */}
              <div className='comment-title'>WiSungHo(위성호) 님 외 9명이 좋아합니다</div>
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
