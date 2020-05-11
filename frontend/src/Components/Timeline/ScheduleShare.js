import React, { useState } from 'react';
import '../Profile/PostAppend.css';
import SelectGroup from '../UI/SelectGroup';
import PublicRange from '../UI/PublicRange';
import Backdrop from '../UI/Backdrop';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';
import Calendar from '../Calendar/Calendar';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ShareIcon from '@material-ui/icons/Share';
import Checkbox from '@material-ui/core/Checkbox';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import axios from 'axios';
import store from '../../store';
import * as dateFns from 'date-fns';

const ScheduleShare = (props) => {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [userDate, setUserDate] = useState([]);
  const [choiceDate, setChoiceDate] = useState({
    start: null,
    end: null,
  });
  const [scheduleList, setScheduleList] = useState(null);

  const [userPost, setUserPost] = useState({
    user_id: store.getState().user.currentUser.user_id,
    // group_cd: store.getState().user.userGroup[0].group_cd,
    group_cd: null,
    inputPost: {
      post_ex: null,
      post_pb_st: null,
      post_str_ymd: null,
      post_end_ymd: null,
    },
  });

  const changeHandle = (e) => {
    setUserPost({
      ...userPost,
      inputPost: { ...userPost.inputPost, [e.target.name]: e.target.value },
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
          <AlertDialog severity='success' content='게시물이 추가되었습니다.' onAlertClose={() => setAlert(null)} />
        );
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

  const saveScheduleList = (userDate, choiceDate) => {
    const sc = userDate.filter((value) => choiceDate.start <= value.start && choiceDate.end >= value.end);
    setScheduleList(
      sc.map((value) => (
        <div key={value.cd} style={{ display: 'flex' }}>
          <div>
            <Checkbox defaultChecked color='default' />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', marginTop: '10px' }}>{value.ex}</span>
            <span style={{ fontSize: '13px', color: 'gray', marginTop: '3px' }}>
              {dateFns.format(value.start, 'yyyy.MM.dd hh:mm') + ' ~ ' + dateFns.format(value.end, 'yyyy.MM.dd hh:mm')}
            </span>
          </div>
        </div>
      ))
    );
  };

  console.log(scheduleList);
  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='post-append-header' style={{ width: '600px' }}>
        <div className='Post-Append-titleName'>
          <ShareIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title'>내 일정 공유</div>
        </div>
      </div>
      <div className='Post-Media-Schedule-Append-Form '>
        <div className='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <div>
            <SelectGroup />
          </div>
          <div className='schedule-media-button '>
            <div className='plus-button-design' onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <div className='plus-button-design-2'>
                <EventAvailableIcon style={{ fontSize: '30px' }} />
                <span style={{ fontSize: '15px', marginLeft: '5px' }}>일정찾기</span>
              </div>
            </div>
            <PublicRange />
          </div>
        </div>
        {isCalendarOpen === false ? null : (
          <Dialog
            onClose={() => {
              setChoiceDate({ start: null, end: null });
              setIsCalendarOpen(false);
            }}
            open
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {choiceDate.start === null ? (
              <div className='post-append-header' style={{ backgroundColor: '#5d5d5d' }}>
                <div className='Post-Append-titleName'>
                  <PlaylistAddCheckIcon
                    style={{
                      fontSize: '40px',
                      color: 'white',
                      marginLeft: '10px',
                    }}
                  />
                  <div className='PostAdd-title'>시작날짜를 선택하세요.</div>{' '}
                </div>
              </div>
            ) : (
              <div
                className='post-append-header'
                style={{
                  transitionProperty: 'background-color',
                  transitionDuration: '0.7s',
                  transitionTimingFunction: 'ease-out',
                  backgroundColor: 'rgba(20, 81, 51, 0.8)',
                }}
              >
                <div className='Post-Append-titleName'>
                  <PlaylistAddCheckIcon
                    style={{
                      fontSize: '40px',
                      color: 'white',
                      marginLeft: '10px',
                    }}
                  />
                  <div className='PostAdd-title'>종료날짜를 선택하세요.</div>
                </div>
              </div>
            )}
            <div style={{ margin: '20px' }}>
              <Calendar
                type={4}
                choiceSharedStartDate={choiceDate.start}
                choiceSharedEndDate={choiceDate.end}
                onChoice={(date, userDate) => {
                  setUserDate(userDate);
                  if (choiceDate.start === null) {
                    setChoiceDate({
                      start: date,
                      end: null,
                    });
                  } else {
                    if (date < choiceDate.start) {
                      setChoiceDate({ start: date, end: choiceDate.start });
                      return;
                    }
                    setChoiceDate({ ...choiceDate, end: date });
                  }
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: '10px',
                marginBottom: '10px',
              }}
            >
              <Button
                onClick={() => {
                  setIsCalendarOpen(false);
                  saveScheduleList(userDate, choiceDate);
                }}
                disabled={choiceDate.end !== null ? false : true}
              >
                완료
              </Button>
            </div>
          </Dialog>
        )}
        {scheduleList}
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
            <DialogTitle id='alert-dialog-title'> {'내 일정 공유'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>게시물을 공유하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(handleClose, () => props.onCancel(), onSubmit)} color='primary'>
                확인
              </Button>
              <Button onClick={handleClose} color='primary' autoFocus>
                취소
              </Button>
            </DialogActions>
            {{ alert }}
          </Dialog>
        </div>
      </div>
    </Dialog>
  );
};

export default ScheduleShare;
