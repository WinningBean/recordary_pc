import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { styled } from '@material-ui/styles';

import './PostAppend.css';
import DTP from '../UI/DTP';
import SelectGroup from '../UI/SelectGroup';
import PublicRange from '../UI/PublicRange';
import Backdrop from '../UI/Backdrop';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';

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
import Popover from '@material-ui/core/Popover';

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

const PostMediaScheduleAppend = (props) => {
  const classes = useStyles();
  const [postAddMediaListSrc, setPostAddMediaListSrc] = useState([]);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);
  const [colorClick, setColorClick] = useState(false);
  const [scheduleColor, setScheduleColor] = useState({
    r: '20',
    g: '81',
    b: '51',
    a: '1',
  });
  let fileUpload = useRef(null);

  const [post, setPost] = useState({
    userCd: store.getState().user.userCd,
    // group_cd: store.getState().user.userGroup[0].group_cd,
    groupCd: null,
    postOriginCd: null,
    scheduleCd: null,
    mediaCd: null,
    postEx: null,
    postPublicState: null,
    postStrYMD: null,
    postEndYMD: null,
  });

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

  const onSubmit = async () => {
    setAlert(<Backdrop />);

    try {
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

      console.log({ ...post, mediaCd: getMediaCd });
      const { data } = await axios.post(`/post/`, { ...post, mediaCd: getMediaCd });

      console.log(data);

      if (data) {
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
          backgroundColor: `rgba(${scheduleColor.r}, ${scheduleColor.g}, ${scheduleColor.b}, ${scheduleColor.a})`,
        }}
      >
        <div className='Post-Append-titleName'>
          <PostAddIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title'>게시물 추가</div>
        </div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div className='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <div>
            <SelectGroup />
          </div>
          <div className='schedule-media-button '>
            <PublicRange />
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
          <TextField id='post_text' label='내용' multiline rowsMax='5' rows='3' name='postEx' onChange={changeHandle} />
        </div>
        {colorClick === true ? (
          <Popover
            open={colorClick}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            onClose={() => setColorClick(false)}
          >
            <ChromePicker color={scheduleColor} onChange={(color) => setScheduleColor(color.rgb)} />
          </Popover>
        ) : null}

        {scheduleOpen === false ? null : (
          <div onClose={() => setScheduleOpen(null)}>
            <div className='Post-Append-title post-Append'>
              <TextField id='post_title' label='제목' />
              <div className='selectColor-form'>
                <span>일정 색상 설정</span>
                <div
                  className='selectColor'
                  onClick={() => setColorClick(true)}
                  style={{
                    backgroundColor: `rgba(${scheduleColor.r}, ${scheduleColor.g}, ${scheduleColor.b}, ${scheduleColor.a})`,
                  }}
                />
              </div>
            </div>
            <div className='Post-Append-Schedule'>
              <DTP />
            </div>
            <div className='Post-Append-Tag-User post-Append'>
              {/* <Link to={`/${info.user_id}`}> */}
              <Chip
                avatar={
                  // <Avatar alt={`${info.user_id} img`} src={info.user_pic} />
                  <Avatar alt='이미지' src='img/RIcon.png' />
                }
                className={classes.chip}
                // label={info.user_nm}
                label='성호'
                style={{
                  backgroundColor: 'rgba(20, 81, 51, 0.8)',
                  color: '#ffffff',
                  marginLeft: '5px',
                }}
                clickable
              />
              {/* </Link> */}
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
                for (let i = 0; i < e.target.files.length; i++) {
                  const reader = new FileReader();
                  reader.addEventListener('load', (e) => {
                    postAddMediaListSrc.push(e.target.result);
                    console.log(postAddMediaListSrc);
                  });
                  reader.readAsDataURL(e.target.files[i]);
                }
                // e.target.value = null;
              }}
            />
            {postAddMediaListSrc === null
              ? null
              : postAddMediaListSrc.map((value, index) => (
                  <div style={{ marginLeft: '10px' }} key={`${index}-postAddImg`}>
                    <img
                      style={{
                        boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                      }}
                      id='postAddImg'
                      src={value}
                    />
                  </div>
                ))}
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
            <DialogTitle id='alert-dialog-title'>{'게시물 추가'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>작성한 게시물을 추가하시겠습니까?</DialogContentText>
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
    </Dialog>
  );
};

export default PostMediaScheduleAppend;
