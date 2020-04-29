import React, { useState, useEffect } from 'react';
import Snackbar from '../UI/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import Backdrop from '../UI/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DialogActions } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '552px',
    display: 'flex',
    justifyContent: 'space-around',
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

const FriendSetting = (props) => {
  const classes = useStyles();
  const data = props.data;
  const [info, setInfo] = useState(undefined);
  const [followSwitch, setFollowSwitch] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (info === undefined) {
      return;
    }
    setAlert(<Backdrop />);
    (async () => {
      try {
        const friendInfo = (await axios.post('/friend/info', { params: { friend_cd: data.friend_cd } })).data;
        setInfo(friendInfo);
        setAlert(
          <Snackbar
            onClose={() => setAlert(null)}
            severity='success'
            content={followSwitch ? '팔로우 등록' : '팔로우 해제'}
          />
        );
      } catch (e) {
        console.error(e);
        setAlert(
          <Snackbar
            onClose={() => setAlert(null)}
            severity='error'
            content='서버에러로 인하여 데이터 요청에 실패하였습니다.'
          />
        );
      }
    })();
  }, [followSwitch]);

  useEffect(() => {
    // 그룹 대표사진 250x250 img, 유저 리스트, 유저 40x40 img
    (async () => {
      try {
        // const groupInfo = (
        //   await axios.post('/group/info', { params: { group_cd: data.group.group_cd } })
        // ).data;
        const groupInfo = {
          friend_nm: '홍길동',
          friend_pic: 'https://storage.needpix.com/rsynced_images/character-1166998_1280.jpg',
          friend_ex: '친구 상태메세지 친구 상태메세지 친구 상태메세지 친구 상태메세지',
          friend_follow: true,
        };
        setInfo(groupInfo);
      } catch (e) {
        console.error(e);
        setInfo(null);
      }
    })();
  }, []);

  if (info === undefined) {
    return <Snackbar onClose={() => props.onClose()} severity='success' content='데이터 요청중...' />;
  } else if (info === null) {
    return (
      <Snackbar
        onClose={() => props.onClose()}
        severity='error'
        content='서버에러로 인하여 데이터 요청에 실패하였습니다.'
      />
    );
  }
  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='dialog-wrap' style={{ width: '600px', height: '350px' }}>
        <div className='dialog-header'>
          <div className='dialog-header-icon'>
            <GroupAddIcon style={{ fontSize: '44px' }} />
          </div>
          &nbsp;
          <span>친구 정보</span>
          <div className='dialog-header-icon' style={{ position: 'absolute', right: '5px' }}>
            <IconButton onClick={() => props.onClose()}>
              <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
            </IconButton>
          </div>
        </div>
        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.content}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                height: '250px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {data.friend.userPic === null ? (
                <img
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  alt='profile-img'
                  src={'http://placehold.it/250x250'}
                />
              ) : (
                <img
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  alt='profile-img'
                  src={data.friend.userPic}
                />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                height: '250px',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {data.friend.userId}({data.friend.userNm})
              </div>

              {data.friend.userEx === null ? (
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>상태메시지 없어어어어어어어</div>
              ) : (
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{data.friend.userEx}</div>
              )}

              {console.log(data.friend)}
              <div>
                <Tooltip title='팔로우 해제시 친구관계가 해제됩니다.' placement='top'>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={followSwitch}
                        onChange={(event) => setFollowSwitch(event.target.checked)}
                        color='primary'
                      />
                    }
                    label='팔로우'
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
      {alert}
    </Dialog>
  );
};

export default FriendSetting;
