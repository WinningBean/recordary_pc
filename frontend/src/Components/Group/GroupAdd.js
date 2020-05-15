import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import ImageEditor from '../Other/ImageEditor';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';
import Backdrop from '../UI/Backdrop';
import axios from 'axios';

const GroupAdd = (props) => {
  const [openSwitch, setOpenSwitch] = useState({
    open: true,
  });

  const [group, setGroup] = useState({
    group_nm: '',
    group_ex: '',
    group_pic: null,
    group_admin: props.data.userCd,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [alert, setAlert] = useState(null);

  let fileUpload = null;

  const changeHandel = (e) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  const onMinimumSize = (src) => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    const cut = new Image();
    cut.src = src;
    let height = cut.height;
    let width = cut.width;
    if (height < 250 && width < 250) {
      return canvas.toDataURL('image/jpg');
    }
    height *= 250 / width;
    width = 250;
    canvas.width = width;
    canvas.height = height;
    // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
    ctx.drawImage(cut, 0, 0, width, height);
    // canvas 에 있는 이미지를 img 태그로 넣어줍니다
    return canvas.toDataURL('image/jpg');
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

  const onSubmit = async () => {
    setAlert(<Backdrop />);

    var url = null;
    var groupCd = undefined;

    try {
      groupCd = (
        await axios.post('/group/create', {
          userCd: group.group_admin,
          userId: props.data.userId,
          groupNm: group.group_nm,
          groupState: openSwitch.open,
          groupEx: group.group_ex,
        })
      ).data;

      if (group.group_pic !== null) {
        const blob = dataURLToBlob(group.group_pic);
        const formData = new FormData();
        formData.append('data', blob);
        url = (
          await axios.post(`/group/updateProfile/${groupCd}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
          })
        ).data;
      }

      if (Number.isInteger(groupCd)) {
        props.onAdd({
          userCd: group.group_admin,
          userId: props.data.userId,
          groupCd: groupCd,
          groupNm: group.group_nm,
          groupState: openSwitch.open,
          groupPic: group.group_pic,
          groupEx: group.group_ex,
        });
        setAlert(
          <AlertDialog severity='success' content='그룹을 생성하였습니다.' onAlertClose={() => setAlert(null)} />
        );
        props.onClose();
      } else {
        setAlert(<Snackbar severity='error' content='그룹 생성에 실패하였습니다.' onClose={() => setAlert(null)} />);
      }
    } catch (error) {
      console.error(error);
      setAlert(
        <Snackbar severity='error' content='서버 에러로 그룹 생성에 실패하였습니다.' onClose={() => setAlert(null)} />
      );
    }
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='dialog-wrap'>
        <div className='dialog-header'>
          <div className='dialog-header-icon'>
            <GroupAddIcon style={{ fontSize: '44px' }} />
          </div>
          &nbsp;
          <span>그룹 생성</span>
        </div>
        <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='dialog-content'>
            <div>
              <img
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
                alt='profile-img'
                src={
                  group.group_pic !== null
                    ? group.group_pic
                    : 'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/basic.png'
                }
              />
            </div>
            <Button
              startIcon={<CloudUploadIcon />}
              variant='outlined'
              onClick={() => fileUpload.click()}
              // onClick={()=>{
              //     setImageEditor(
              //         <ImageEditor
              //             src={user.user_pic}
              //             onClose={() => this.setState({ imageSrc: null })}
              //             onComplete={(src) => this.setState({ imageSrc: null, user_pic: src })}
              //         />
              //     )
              // }}
            >
              &nbsp;Upload
            </Button>
          </div>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={(file) => {
              fileUpload = file;
            }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener('load', () => setImageSrc(reader.result));
                reader.readAsDataURL(e.target.files[0]);
                e.target.value = null;
              }
            }}
          />
          <div className='dialog-content'>
            <TextField label='그룹명' name='group_nm' onChange={changeHandel} />
            <TextField
              label='그룹 설명'
              name='group_ex'
              multiline={true}
              rows={10}
              rowsMax={10}
              onChange={changeHandel}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Tooltip title='검색시 그룹이 보여집니다.' placement='top'>
            <FormControlLabel
              control={
                <Switch
                  checked={openSwitch.open}
                  onChange={(event) =>
                    setOpenSwitch({
                      open: event.target.checked,
                    })
                  }
                  color='primary'
                />
              }
              label='그룹 공개'
            />
          </Tooltip>
          <Button color='secondary' onClick={() => props.onClose()}>
            취소
          </Button>
          <Button color='primary' onClick={onSubmit}>
            생성
          </Button>
        </DialogActions>
        {imageSrc && (
          <ImageEditor
            src={imageSrc}
            onClose={() => setImageSrc(null)}
            onComplete={(src) => {
              setImageSrc(null);
              setGroup({ ...group, group_pic: src });
            }}
          />
        )}
      </div>
      {alert}
    </Dialog>
  );
};

export default GroupAdd;
