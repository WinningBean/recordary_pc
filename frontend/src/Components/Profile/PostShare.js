import React, { useState, useEffect } from 'react';
import './PostAppend.css';
import SelectGroup from '../UI/SelectGroup';
import PublicRange from '../UI/PublicRange';
import Backdrop from '../UI/Backdrop';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import store from '../../store';

const PostShare = (props) => {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);

  const [post, setPost] = useState({
    userCd: props.user.userCd,
    groupCd: null,
    postOriginCd: props.originCd,
    scheduleCd: null,
    mediaCd: null,
    postEx: null,
    postPublicState: 0,
    postScheduleShareState: false,
  });

  useEffect(() => {
    console.log(props);
  }, []);

  const changeHandle = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
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
      const postData = (await axios.post(`/post/`, post)).data;
      console.log(postData);

      if (postData !== '') {
        setAlert(
          <AlertDialog
            severity='success'
            content='게시물을 공유하였습니다.'
            onAlertClose={(() => setAlert(null), () => props.onCancel())}
          />
        );
      } else {
        setAlert(<Snackbar severity='error' content='게시물을 공유하지 못했습니다.' onClose={() => setAlert(null)} />);
      }
    } catch (error) {
      console.log(error);
      setAlert(
        <Snackbar
          severity='error'
          content='서버 에러로 게시물을 공유하지 못했습니다..'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='post-append-header'>
        <div className='Post-Append-titleName'>
          <PostAddIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title'>내 게시물에 공유</div>
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
            <PublicRange
              selectedIndex={post.postPublicState}
              onSetSelectedIndex={(index) => {
                setPost({ ...post, postPublicState: index });
              }}
            />
          </div>
        </div>

        <div className='Post-Append-text post-Append'>
          <TextField
            id='post_text'
            label='내용'
            multiline
            rowsMax='5'
            rows='3'
            name='post_ex'
            onChange={changeHandle}
          />
        </div>

        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            <Button onClick={() => props.onCancel()}>취소</Button>
            <Button onClick={handleClickOpen}>공유</Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'내 게시물로 공유'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>게시물을 공유하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary' autoFocus>
                취소
              </Button>
              <Button onClick={(handleClose, () => props.onCancel(), onSubmit)} color='primary'>
                확인
              </Button>
            </DialogActions>
            {alert}
          </Dialog>
        </div>
      </div>
    </Dialog>
  );
};

export default PostShare;
