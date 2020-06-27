import React, { useState, useRef, useEffect } from 'react';
import produce from 'immer';

import * as dateFns from 'date-fns';
import './Timeline.css';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import LikePersonList from './LikePersonList';
import EditPostMediaSchedule from '../../Containers/Profile/EditPostMediaSchedule';
import CommentList from './CommentList';
import LongMenu from '../Other/MoreMenu';
import PostShare from '../../Containers/Profile/PostShare';
import TimelineOneday from './TimelineOneDay';
import TimelineMultiDay from './TimelineMultiDay';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

import CommentTimeline from './CommentTimeline';
import AlertDialog from '../Other/AlertDialog';
import axios from 'axios';

import store from '../../store';

const useStyles = makeStyles((theme) => ({
  textFieldSize: {
    fontSize: '12px',
    width: '170px',
  },
}));
const SendButton = styled(Button)({
  minWidth: '20px',
  height: '20px',
});

const TimelineWeekSchedule = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(props.data);
  const [postForm, setPostForm] = useState(props.data.shareScheduleList.length < 1 ? 1 : 2);
  const [writeRecomment, setWriteRecomment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [editRecomment, setEditRecomment] = useState([]);
  const [updateRecomment, setUpdateRecomment] = useState('');
  const [menuDialog, setMenuDialog] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [likePersonList, setLikePersonList] = useState(false);

  const textField = useRef();

  const handleChange = (e) => {
    setWriteRecomment(e.target.value);
  };

  const userPostMoreButtonClick = (selectedValue, value) => {
    switch (selectedValue) {
      case '나에게 공유':
        setMenuDialog(<PostShare originCd={data.postCd} onCancel={() => setMenuDialog(null)} />);
        break;
      case '수정':
        setMenuDialog(<EditPostMediaSchedule mediaList={[]} data={data} onCancel={() => setMenuDialog(null)} />);
        break;
      case '삭제':
        setMenuDialog(
          <Dialog open={true} onClose={() => setMenuDialog(null)}>
            <DialogTitle id='alert-dialog-title'>게시물 삭제</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>게시물을 삭제하시겠습니까?</DialogContentText>
              <DialogContentText style={{ fontSize: '13px', color: 'red' }}>
                *관련된 일정과 미디어도 모두 삭제됩니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMenuDialog(null)} color='primary' autoFocus>
                취소
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const Success = (await axios.delete(`/post/${data.postCd}`)).data;
                    console.log(Success);
                    if (Success) {
                      setDialog(
                        <AlertDialog
                          severity='success'
                          content='게시물이 삭제되었습니다.'
                          duration={1000}
                          onAlertClose={() => {
                            setMenuDialog(null);
                            props.onPostDelete(data.postCd);
                          }}
                        />
                      );
                    } else {
                      setDialog(
                        <AlertDialog
                          severity='success'
                          content='게시물 삭제 실패'
                          duration={1000}
                          onAlertClose={() => setDialog(null)}
                        />
                      );
                    }
                  } catch (e) {
                    console.log(e);
                    setDialog(<AlertDialog severity='error' content='서버에러' onAlertClose={() => setDialog(null)} />);
                  }
                }}
                color='primary'
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        );
        break;
    }
  };

  const timelineInfo = (() => {
    switch (postForm) {
      case 1:
        return (
          <TimelineOneday
            title={data.scheduleFK.scheduleNm}
            ex={data.scheduleFK.scheduleEx}
            startDay={data.scheduleFK.scheduleStr}
            endDay={data.scheduleFK.scheduleEnd}
            memberList={data.scheduleFK.scheduleMemberList}
          />
        );
      case 2:
        return (
          <TimelineMultiDay
            ex={data.post_ex}
            sharedSchedule={data.shareScheduleList}
            sharedStartDay={Date.parse(data.shareScheduleStartDate)}
            sharedEndDay={Date.parse(data.shareScheduleEndDate)}
          />
        );
    }
  })();

  return (
    <div
      className='timeline'
      style={data.groupFK !== null ? { borderTop: '4px solid tomato', minHeight: '391px' } : { minHeight: '391px' }}
    >
      <div className='timeline-profile'>
        <div className='profile-picture'>
          {data.groupFK === null ? (
            <img alt={`${data.userFK.userId} img`} src={data.userFK.userPic} />
          ) : (
            <img alt={`${data.groupFK.groupCd} img`} src={data.groupFK.groupPic} />
          )}
        </div>
        {data.groupFK === null ? (
          <div className='profile-name'>
            {data.userFK.userId}({data.userFK.userNm}){' '}
          </div>
        ) : (
          <div className='profile-name'>
            {data.groupFK.groupNm}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', color: 'gray', fontSize: '12px' }}>
              <div>from.</div>
              <div className='group-post-user' style={{ marginLeft: '10px' }}>
                <img alt={`${data.userFK.userId}`} src={data.userFK.userPic} />
              </div>
              <div style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {data.userFK.userId}({data.userFK.userNm})
              </div>
            </div>
          </div>
        )}
        <div className='profile-time'>
          <div className='profile-time-text'>
            {Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date())) === 0
              ? '오늘'
              : `${Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date()))}일 전`}
          </div>
        </div>
        <div className='profile-moreIcon'>
          {props.user !== undefined ? (
            props.user.userCd === data.userFK.userCd ? (
              <LongMenu options={['나에게 공유', ' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
            ) : data.postPublicState === 0 ? (
              <LongMenu options={['나에게 공유']} returnValue={userPostMoreButtonClick} />
            ) : null
          ) : null}
        </div>
      </div>
      <div className='timeline-info' style={{ height: 'auto' }}>
        <div
          className='timeline-week-info'
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '340px',
            overflow: 'auto',
          }}
        >
          {timelineInfo}
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ height: '220px', overflowY: 'auto' }}>
            {data.commentList.length > 0 ? (
              <CommentList
                postCd={data.postCd}
                tData={data.commentList}
                user={props.user}
                onSuccess={(commentInfo) => {
                  console.log(commentInfo);
                  setData({ ...data, commentList: commentInfo });
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='recomment-reply-users-img'>
                  <img alt={`${data.userFK.userId}`} src={data.userFK.userPic} />
                </div>
                <div style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                  {data.userFK.userId}({data.userFK.userNm})
                </div>
                <div style={{ marginLeft: '5px' }}>게시물에 첫번째 댓글을 달아주세요</div>
              </div>
            )}
          </div>
          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon
                  style={data.currentUserLikePost ? { color: 'rgba(20, 81, 51, 0.9)', fontSize: 25 } : { fontSize: 25 }}
                  onClick={async () => {
                    if (props.user === undefined) return;
                    try {
                      if (data.currentUserLikePost === false) {
                        const like = (
                          await axios.post(`/post/${data.postCd}/like`, props.user.userCd, {
                            headers: { 'Content-Type': 'application/json' },
                          })
                        ).data;
                        if (like) {
                          store.dispatch({
                            type: 'SAVE_NOTICE',
                            notice: {
                              noticeType: 'POST_LIKE_NEW', // 이벤트 타입
                              activeCd: props.user.userCd, // 이벤트 주체
                              targetCd: data.postCd, // 이벤트 대상
                            },
                          });
                          setData({
                            ...data,
                            currentUserLikePost: true,
                            postLikeCount: data.postLikeCount + 1,
                            postLikeFirstUser: data.postLikeFirstUser === null ? props.user : data.postLikeFirstUser,
                          });
                        }
                      } else {
                        const unLike = (
                          await axios.delete(`/post/${data.postCd}/unLike`, { params: { userCd: props.user.userCd } })
                        ).data;
                        setData({
                          ...data,
                          currentUserLikePost: false,
                          postLikeCount: data.postLikeCount - 1,
                          postLikeFirstUser:
                            data.postLikeFirstUser.userCd === props.user.userCd ? null : data.postLikeForstUser,
                          // data.postLikeFirstUser.userCd === props.user.userCd ? 다음 사람의 데이터...ㅠ : data.postLikeForstUser,
                        });
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
                <div className='comment-title-none'>첫번째 좋아요를 눌러주세욤</div>
              ) : data.postLikeCount === 1 ? (
                <div
                  className='comment-title'
                  onClick={() => setLikePersonList(true)}
                >{`${data.postLikeFirstUser.userId}(${data.postLikeFirstUser.userNm}) 님이 좋아합니다`}</div>
              ) : (
                <div className='comment-title' onClick={() => setLikePersonList(true)}>{`${
                  data.postLikeFirstUser.userId
                }(${data.postLikeFirstUser.userNm}) 님 외 ${data.postLikeCount - 1}명이 좋아합니다`}</div>
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
      {likePersonList ? <LikePersonList postCd={data.postCd} onCancel={() => setLikePersonList(false)} /> : null}

      {menuDialog}
      {dialog}
    </div>
  );
};
export default TimelineWeekSchedule;
