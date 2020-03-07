import React, { useState, useEffect } from 'react';
import './PostAppend.css';
import SwitchLabels from '../UI/Switch';
import DTP from 'Components/UI/DTP';
import SelectGroup from 'Components/UI/SelectGroup';
import Backdrop from 'Components/UI/Backdrop';
import AlertDialog from 'Components/Other/AlertDialog';
import Snackbar from 'Components/UI/Snackbar';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import DateRangeIcon from '@material-ui/icons/DateRange';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import store from 'store';

const useStyles = makeStyles(theme => ({
  content: {
    width: '552px',
    display: 'flex',
    justifyContent: 'center'
  },
  marginBottom: {
    marginBottom: '10px'
  },
  middleCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px;'
  },
  chip: {
    marginRight: '4px',
    marginBottom: '4px'
  }
}));

const PostMediaScheduleAppend = props => {
  const classes = useStyles();
  const [mediaOpen, setMediaOpen] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);

  // const [userPost,   UserPost] = useState({
  const [post, setPost] = useState({
    // user_id: store.getState().user.currentUser.user_id,
    // // group_cd: store.getState().user.userGroup[0].group_cd,
    // group_cd: null,
    inputPost: {
      post_ex: null,
      post_pb_st: null,
      post_str_ymd: null,
      post_end_ymd: null
    }
  });

  const changeHandle = e => {
    setPost({
      ...post,
      inputPost: { [e.target.name]: e.target.value }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setAlert(<Backdrop />);
    try {
      console.log(post);

      const form = new FormData();
      form.append('user_id', store.getState().user.currentUser.user_id);
      form.append('group_cd', null);
      form.append('inputPost', post.inputPost);

      const { data } = await axios.post('/post/write', form);
      console.log(data);

      if (data.isWrite) {
        setAlert(
          <AlertDialog
            severity='success'
            content='게시물이 추가되었습니다.'
            onAlertClose={() => setAlert(null)}
          />
        );
      } else {
        setAlert(
          <Snackbar
            severity='error'
            content='게시물을 추가하지 못했습니다.'
            onClose={() => setAlert(null)}
          />
        );
      }
    } catch (error) {
      console.log(error);
      setAlert(
        <Snackbar
          severity='error'
          content='서버 에러로 게시물을 추가하지 못했습니다.'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  const showMedia = () => {
    if (mediaOpen === null) {
      setMediaOpen(
        <div onClose={() => setMediaOpen(null)}>
          <div className='Post-Append-Media post-Append'>
            <AddPhotoAlternateIcon
              style={{ fontSize: '50px' }}
            ></AddPhotoAlternateIcon>
          </div>
        </div>
      );
      return;
    }
    setMediaOpen(null);
    return;
  };

  const showSchedule = () => {
    if (scheduleOpen === null) {
      setScheduleOpen(
        <div onClose={() => setScheduleOpen(null)}>
          <div className='Post-Append-title post-Append'>
            <TextField id='post_title' label='제목' />
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
                color: '#ffffff'
              }}
              clickable
            />
            {/* </Link> */}
          </div>
        </div>
      );
      return;
    }
    setScheduleOpen(null);
    return;
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='Post-Append-titleName'>
        <PostAddIcon
          style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }}
        />
        <div className='PostAdd-title'>게시물 추가</div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div className='schedule-media-button'>
          <div className='plus-button-design' onClick={showSchedule}>
            <DateRangeIcon style={{ fontSize: '30px' }} />
            <span style={{ fontSize: '15px', marginLeft: '5px' }}>
              일정추가
            </span>
          </div>
          <div className='plus-button-design' onClick={showMedia}>
            <PermMediaIcon style={{ fontSize: '30px' }} />
            <span style={{ fontSize: '15px', marginLeft: '10px' }}>미디어</span>
          </div>
        </div>
        <div clsaaName='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <SelectGroup />
        </div>
        <div className='Post-Append-text post-Append'>
          <TextField
            id='post_text'
            label='내용'
            multiline
            rowsMax='5'
            name='post_ex'
            onChange={changeHandle}
          />
        </div>
        {scheduleOpen}
        {mediaOpen}

        <div className='Post-AppendP-Bottom'>
          <div className='Post-Append-Open-Choose'>
            <SwitchLabels></SwitchLabels>
          </div>
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
              <DialogContentText id='alert-dialog-description'>
                작성한 게시물을 추가하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(handleClose, () => props.onCancel(), onSubmit)}
                color='primary'
              >
                확인
              </Button>
              <Button onClick={handleClose} color='primary' autoFocus>
                취소
              </Button>
            </DialogActions>
            {alert}
          </Dialog>
        </div>
      </div>
    </Dialog>
  );
};

export default PostMediaScheduleAppend;
