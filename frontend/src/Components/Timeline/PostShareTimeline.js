import React, { useState, useEffect, useRef } from 'react';
import * as dateFns from 'date-fns';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import AlertDialog from '../Other/AlertDialog';

import './Timeline.css';
import CommentList from './CommentList';
import LongMenu from '../Other/MoreMenu';
import PostShare from '../../Containers/Profile/PostShare';
import EditPostMediaSchedule from '../../Containers/Profile/EditPostMediaSchedule';
import SmsIcon from '@material-ui/icons/Sms';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
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

const PostShareTimeline = (props) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(null);
  const [data, setData] = useState(props.data);
  const [menuDialog, setMenuDialog] = useState(null);
  const [pictureCount, setPictureCount] = useState(0);
  const [clickSchedule, setClickSchedule] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [timelineRender, setTimelineRender] = useState(false);
  const [shareMediaList, setShareMediaList] = useState([
    'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png',
    'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png',
  ]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const mediaSrc = (await axios.get(`/media/${data.mediaFK.mediaCd}`)).data;
  //       if (mediaSrc.length < 0) {
  //         return null;
  //       } else {
  //         setMediaList(mediaList.concat(JSON.parse(JSON.stringify(mediaSrc))));
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, []);

  const userPostMoreButtonClick = (selectedValue, value) => {
    switch (selectedValue) {
      case '공유 게시물 확인':
        setMenuDialog(<PostShare onCancel={() => setMenuDialog(null)} />);
        break;
      case '수정':
        // 게시물 EX만 수정할 수 있도록 만들기
        setMenuDialog(<EditPostMediaSchedule mediaList={mediaList} data={data} onCancel={() => setMenuDialog(null)} />);
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

  const pictureList = () => {
    try {
      if (mediaList.length < 2) {
        // return <img alt='timeline-img' src={data.mediaFK.mediaFirstPath} />;
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
                left: '50%',
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
    <div className='timeline' style={{ marginBottom: '50px' }}>
      <div className='timeline-profile'>
        <div className='profile-picture'>
          <img alt='가나다' src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png' />
          {/* <img alt={`${data.userFK.userId} img`} src={data.userFK.userPic} /> */}
        </div>
        <div className='profile-name'>
          hsg(황수경)
          {/* {data.userFK.userId}({data.userFK.userNm}) */}
        </div>
        <div className='profile-time'>
          <div className='profile-time-text'>
            오늘
            {/* {Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date())) === 0
              ? '오늘'
              : `${Math.abs(dateFns.differenceInDays(Date.parse(data.modifiedDate), new Date()))}일 전`} */}
          </div>
        </div>
        <div className='profile-moreIcon'>
          {/* {props.user.userCd !== data.userFK.userCd ? (
            <LongMenu options={['공유 게시물 확인']} returnValue={userPostMoreButtonClick} />
          ) : (
            <LongMenu options={['공유 게시물 확인', ' 수정 ', ' 삭제 ']} returnValue={userPostMoreButtonClick} />
          )} */}
          <LongMenu options={['공유 게시물 확인']} returnValue={userPostMoreButtonClick} />
        </div>
      </div>
      <div className='timeline-info'>
        <div className='time-line-picture-info'>
          <div className='timeline-shareForm'>
            <>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgb(229, 229, 229)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div className='timeline-share-userInfo'>
                  <img
                    alt='가나다'
                    src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                  />
                  <div>wsb(위승빈)</div>
                </div>
              </div>
              <div style={{ display: 'flex', padding: '8px 0px', borderBottom: '1px solid rgb(229, 229, 229)' }}>
                공유된 일정의 제목
              </div>
              <div
                style={{
                  height: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px 0px',
                  borderBottom: '1px solid rgb(229, 229, 229)',
                  overflowX: 'auto',
                }}
              >
                {/* {data.scheduleFK.scheduleEx} */}
                <span style={{ paddingBottom: '8px' }}>공유된 게시물의 내용kkkk</span>
                <div style={{ display: 'flex', overflowY: 'auto' }}>
                  {shareMediaList.length > 0
                    ? shareMediaList.map((value, index) => (
                        <div style={{ marginRight: '10px' }} key={`${index}-postAddImg`}>
                          <img
                            style={{
                              boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                            }}
                            id={`postshareImg-${index}`}
                            alt={`postshareImg-${index}`}
                            src={value}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div style={{ flex: 2 }}>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center',
                    padding: '8px 0px',
                  }}
                >
                  <span>시작</span>
                  <span>
                    {/* {dateFns.format(Date.parse(data.scheduleFK.scheduleStr), 'yyyy.M.d EEE h:mm a')} */}
                    2018.2.3.언젠가
                  </span>
                </div>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center',
                    padding: '8px 0px',
                  }}
                >
                  <span>종료</span>
                  <span>
                    1919.2.3.언젠가
                    {/* {dateFns.format(Date.parse(data.scheduleFK.scheduleStr), 'yyyy.M.d EEE h:mm a')} */}
                  </span>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ margin: '8px 10px', display: 'flex', alignItems: 'center' }}>
                  <ThumbUpRoundedIcon style={{ fontSize: '20' }} />
                  <div style={{ marginLeft: '3px' }}>10</div>
                </div>
                <div style={{ margin: '8px 0px', display: 'flex', alignItems: 'center' }}>
                  <SmsIcon style={{ fontSize: '20' }} />
                  <div style={{ marginLeft: '3px' }}>15</div>
                </div>
                {/* {data.scheduleFK.scheduleMemberList < 1 ? (
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                      <span>함께하는 친구가 없습니다.</span>
                    </div>
                  ) : (
                    <div>
                      <AvatarGroup>
                        {data.scheduleFK.scheduleMemberList.map((value, index) => (
                          <Avatar
                            key={`${value.userCd}-${index}`}
                            alt={`${value.userCd}-${index}`}
                            src={value.userPic}
                          />
                        ))}
                      </AvatarGroup>
                    </div>
                  )} */}
              </div>
            </>
          </div>
          <div className='timeline-context'>
            {/* <div style={{ margin: '5px' }}>{data.postEx}</div> */}
            g하이하이
          </div>
        </div>
        <div className='comment-context'>
          <div className='comment-reply' style={{ overflowY: 'auto' }}>
            {/* {data.commentList.length > 0 ? (
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
            )} */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className='recomment-reply-users-img'>
                {/* <img alt={`${data.userFK.userId} img`} src={data.userFK.userPic} /> */}
                <img
                  alt='가나다'
                  src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                />
              </div>
              <div style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {/* {data.userFK.userId}({data.userFK.userNm}) */}
                hsg(황수경)
              </div>
              <div style={{ marginLeft: '5px' }}>게시물에 첫번째 댓글을 달아주세요</div>
            </div>
          </div>

          <div className='comment-context-icon'>
            <div className='comment-icon-left'>
              <div className='likeIcon'>
                <ThumbUpRoundedIcon
                  // style={data.currentUserLikePost ? { color: 'rgba(20, 81, 51, 0.9)', fontSize: 25 } : { fontSize: 25 }}
                  style={{ fontSize: 25 }}
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
              {/* {data.postLikeCount < 1 ? (
                <div className='comment-title'>첫번째 좋아요를 눌러주세욤</div>
              ) : data.postLikeCount === 1 ? (
                <div className='comment-title'>{`${data.postLikeFirstUser.userId}(${data.postLikeFirstUser.userNm}) 님이 좋아합니다`}</div>
              ) : (
                <div className='comment-title'>{`${data.postLikeFirstUser.userId}(${
                  data.postLikeFirstUser.userNm
                }) 님 외 ${data.postLikeCount - 1}명이 좋아합니다`}</div>
              )} */}
              <div className='comment-title'>첫번째 좋아요를 눌러주세욤</div>
            </div>
          </div>
          <div className='comment-write'>
            <CommentTimeline
              user={props.user}
              // postCd={data.postCd}
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

export default PostShareTimeline;
