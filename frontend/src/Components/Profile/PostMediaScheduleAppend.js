import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { styled } from '@material-ui/styles';

import './PostAppend.css';
import DTP from '../UI/DTP';
import SelectGroup from '../../Containers/UI/SelectGroup';
import PublicRange from '../UI/PublicRange';
import Backdrop from '../UI/Backdrop';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';
import GroupMemberSearch from '../Group/GroupMemberSearch';
import PhotoIcon from '@material-ui/icons/Photo';
import { colorContrast } from '../Other/ColorTransfer';

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
import Popover from '@material-ui/core/Popover';

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

const PostMediaScheduleAppend = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(props.user);
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
  const [isShowMemberSearch, setIsShowMemberSearch] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [popover, setPopover] = useState(null);

  let fileUpload = useRef(null);

  const [post, setPost] = useState({
    userCd: data.userCd,
    groupCd: null,
    postOriginCd: null,
    scheduleCd: null,
    mediaCd: null,
    postEx: null,
    postPublicState: 0,
    postScheduleShareState: false,
  });

  const [scheduleInfo, setScheduleInfo] = useState({
    tabCd: null,
    userCd: data.userCd,
    scheduleNm: '',
    scheduleEx: '',
    scheduleStr: new Date(),
    scheduleEnd: addHours(new Date(), 1),
    schedulePublicState: 0,
    scheduleMembers: [],
  });

  const [switchInfo, setSwitchInfo] = useState(false);
  const [tabInfo, setTabInfo] = useState([]);
  const [clickTabState, setClickTabState] = useState(undefined);

  useEffect(() => {
    if (props.user.userCd !== undefined) {
      getTabList();
    }
  }, []);

  const getTabList = async () => {
    const data = (await axios.get(`/tab/${props.user.userCd}`)).data;
    console.log(data);
    if (data.length > 0) {
      setTabInfo(data);
    } else return;
  };

  var clickTabInfo = undefined;

  if (clickTabState !== undefined) {
    for (let i = 0; i < tabInfo.length; i++) {
      if (tabInfo[i].scheduleTabCd === clickTabState) {
        clickTabInfo = tabInfo[i];
        break;
      }
    }
  }

  const changeHandle = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const mediaOpenClick = () => {
    if (!mediaOpen) {
      setPostAddMediaListSrc([]);
      setMediaOpen(!mediaOpen);
    } else {
      setMediaOpen(!mediaOpen);
    }
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

  const tagTypeChange = (value) => {
    if (value.indexOf(';base64,') === -1) {
      const parts = value.split(',');
      const contentType = parts[0].split(':')[1];
      const tagType = contentType.split('/')[0];
      return tagType;
    } else {
      // base64로 인코딩 된 이진데이터일 경우
      const parts = value.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const tagType = contentType.split('/')[0];
      return tagType;
    }
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
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

      var getScheduleCd = null;
      if (scheduleInfo.scheduleNm !== '') {
        getScheduleCd = (
          await axios.post('/schedule/', {
            tabCd: clickTabState === undefined ? null : clickTabState,
            groupCd: post.groupCd,
            userCd: data.userCd,
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

      if (postData !== '') {
        setAlert(
          <AlertDialog
            severity='success'
            content='게시물이 추가되었습니다.'
            onAlertClose={
              (() => setAlert(null), () => props.onCancel(), () => setTimeout(() => window.location.reload(), 1000))
            }
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
          width: '620px',
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
            {props.groupList === undefined ? (
              <SelectGroup options={['그룹없음']} />
            ) : (
              <SelectGroup
                options={props.groupList}
                onSetSelectedGroup={(selectGroupCd) => setPost({ ...post, groupCd: selectGroupCd })}
                currentGroup={null}
              />
            )}
          </div>
          <div className='schedule-media-button '>
            {scheduleInfo.scheduleMembers.length > 0 ? (
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
                  setPost({ ...post, postPublicState: index });
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
            <div className='plus-button-design' onClick={mediaOpenClick}>
              {mediaOpen === true ? (
                <div className='plus-button-design-2 clicked'>
                  <PhotoIcon style={{ fontSize: '30px' }} />
                  <span style={{ fontSize: '15px', marginLeft: '10px' }}>미디어</span>
                </div>
              ) : (
                <div className='plus-button-design-2 '>
                  <PhotoIcon style={{ fontSize: '30px' }} />
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
          <Dialog open onClose={() => setColorClick(false)}>
            <div>
              <ChromePicker color={scheduleColor} onChange={(color) => setScheduleColor(color.rgb)} />
            </div>
          </Dialog>
        ) : null}

        {scheduleOpen === false ? null : (
          <div onClose={() => setScheduleOpen(null)}>
            <div className='Post-Append-title post-Append'>
              <TextField
                id='post_title'
                label='제목'
                onChange={(e) => setScheduleInfo({ ...scheduleInfo, scheduleNm: e.target.value })}
              />
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
            <div className='Post-Append-title post-Append'>
              <TextField
                style={{ marginRight: '20px' }}
                id='post_title'
                label='비고'
                onChange={(e) => setScheduleInfo({ ...scheduleInfo, scheduleEx: e.target.value })}
              />
              {tabInfo === undefined ? null : (
                <>
                  <span style={{ fontSize: '15px', color: 'gray', marginTop: '20px' }}>선택한 탭 :</span>
                  <div
                    className='transition-all'
                    onClick={(e) => {
                      setPopover(e.currentTarget);
                    }}
                    style={{
                      height: '30px',
                      width: '180px',
                      backgroundColor: clickTabState === undefined ? '#ffc500' : clickTabInfo.scheduleTabColor,
                      marginLeft: '10px',
                      textAlign: 'center',
                      lineHeight: '34px',
                      textTransform: 'uppercase',
                      color: colorContrast(clickTabState === undefined ? '#ffc500' : clickTabInfo.scheduleTabColor),
                      borderRadius: '5px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      marginTop: '20px',
                    }}
                  >
                    {clickTabState === undefined ? 'ALL' : clickTabInfo.scheduleTabNm}
                  </div>
                </>
              )}
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
                avatar={<Avatar alt={`${data.userNm} img`} src={data.userPic} />}
                label={data.userNm}
                style={{
                  backgroundColor: 'rgba(20, 81, 51, 0.8)',
                  color: '#ffffff',
                  marginLeft: '5px',
                  marginBottom: '5px',
                }}
                clickable
              />
              {scheduleInfo.scheduleMembers.map((value, index) => (
                <Chip
                  key={`scheduleMembers-${index}`}
                  avatar={<Avatar alt={`${data.userNm} img`} src='img/RIcon.png' />}
                  label={value.userNm}
                  style={{
                    marginLeft: '5px',
                    marginBottom: '5px',
                  }}
                  clickable
                  onDelete={() => {
                    const copyList = scheduleInfo.scheduleMembers.slice();
                    copyList.splice(index, 1);
                    setScheduleInfo({ ...scheduleInfo, scheduleMembers: copyList });
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
              />
            </div>
          </div>
        )}
        {isShowMemberSearch ? (
          <GroupMemberSearch
            type={1}
            onSelect={(value) =>
              setScheduleInfo({ ...scheduleInfo, scheduleMembers: scheduleInfo.scheduleMembers.concat(value) })
            }
            onCancel={() => setIsShowMemberSearch(false)}
          />
        ) : null}

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
              accept='image/*, video/*, audio/*'
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
              : postAddMediaListSrc.map((value, index) => {
                  if (tagTypeChange(value) === 'image') {
                    return (
                      <div style={{ marginLeft: '10px' }} key={`${index}-postAddMedia`}>
                        <img
                          style={{
                            boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                          id='postAddMedia'
                          src={value}
                        />
                      </div>
                    );
                  } else if (tagTypeChange(value) === 'video') {
                    return (
                      <div style={{ marginLeft: '10px' }} key={`${index}-postAddMedia`}>
                        <video
                          style={{
                            boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                          id='postAddMedia'
                          controls
                        >
                          <source src={value} type='video/mp4' />
                        </video>
                      </div>
                    );
                  } else if (tagTypeChange(value) === 'audio') {
                    return (
                      <div style={{ marginLeft: '10px' }} key={`${index}-postAddMedia`}>
                        <audio
                          style={{
                            boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.6)',
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                          id='postAddMedia'
                          src={value}
                          controls
                          autoplay
                        />
                      </div>
                    );
                  }
                })}
          </div>
        ) : null}
        {alert}
        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            <Button onClick={() => props.onCancel()}>취소</Button>
            <Button onClick={handleClickOpen}>게시</Button>
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
              <Button onClick={handleClose} color='primary' autoFocus>
                취소
              </Button>
              <Button onClick={(handleClose, () => props.onCancel(), onSubmit)} color='primary'>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      {dialog}
      {tabInfo === undefined ? null : (
        <Popover
          open={Boolean(popover)}
          anchorEl={popover === null ? null : popover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
          onClose={() => setPopover(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
            <Button
              style={{ width: '200px' }}
              onClick={() => {
                setClickTabState(undefined);
                setPopover(null);
              }}
              style={{ backgroundColor: '#ffc500', color: colorContrast('#ffc500') }}
            >
              ALL
            </Button>
            {tabInfo.map((value) => {
              return (
                <Button
                  key={`tabInfo-${value.scheduleTabCd}`}
                  onClick={() => {
                    setClickTabState(value.scheduleTabCd);
                    setPopover(null);
                  }}
                  style={{
                    backgroundColor: value.scheduleTabColor,
                    color: colorContrast(value.scheduleTabColor),
                    width: '200px',
                  }}
                >
                  {value.scheduleTabNm}
                </Button>
              );
            })}
          </div>
        </Popover>
      )}
    </Dialog>
  );
};

export default PostMediaScheduleAppend;
