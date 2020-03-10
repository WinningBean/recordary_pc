import React, { useState } from 'react';
import './PostAppend.css';
import SelectGroup from 'Components/UI/SelectGroup';
import PublicRange from 'Components/UI/PublicRange';
import Backdrop from 'Components/UI/Backdrop';
import AlertDialog from 'Components/Other/AlertDialog';
import Snackbar from 'Components/UI/Snackbar';

import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import store from 'store';

const PostShare = props => {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);

  const [userPost, setUserPost] = useState({
    user_id: store.getState().user.currentUser.user_id,
    // group_cd: store.getState().user.userGroup[0].group_cd,
    group_cd: null,
    inputPost: {
      post_ex: null,
      post_pb_st: null,
      post_str_ymd: null,
      post_end_ymd: null
    }
  });

  const changeHandle = e => {
    setUserPost({
      ...userPost,
      inputPost: { ...userPost.inputPost, [e.target.name]: e.target.value }
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
      console.log(userPost);

      const form = new FormData();
      form.append('user_id', userPost.user_id);
      form.append('group_cd', userPost.group_cd);
      form.append('inputPost', userPost.inputPost);

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
          content='서버 에러로 게시물을 추가하지 못했습니다..'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='Post-Append-titleName'>
        <ShareIcon
          style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }}
        />
        <div className='PostAdd-title'>내 게시물로 공유</div>
      </div>
      <div className='Post-Media-Schedule-Append-Form '>
        <div className='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <div>
            <SelectGroup />
          </div>

          <div className='schedule-media-button '>
            <PublicRange />
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
                게시물을 공유하시겠습니까?
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
            {/* {alert} */}
          </Dialog>
        </div>
      </div>
    </Dialog>
  );
};

export default PostShare;
