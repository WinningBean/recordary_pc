import React, { useState, useRef, useEffect } from 'react';
import produce from 'immer';

import * as dateFns from 'date-fns';
import './Timeline.css';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import LongMenu from '../Other/MoreMenu';
import PostShare from '../Profile/PostShare';
import TimelineOneday from './TimelineOneDay';
import TimelineMultiDay from './TimelineMultiDay';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InputBase from '@material-ui/core/InputBase';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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

  const data = props.data;
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
    console.log(props);
    if (data.scheduleFK !== null) {
      setPostForm(1);
    } else {
      return null;
    }
  }, []);

  const handleChange = (e) => {
    setWriteRecomment(e.target.value);
  };

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

  const getRecommentList = async (value, index) => {
    try {
      const recommentListData = (await axios.get(`/comment/${value.commentCd}`)).data;
      setIsClickList(
        isClickList.map((val, listIndex) => {
          if (index === listIndex) {
            return produce(val, (draft) => {
              draft.clickIndex = !draft.clickIndex;
              draft.recommentList = JSON.parse(JSON.stringify(recommentListData));
            });
          } else {
            return produce(val, (draft) => {
              draft.clickIndex = draft.clickIndex;
            });
          }
        })
      );
      setEditRecomment(recommentListData.map(() => false));
    } catch (error) {
      console.error(error);
    }
  };

  const showRecommentList = (list) => {
    return list.map((val, i) => (
      <div key={val.commentCd}>
        <div className='comment-reply-users more-recomment-reply-users'>
          <div className='recomment-reply-users-img'>
            <img alt={`${val.userFK.userCd} img`} src={val.userFK.userPic} />
          </div>
          <div className='comment-reply-users-name'>
            <span style={{ fontWeight: 'bold', fontSize: '12px', marginRight: '5px' }}>
              {val.userFK.userId}({val.userFK.userNm})
            </span>
            <span style={{ fontSize: '12px' }}>
              <InputBase
                style={{ fontSize: '12px', height: '12px', color: 'black' }}
                defaultValue={val.commentContent}
                inputProps={{ 'aria-label': 'naked' }}
                disabled={editRecomment[i] === true ? false : true}
                onChange={(e) => setUpdateRecomment(e.target.value)}
              />
            </span>
          </div>
          <div className='commentIcon-hover' style={{ height: ' 15px' }}>
            {props.user.userCd !== val.userFK.userCd ? null : (
              <div>
                {editRecomment[i] === true ? (
                  <CheckIcon
                    onClick={async () => {
                      try {
                        const editedCommentCd = (
                          await axios.put(`/comment/${val.commentCd}`, updateRecomment, {
                            headers: { 'Content-Type': 'application/json' },
                          })
                        ).data;
                        console.log(editedCommentCd);
                      } catch (e) {
                        console.log(e);
                        setDialog(
                          <AlertDialog
                            severity='error'
                            content='댓글을 수정하지 못했습니다.'
                            onAlertClose={() => setDialog(null)}
                          />
                        );
                      }
                      setEditRecomment(
                        editRecomment.map((value, listIndex) => {
                          if (listIndex === i) {
                            return !value;
                          }
                          return value;
                        })
                      );
                    }}
                    style={{
                      color: 'gray',
                      fontSize: '20',
                      paddingRight: '5px',
                      paddingBottom: '5px',
                    }}
                  />
                ) : (
                  <EditIcon
                    onClick={() => {
                      setEditRecomment(
                        editRecomment.map((value, listIndex) => {
                          if (listIndex === i) {
                            return !value;
                          }
                          return value;
                        })
                      );
                    }}
                    style={{
                      color: 'gray',
                      fontSize: '20',
                      paddingRight: '5px',
                      paddingBottom: '5px',
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const commentList = () =>
    data.commentList.map((value, index) => (
      <div key={value.commentCd} style={{ marginBottom: '5px' }}>
        <div className='comment-reply-users'>
          <div className='comment-reply-users-img'>
            <img alt={`${value.userFK.userId} img`} src={value.userFK.userPic} />
          </div>
          <div className='comment-reply-users-name'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
              <div>
                <span className='reply-name'>
                  {value.userFK.userId}({value.userFK.userNm})
                </span>
                <span>
                  <InputBase
                    style={
                      editComment[index] === true
                        ? {
                            fontSize: '13px',
                            height: '13px',
                            color: 'black',
                            // backgroundColor: 'rgba(161, 159, 159, 0.3)',
                          }
                        : { fontSize: '13px', height: '13px', color: 'black' }
                    }
                    defaultValue={value.commentContent}
                    inputProps={{ 'aria-label': 'naked' }}
                    disabled={editComment[index] === true ? false : true}
                    onChange={(e) => setUpdateComment(e.target.value)}
                  />
                </span>
              </div>
              <div className='commentIcon-hover' style={{ height: ' 15px' }}>
                {props.user.userCd !== value.userFK.userCd ? null : (
                  <div>
                    {editComment[index] === true ? (
                      <CheckIcon
                        onClick={async () => {
                          try {
                            console.log(updateComment);
                            const editedCommentCd = (
                              await axios.put(`/comment/${value.commentCd}`, updateComment, {
                                headers: { 'Content-Type': 'application/json' },
                              })
                            ).data;
                            console.log(editedCommentCd);
                          } catch (e) {
                            console.log(e);
                            setDialog(
                              <AlertDialog
                                severity='error'
                                content='댓글을 수정하지 못했습니다.'
                                onAlertClose={() => setDialog(null)}
                              />
                            );
                          }
                          setEditComment(
                            editComment.map((value, listIndex) => {
                              if (listIndex === index) {
                                return !value;
                              }
                              return value;
                            })
                          );
                        }}
                        style={{
                          color: 'gray',
                          fontSize: '20',
                          paddingRight: '5px',
                          paddingBottom: '5px',
                        }}
                      />
                    ) : (
                      <EditIcon
                        onClick={() => {
                          setEditComment(
                            editComment.map((value, listIndex) => {
                              if (listIndex === index) {
                                return !value;
                              }
                              return value;
                            })
                          );
                        }}
                        style={{
                          color: 'gray',
                          fontSize: '20',
                          paddingRight: '5px',
                          paddingBottom: '5px',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='commentIconFlex'>
              <div
                className='commentIcon-hover'
                onClick={() =>
                  setWriteRecommentShow(
                    writeRecommentShow.map((value, listIndex) => {
                      if (listIndex === index) {
                        return !value;
                      }
                      return value;
                    })
                  )
                }
              >
                <CommentIcon
                  style={
                    writeRecommentShow[index] === true
                      ? {
                          fontSize: '20',
                          paddingRight: '5px',
                          color: 'rgba(20, 81, 51, 0.9)',
                        }
                      : {
                          fontSize: '20',
                          paddingRight: '5px',
                        }
                  }
                />
              </div>
              {value.reCommentCount > 0 ? (
                <>
                  <div className='show-more-comment' onClick={() => getRecommentList(value, index)}>
                    <div>
                      <MoreHorizIcon
                        style={{
                          fontSize: '15',
                          paddingTop: '3px',
                        }}
                      />
                      {isClickList[index].clickIndex === false ? (
                        <span style={{ fontSize: '12px' }}>{`댓글 ${value.reCommentCount}개 모두 보기`}</span>
                      ) : (
                        <span style={{ fontSize: '12px' }}>{`댓글 접기`}</span>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {isClickList[index].clickIndex === true ? showRecommentList(isClickList[index].recommentList) : null}
        {writeRecommentShow[index] === true ? (
          <div className='show-recomment-write' style={{ marginBottom: '5px' }}>
            <TextField
              inputRef={textField}
              id='recommentWrite'
              autoFocus={true}
              multiline
              rowsMax='2'
              onChange={handleChange}
              InputProps={{
                classes: {
                  input: classes.textFieldSize,
                },
                startAdornment: (
                  <InputAdornment position='start'>
                    <div className='recommentProfileImg'>
                      <img alt={`${props.user.userId} img`} src={props.user.userPic} />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <SendButton
                      onClick={async (e) => {
                        e.preventDefault();
                        textField.current.value = '';
                        try {
                          const recommentCd = (
                            await axios.post(`/comment/`, {
                              userCd: props.user.userCd,
                              postCd: data.postCd,
                              commentContent: writeRecomment,
                              commentOriginCd: value.commentCd,
                            })
                          ).data;
                          console.log(recommentCd);
                        } catch (e) {
                          console.log(e + 'comment Error');
                        }
                      }}
                    >
                      <SubdirectoryArrowLeftIcon style={{ fontSize: '15px' }} />
                    </SendButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        ) : null}
      </div>
    ));

  const timelineInfo = (() => {
    switch (postForm) {
      case 1:
        return (
          <TimelineOneday
            title={data.scheduleFK.scheduleNm}
            ex={data.scheduleFK.scheduleEx}
            startDay={data.scheduleFK.scheduleStr}
            endDay={data.scheduleFK.scheduleEnd}
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
            {/* 0일전 => 오늘             */}
            {`${Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date()))}일 전`}
          </div>
        </div>
        <div className='profile-moreIcon'>
          <LongMenu options={['나에게 공유', ' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
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
              commentList()
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
            <CommentTimeline />
          </div>
        </div>
      </div>
      {menuDialog}
      {dialog}
    </div>
  );
};
export default TimelineWeekSchedule;
