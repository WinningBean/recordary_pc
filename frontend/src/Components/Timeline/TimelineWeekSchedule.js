import React, { useState, useRef, useEffect } from 'react';
import produce from 'immer';

import * as dateFns from 'date-fns';
import './Timeline.css';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

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
  const [postForm, setPostForm] = useState(0);
  const [isClickList, setIsClickList] = useState(
    data.commentList.map(() => ({ recommentList: [], clickIndex: false }))
  );
  const [writeRecommentShow, setWriteRecommentShow] = useState(data.commentList.map(() => false));
  const [writeRecomment, setWriteRecomment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [editComment, setEditComment] = useState(data.commentList.map(() => false));
  const [editRecomment, setEditRecomment] = useState([]);
  const [updateRecomment, setUpdateRecomment] = useState('');
  const [menuDialog, setMenuDialog] = useState(null);
  const [dialog, setDialog] = useState(null);

  const textField = useRef();

  useEffect(() => {
    if (data.scheduleFK !== null) {
      setPostForm(1);
    } else {
      return null;
    }
  }, []);

  const handleChange = (e) => {
    setWriteRecomment(e.target.value);
  };

  const userPostMoreButtonClick = (selectedValue, value) => {
    switch (selectedValue) {
      case '나에게 공유':
        setMenuDialog(<PostShare onCancel={() => setMenuDialog(null)} />);
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
                onClick={
                  (async () => {
                    try {
                      const Success = (await axios.delete(`post/${data.postCd}`)).data;
                      console.log(Success);
                      if (Success) {
                        setDialog(
                          <AlertDialog
                            severity='success'
                            content='게시물이 삭제되었습니다.'
                            duration={1000}
                            onAlertClose={() => setDialog(null)}
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
                      setDialog(
                        <AlertDialog severity='error' content='서버에러' onAlertClose={() => setDialog(null)} />
                      );
                    }
                  },
                  () => setMenuDialog(null))
                }
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
          // <TimelineMultiDay
          //   // title={data.post_title}
          //   // ex={data.post_ex}
          //   sharedSchedual={data.sharedSchedual}
          //   sharedStartDay={data.sharedStartDay}
          //   sharedEndDay={data.sharedEndDay}
          // />
          <div></div>
        );
    }
  })();

  return (
    <div className='timeline' style={{ minHeight: '391px' }}>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img alt={`${data.userFK.userCd} img`} src={data.userFK.userPic} />
        </div>
        <div className='profile-name'>
          {data.userFK.userId}({data.userFK.userNm})
        </div>
        <div className='profile-time'>
          <div className='profile-time-text'>
            {Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date())) === 0
              ? '오늘'
              : `${Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date()))}일 전`}
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
              <CommentList tData={data.commentList} user={props.user} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='recomment-reply-users-img'>
                  <img alt={`${data.userFK.userId} img`} src={data.userFK.userPic} />
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
export default TimelineWeekSchedule;
