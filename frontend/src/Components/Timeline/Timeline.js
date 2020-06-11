import React, { useState, useEffect, useRef } from 'react';
import * as dateFns from 'date-fns';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import AlertDialog from '../Other/AlertDialog';

import './Timeline.css';
import CommentList from './CommentList';
import LongMenu from '../Other/MoreMenu';
import PostShare from '../Profile/PostShare';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';

import TodayIcon from '@material-ui/icons/Today';
import CloseIcon from '@material-ui/icons/Close';
import CommentTimeline from './CommentTimeline';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

const useStyles = makeStyles((theme) => ({
  textFieldSize: {
    fontSize: '12px',
    width: '170px',
  },
}));

const Timeline = (props) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(null);
  const [data, setData] = useState(props.data);
  const [menuDialog, setMenuDialog] = useState(null);
  const [pictureCount, setPictureCount] = useState(0);
  const [clickSchedule, setClickSchedule] = useState(false);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const mediaSrc = (await axios.get(`/media/${data.mediaFK.mediaCd}`)).data;
        if (mediaSrc.length < 0) {
          return null;
        } else {
          setMediaList(mediaList.concat(JSON.parse(JSON.stringify(mediaSrc))));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const userPostMoreButtonClick = (selectedValue, value) => {
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

  const pictureList = () => {
    try {
      if (mediaList.length < 2) {
        return <img alt='timeline-img' src={data.mediaFK.mediaFirstPath} />;
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
                {mediaList.map((value, index) => {
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
              {pictureCount >= mediaList.length - 1 ? (
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
                justifyContent: 'cfr',
                alignItems: 'center',
              }}
            >
              {mediaList.map((value, index) => {
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
    } catch (e) {
      console.error(e);
    }
  };

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
          <div className='profile-time-text'>
            {/* 0일전 => 오늘             */}
            {`${Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date()))}일 전`}
          </div>
        </div>
        <div className='profile-moreIcon'>
          {props.user.userCd !== data.userFK.userCd ? (
            <LongMenu options={['나에게 공유']} returnValue={userPostMoreButtonClick} />
          ) : (
            <LongMenu options={['나에게 공유', ' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
          )}
        </div>
      </div>
      <div className='timeline-info'>
        <div className='time-line-picture-info'>
          <div className='timeline-picture'>
            {pictureList()}
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
                    <div style={{ paddingLeft: '8px' }}>{data.scheduleFK.scheduleNm}</div>
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
          <div className='timeline-context'>
            <div style={{ margin: '5px' }}>{data.postEx}</div>
          </div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ overflowY: 'auto' }}>
            {data.commentList.length > 0 ? (
              <CommentList tData={data.commentList} user={props.user} />
            ) : (
              <div>
                <div>
                  {data.userFK.userId}({data.userFK.userNm})게시물에 첫번째 댓글을 달아주세용
                </div>
              </div>
            )}
          </div>

          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon
                  style={data.currentUserLikePost ? { color: 'rgba(20, 81, 51, 0.9)', fontSize: 25 } : { fontSize: 25 }}
                  onClick={async () => {
                    try {
                      if (data.currentUserLikePost === false) {
                        const like = (
                          await axios.post(`/post/${data.postCd}/like`, props.user.userCd, {
                            headers: { 'Content-Type': 'application/json' },
                          })
                        ).data;
                        console.log(like);
                      } else {
                        const unLike = (
                          await axios.delete(`/post/${data.postCd}/unLike`, { params: { userCd: props.user.userCd } })
                        ).data;
                        console.log(unLike);
                      }
                    } catch (e) {
                      console.log(e);
                      setDialog(
                        <AlertDialog severity='error' content='서버에러' onAlertClose={() => setDialog(null)} />
                      );
                    }
                  }}
                />
              </div>
              {data.postLikeCount < 1 ? (
                <div className='comment-title'>첫번째 좋아요를 눌러주세욤</div>
              ) : data.postLikeCount === 1 ? (
                <div className='comment-title'>{`${data.postLikeFirstUser.userId}(${data.postLikeFirstUser.userNm}) 님이 좋아합니다`}</div>
              ) : (
                <div className='comment-title'>{`${data.postLikeFirstUser.userId}(${
                  data.postLikeFirstUser.userNm
                }) 님 외 ${data.postLikeCount - 1}명이 좋아합니다`}</div>
              )}
            </div>
          </div>
          <div className='comment-write'>
            <CommentTimeline
              user={props.user}
              postCd={data.postCd}
              onSuccess={(commentInfo) => {
                setData({
                  ...data,
                  commentList: data.commentList.concat(commentInfo),
                });
              }}
            />
          </div>
        </div>
      </div>
      {menuDialog}
      {dialog}
    </div>
  );
};

const SendButton = styled(Button)({
  minWidth: '20px',
  height: '20px',
});

export default Timeline;
