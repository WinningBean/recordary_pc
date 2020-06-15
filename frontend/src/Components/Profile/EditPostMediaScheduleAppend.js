import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { styled } from '@material-ui/styles';

import './PostAppend.css';
import DTP from '../UI/DTP';
import SelectGroup from '../UI/SelectGroup';
import PublicRange from '../UI/PublicRange';
import Backdrop from '../UI/Backdrop';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';
import GroupMemberSearch from '../Group/GroupMemberSearch';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

import { addHours, startOfDay, endOfDay, startOfSecond } from 'date-fns';

import axios from 'axios';
import store from '../../store';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '552px',
    display: 'flex',
    justifyContent: 'center',
  },
  marginBottom: {
    marginBottom: '10px',
  },
  middleCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px;',
  },
  chip: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const EditPostMediaScheduleAppend = (props) => {
  console.log(props);
  const classes = useStyles();
  const [user, setUser] = useState(props.user);
  const [data, setData] = useState(props.data);
  const [change, setChange] = useState(false);
  const [updatePostAddMediaListSrc, setUpdatePostAddMediaListSrc] = useState([]);
  const [postAddMediaListSrc, setPostAddMediaListSrc] = useState(props.mediaList.length < 0 ? [] : props.mediaList);
  const [mediaOpen, setMediaOpen] = useState(props.data.mediaFK !== null ? true : false);
  const [scheduleOpen, setScheduleOpen] = useState(props.data.scheduleFK !== null ? true : false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);
  const [colorClick, setColorClick] = useState(false);
  const [scheduleColor, setScheduleColor] = useState({
    r: '20',
    g: '81',
    b: '51',
    a: '1',
  });
  const [isShowMemberSearch, setIsShowMemberSearch] = useState(false);
  const [dialog, setDialog] = useState(null);

  let fileUpload = useRef(null);

  const [post, setPost] = useState({
    userCd: user.userCd,
    // group_cd: store.getState().user.userGroup[0].group_cd,
    groupCd: null,
    postOriginCd: null,
    scheduleCd: null,
    mediaCd: null,
    postEx: null,
    postPublicState: 0,
    postStrYMD: null,
    postEndYMD: null,
  });

  const [scheduleInfo, setScheduleInfo] = useState(props.data.scheduleFK);
  const [subtractedSchedule, setSubtractedSchedule] = useState([]);
  const [addedSchedule, setAddedSchedule] = useState([]);

  const [switchInfo, setSwitchInfo] = useState(false);

  const changeHandle = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const dataURLToBlob = (dataURL) => {
    const BASE64_MARKER = ';base64,';

    // base64로 인코딩 되어있지 않을 경우
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];
      return new Blob([raw], {
        type: contentType,
      });
    }

    // base64로 인코딩 된 이진데이터일 경우
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    // atob()는 Base64를 디코딩하는 메서드
    const rawLength = raw.length;
    // 부호 없는 1byte 정수 배열을 생성
    const uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
    let i = 0;
    while (i < rawLength) {
      uInt8Array[i] = raw.charCodeAt(i);
      i++;
    }
    return new Blob([uInt8Array], {
      type: contentType,
    });
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getScheduleCd = async () => {
    if (scheduleInfo.scheduleNm !== '') {
      const str = switchInfo ? startOfDay(scheduleInfo.scheduleStr) : scheduleInfo.scheduleStr;
      const end = switchInfo ? startOfSecond(endOfDay(scheduleInfo.scheduleEnd)) : scheduleInfo.scheduleEnd;
      if (str >= end) {
        setDialog(
          <AlertDialog
            severity='error'
            content='시작일보다 종료일이 더 빠릅니다.'
            onAlertClose={() => setDialog(null)}
          />
        );
        return;
      }

      console.log({
        // tabCd: clickTab === undefined ? null : clickTab,
        tabCd: null,
        userCd: user.userCd,
        scheduleNm: scheduleInfo.scheduleNm,
        scheduleEx: scheduleInfo.scheduleEx,
        scheduleStr: str.getTime(),
        scheduleEnd: end.getTime(),
        scheduleCol: rgbToHex(scheduleColor.r, scheduleColor.g, scheduleColor.b),
        scheduleMember: scheduleInfo.scheduleMembers.map((value) => value.userCd),
        schedulePublicState: scheduleInfo.schedulePublicState,
      });

      try {
        const scheduleInfoCd = (
          await axios.post('/schedule/', {
            // tabCd: clickTab === undefined ? null : clickTab,
            tabCd: null,
            userCd: user.userCd,
            scheduleNm: scheduleInfo.scheduleNm,
            scheduleEx: scheduleInfo.scheduleEx,
            scheduleStr: str.getTime(),
            scheduleEnd: end.getTime(),
            scheduleCol: rgbToHex(scheduleColor.r, scheduleColor.g, scheduleColor.b),
            scheduleMember: scheduleInfo.scheduleMembers.map((value) => value.userCd),
            schedulePublicState: scheduleInfo.schedulePublicState,
          })
        ).data;
        console.log(scheduleInfoCd);
        return scheduleInfoCd;
      } catch (e) {
        console.log(e);
        setDialog(
          <AlertDialog severity='error' content='스케줄 추가를 실패하였습니다.' onAlertClose={() => setDialog(null)} />
        );
      }
    } else return null;
  };
  // const getMediaCd = async () => {
  //   if (postAddMediaListSrc.length > 0) {
  //     try {
  //       const formData = new FormData();
  //       console.log(postAddMediaListSrc);
  //       postAddMediaListSrc.map((value, index) => {
  //         formData.append('mediaFiles', dataURLToBlob(value));
  //       });
  //       const mediaListCd = (
  //         await axios.post(`/media/${post.userCd}`, formData, {
  //           headers: { 'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundary7MA4YWxkTrZu0gW' },
  //         })
  //       ).data;
  //       console.log(mediaListCd);
  //       return mediaListCd;
  //     } catch (e) {
  //       console.log(e);
  //       setDialog(
  //         <AlertDialog severity='error' content='미디어 추가를 실패하였습니다.' onAlertClose={() => setDialog(null)} />
  //       );
  //     }
  //   } else return null;
  // };

  const onSubmit = async () => {
    // setDialog(<Snackbar severit='info' content='데이터 요청중...' onClose={() => setDialog(null)} />);
    try {
      const str = switchInfo ? startOfDay(scheduleInfo.scheduleStr) : scheduleInfo.scheduleStr;
      const end = switchInfo ? startOfSecond(endOfDay(scheduleInfo.scheduleEnd)) : scheduleInfo.scheduleEnd;
      if (str >= end) {
        setDialog(
          <AlertDialog
            severity='error'
            content='시작일보다 종료일이 더 빠릅니다.'
            onAlertClose={() => setDialog(null)}
          />
        );
        return;
      }

      console.log({
        // tabCd: clickTab === undefined ? null : clickTab,
        tabCd: null,
        userCd: user.userCd,
        scheduleNm: scheduleInfo.scheduleNm,
        scheduleEx: scheduleInfo.scheduleEx,
        scheduleStr: str.getTime(),
        scheduleEnd: end.getTime(),
        scheduleCol: rgbToHex(scheduleColor.r, scheduleColor.g, scheduleColor.b),
        scheduleMember: scheduleInfo.scheduleMembers.map((value) => value.userCd),
        schedulePublicState: scheduleInfo.schedulePublicState,
      });

      var getScheduleCd = null;
      if (scheduleInfo.scheduleNm !== '') {
        getScheduleCd = (
          await axios.post('/schedule/', {
            // tabCd: clickTab === undefined ? null : clickTab,
            tabCd: null,
            userCd: user.userCd,
            scheduleNm: scheduleInfo.scheduleNm,
            scheduleEx: scheduleInfo.scheduleEx,
            scheduleStr: str.getTime(),
            scheduleEnd: end.getTime(),
            scheduleCol: rgbToHex(scheduleColor.r, scheduleColor.g, scheduleColor.b),
            scheduleMember: scheduleInfo.scheduleMembers.map((value) => value.userCd),
            schedulePublicState: scheduleInfo.schedulePublicState,
          })
        ).data;
        console.log(getScheduleCd);
      }

      var getMediaCd = null;
      if (postAddMediaListSrc.length > 0) {
        const formData = new FormData();

        console.log(postAddMediaListSrc);
        postAddMediaListSrc.map((value, index) => {
          formData.append('mediaFiles', dataURLToBlob(value));
        });
        getMediaCd = (
          await axios.post(`/media/${post.userCd}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundary7MA4YWxkTrZu0gW' },
          })
        ).data;
        console.log(getMediaCd);
      }
      console.log(post);
      //게시물 추가
      const postData = (
        await axios.post(`/post/`, {
          ...post,
          scheduleCd: getScheduleCd,
          mediaCd: getMediaCd,
        })
      ).data;
      console.log(postData);

      if (postData) {
        setAlert(
          <AlertDialog
            severity='success'
            content='게시물이 추가되었습니다.'
            onAlertClose={(() => setAlert(null), () => props.onCancel())}
          />
        );
        console.log(store.getState());
      } else {
        setAlert(<Snackbar severity='error' content='게시물을 추가하지 못했습니다.' onClose={() => setAlert(null)} />);
      }
    } catch (error) {
      console.log(error);
      setAlert(
        <Snackbar
          severity='error'
          content='서버 에러로 게시물을 추가하지 못했습니다..'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div
        className='post-append-header'
        style={{
          width: '600px',
          transitionProperty: 'background-color',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease-out',
          backgroundColor: scheduleInfo.scheduleCol,
        }}
      >
        <div className='Post-Append-titleName'>
          <PostAddIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title'>내 게시물 수정</div>
        </div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div className='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <div>
            {props.groupList === undefined ? (
              <SelectGroup options={['그룹없음']} />
            ) : (
              <SelectGroup
                options={props.groupList}
                onSetSelectedGroup={(selectGroupCd) => setPost({ ...post, groupCd: selectGroupCd })}
              />
            )}
          </div>
          <div className='schedule-media-button '>
            {data.groupFK !== null ? (
              <PublicRange
                options={['전체공개', '비공개']}
                onSetSelectedIndex={(index) => {
                  setScheduleInfo({ ...scheduleInfo, schedulePublicState: index === 0 ? 0 : 3 });
                  setPost({ ...post, postPublicState: index === 0 ? 0 : 3 });
                }}
                selectedIndex={scheduleInfo.schedulePublicState}
              />
            ) : (
              <PublicRange
                onSetSelectedIndex={(index) => {
                  setScheduleInfo({ ...scheduleInfo, schedulePublicState: index });
                  setPost({ ...post, postPublicState: index === 0 ? 0 : 3 });
                }}
                selectedIndex={scheduleInfo.schedulePublicState}
              />
            )}
            <div className='plus-button-design' onClick={() => setScheduleOpen(!scheduleOpen)}>
              {(() => {
                if (scheduleOpen === false) {
                  return (
                    <div className='plus-button-design-2'>
                      <DateRangeIcon style={{ fontSize: '30px' }} />
                      <span style={{ fontSize: '15px', marginLeft: '5px' }}>일정추가</span>
                    </div>
                  );
                } else {
                  return (
                    <div className='plus-button-design-2 clicked'>
                      <DateRangeIcon style={{ fontSize: '30px' }} />
                      <span style={{ fontSize: '15px', marginLeft: '5px' }}>일정추가</span>
                    </div>
                  );
                }
              })()}
            </div>
            <div className='plus-button-design' onClick={() => setMediaOpen(!mediaOpen)}>
              {mediaOpen === true ? (
                <div className='plus-button-design-2 clicked'>
                  <AddPhotoAlternateIcon style={{ fontSize: '30px' }} />
                  <span style={{ fontSize: '15px', marginLeft: '10px' }}>미디어</span>
                </div>
              ) : (
                <div className='plus-button-design-2 '>
                  <AddPhotoAlternateIcon style={{ fontSize: '30px' }} />
                  <span style={{ fontSize: '15px', marginLeft: '10px' }}>미디어</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='Post-Append-text post-Append'>
          <TextField
            id='post_text'
            defaultValue={data.postEx}
            label='내용'
            multiline
            rowsMax='5'
            rows='3'
            name='postEx'
            onChange={changeHandle}
          />
        </div>
        {colorClick === true ? (
          <Dialog open onClose={() => setColorClick(false)}>
            <div>
              <ChromePicker
                color={scheduleInfo.scheduleCol}
                onChange={(color) => setScheduleInfo({ ...scheduleInfo, scheduleCol: color.hex })}
              />
            </div>
          </Dialog>
        ) : null}

        {scheduleOpen === false ? null : (
          <div onClose={() => setScheduleOpen(null)}>
            <div className='Post-Append-title post-Append'>
              <TextField
                id='post_title'
                label='제목'
                defaultValue={scheduleInfo.scheduleNm}
                onChange={(e) => setScheduleInfo({ ...scheduleInfo, scheduleNm: e.target.value })}
              />
              <div className='selectColor-form'>
                <span>일정 색상 설정</span>
                <div
                  className='selectColor'
                  onClick={() => setColorClick(true)}
                  style={{
                    backgroundColor: scheduleInfo.scheduleCol,
                  }}
                />
              </div>
            </div>
            <div className='Post-Append-Schedule'>
              <DTP
                strDate={scheduleInfo.scheduleStr}
                endDate={scheduleInfo.scheduleEnd}
                onChangeStrDate={(value) => setScheduleInfo({ ...scheduleInfo, scheduleStr: value })}
                onChangeEndDate={(value) => setScheduleInfo({ ...scheduleInfo, scheduleEnd: value })}
                switchInfo={switchInfo}
                onChangeSwitch={(value) => setSwitchInfo(value)}
              />
            </div>
            <div className='Post-Append-Tag-User post-Append'>
              <Chip
                avatar={<Avatar alt={`${user.userNm} img`} src={user.userPic} />}
                label={user.userNm}
                style={{
                  backgroundColor: 'rgba(20, 81, 51, 0.8)',
                  color: '#ffffff',
                  marginLeft: '5px',
                  marginBottom: '5px',
                }}
                clickable
              />
              {scheduleInfo.scheduleMemberList.map((value, index) => (
                <Chip
                  key={`scheduleMembers-${index}`}
                  avatar={<Avatar alt={`${value.userNm} img`} src={value.userPic} />}
                  label={value.userNm}
                  style={{
                    marginLeft: '5px',
                    marginBottom: '5px',
                  }}
                  clickable
                  onDelete={() => {
                    setDialog(
                      <AlertDialog
                        severity='info'
                        content='정말로 삭제하시겠습니까'
                        onAlertClose={() => setDialog(null)}
                        onAlertSubmit={() => {
                          const k = JSON.parse(JSON.stringify(scheduleInfo.scheduleMemberList));
                          k.splice(index, 1);
                          setScheduleInfo({
                            ...scheduleInfo,
                            scheduleMembers: k,
                          });
                          setSubtractedSchedule(subtractedSchedule.concat(value.userCd));
                          setDialog(
                            <Snackbar
                              severity='success'
                              content='삭제하였습니다'
                              duration={1000}
                              onClose={() => setDialog(null)}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              ))}
              <Chip
                icon={<AddIcon />}
                style={{
                  marginLeft: '5px',
                  marginBottom: '5px',
                }}
                label='ADD'
                clickable
                variant='outlined'
                onClick={() => setIsShowMemberSearch(true)}
                onClick={() =>
                  setDialog(
                    <GroupMemberSearch
                      type={1}
                      onSelect={(value) => {
                        var isOverlap = false;
                        for (let i = 0; i < scheduleInfo.scheduleMemberList.length; i++) {
                          if (
                            value.userCd === scheduleInfo.scheduleMemberList[i].userCd ||
                            value.userCd === user.userCd
                          ) {
                            return;
                          }
                        }
                        setScheduleInfo({
                          ...scheduleInfo,
                          scheduleMemberList: scheduleInfo.scheduleMemberList.concat(value),
                        });
                        setAddedSchedule(addedSchedule.concat(value.userCd));
                        setDialog(
                          <Snackbar
                            severity='success'
                            content='추가하였습니다.'
                            duration={1000}
                            onClose={() => setDialog(null)}
                          />
                        );
                      }}
                      onCancel={() => setDialog(false)}
                    />
                  )
                }
              />
            </div>
          </div>
        )}
        {mediaOpen === true ? (
          <div className='Post-Append-Media post-Append'>
            <div
              className=' Post-Append-Media2'
              style={{
                padding: '0px 10px',
                width: '60px',
                height: '60px',
                display: 'flex',
                boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.8)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => fileUpload.current.click()}
            >
              <AddPhotoAlternateIcon style={{ fontSize: '50px' }}></AddPhotoAlternateIcon>
            </div>
            <input
              type='file'
              accept='image/jpeg'
              required
              multiple
              style={{ display: 'none' }}
              ref={fileUpload}
              onChange={(e) => {
                setChange(true);
                for (let i = 0; i < e.target.files.length; i++) {
                  const reader = new FileReader();
                  reader.addEventListener('load', (e) => {
                    updatePostAddMediaListSrc.push(e.target.result);
                  });
                  reader.readAsDataURL(e.target.files[i]);
                }
              }}
            />
            {(postAddMediaListSrc.length > 0 && updatePostAddMediaListSrc.length > 0) ||
            (postAddMediaListSrc.length < 1 && updatePostAddMediaListSrc.length > 0)
              ? updatePostAddMediaListSrc.map((value, index) => (
                  <div style={{ marginLeft: '10px' }} key={`${index}-postAddImg`}>
                    <img
                      style={{
                        boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                      }}
                      id='postAddImg'
                      alt='postAddImg'
                      src={value}
                    />
                  </div>
                ))
              : postAddMediaListSrc.length > 0 && updatePostAddMediaListSrc.length < 1
              ? postAddMediaListSrc.map((value, index) => (
                  <div style={{ marginLeft: '10px' }} key={`${index}-postAddImg`}>
                    <img
                      style={{
                        boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                      }}
                      id='postAddImg'
                      alt='postAddImg'
                      src={value}
                    />
                  </div>
                ))
              : null}
          </div>
        ) : null}
        {alert}
        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            <Button onClick={handleClickOpen}>게시</Button>
            <Button onClick={() => props.onCancel()}>취소</Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>게시물 수정</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>게시물을 수정하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(handleClose, () => props.onCancel(), onSubmit)} color='primary'>
                확인
              </Button>
              <Button onClick={handleClose} color='primary' autoFocus>
                취소
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      {dialog}
    </Dialog>
  );
};

export default EditPostMediaScheduleAppend;
