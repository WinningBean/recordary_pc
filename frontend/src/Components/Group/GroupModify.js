import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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

const GroupModify = (props) => {
  console.log(props.data);
  const [changeData, setChangeData] = useState(props.data);
  const [openSwitch, setOpenSwitch] = useState({
    open: props.data.groupState,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [changePic, setChangePic] = useState(null);
  const [alert, setAlert] = useState(null);

  let fileUpload = null;

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

  const changeHandel = (e) => {
    setChangeData({
      ...changeData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    setAlert(
      // <Snackbar
      //         severity='info'
      //         content='Loading...'
      //         onClose={()=>setAlert(null)}
      //     />
      <Backdrop />
    );
    try {
      var url = null;
      if (changePic !== null) {
        const blob = dataURLToBlob(changePic);
        const formData = new FormData();
        formData.append('data', blob);
        url = (
          await axios.post(`/group/updateProfile/${props.data.groupCd}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
          })
        ).data;
      }
      console.log(url);
      const { data } = await axios.post(`/group/update/${changeData.groupCd}`, {
        groupNm: changeData.groupNm,
        groupEx: changeData.groupEx,
        // groupPic: url === null ? changeData.groupPic : url,
        groupState: openSwitch.open,
      });
      if (Number.isInteger(data)) {
        setAlert(
          <AlertDialog severity='success' content='그룹정보를 변경하였습니다.' onAlertClose={() => setAlert(null)} />
        );
        props.onChange({ ...changeData, groupPic: changePic !== null ? changePic : changeData.groupPic });
      } else {
        setAlert(
          <Snackbar severity='error' content='그룹정보 변경에 실패하였습니다.' onClose={() => setAlert(null)} />
        );
      }
    } catch (error) {
      console.error(error);
      setAlert(
        <Snackbar
          severity='error'
          content='서버 에러로 그룹정보 변경에 실패하였습니다.'
          onClose={() => setAlert(null)}
        />
      );
    }
  };

  return (
    <div className='dialog-wrap'>
      {/* <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupAddIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    <span>그룹 수정</span>
                </div> */}
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
              src={changePic !== null ? changePic : changeData.groupPic}
            />
          </div>
          <Button startIcon={<CloudUploadIcon />} variant='outlined' onClick={() => fileUpload.click()}>
            &nbsp;Upload
          </Button>
        </div>
        <input
          type='file'
          accept='.gif, .jpeg, .jpg, .png'
          style={{ display: 'none' }}
          ref={(file) => {
            fileUpload = file;
          }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              if (e.target.files[0].size > (5 * 1024 * 1024)) {
                setAlert(
                  <Snackbar severity='error' content="파일 용량이 너무 큽니다." onClose={() => setAlert(null)} />
                );
                return;
              }
              const reader = new FileReader();
              reader.addEventListener('load', () => setImageSrc(reader.result));
              reader.readAsDataURL(e.target.files[0]);
              e.target.value = null;
            }
          }}
        />
        <div className='dialog-content'>
          <TextField label='그룹명' name='groupNm' onChange={changeHandel} defaultValue={changeData.groupNm} />
          <TextField
            label='그룹 설명'
            name='groupEx'
            multiline={true}
            rows={10}
            rowsMax={10}
            onChange={changeHandel}
            defaultValue={changeData.groupEx}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Tooltip title='검색시 그룹이 보여집니다.'>
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
        <Button color='primary' onClick={onSubmit}>
          변경
        </Button>
      </DialogActions>
      {imageSrc && (
        <ImageEditor
          src={imageSrc}
          onClose={() => setImageSrc(null)}
          onComplete={(src) => {
            setImageSrc(null);
            // setChangeData({ ...changeData, group : {...changeData.group , group_pic: src} });
            setChangePic(src);
          }}
        />
      )}
      {alert}
    </div>
  );
};

export default GroupModify;
