import React, { useState } from 'react';

import { Dialog, DialogActions } from '@material-ui/core';

import DTP from '../UI/DTP';
import { ChromePicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { format } from 'date-fns';

import axios from 'axios';

export default ({ userCd }) => {
  const [color, setColor] = useState({
    r: 0,
    g: 130,
    b: 0,
    a: 1,
  });
  const [isColorClick, setIsColorClick] = useState(false);
  const [info, setInfo] = useState({
    tabCd: null,
    userCd: userCd,
    scheduleNm: '',
    scheduleEx: '',
    scheduleStr: new Date(),
    scheduleEnd: new Date(),
    schedulePublicState: true,
  });
  return (
    <Dialog open onClose={() => this.setState({ isOpenAddSc: false })}>
      <div>
        <div className='Post-Append-title post-Append'>
          <TextField id='post_title' label='제목' onChange={(e) => setInfo({ ...info, scheduleNm: e.target.value })} />
          <TextField id='post_title' label='비고' onChange={(e) => setInfo({ ...info, scheduleEx: e.target.value })} />
          <div className='selectColor-form'>
            <span>일정 색상 설정</span>
            <div
              className='selectColor'
              onClick={() => {
                setIsColorClick(true);
              }}
              style={{
                backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
              }}
            />
          </div>
        </div>
        <div className='Post-Append-Schedule'>
          <DTP
            strDate={info.scheduleStr}
            endDate={info.scheduleEnd}
            onChangeStrDate={(value) => setInfo({ ...info, scheduleStr: value })}
            onChangeEndDate={(value) => setInfo({ ...info, scheduleEnd: value })}
          />
        </div>
        <div className='Post-Append-Tag-User post-Append'>
          {/* <Link to={`/${info.user_id}`}> */}
          <Chip
            avatar={
              // <Avatar alt={`${info.user_id} img`} src={info.user_pic} />
              <Avatar alt='이미지' src='img/RIcon.png' />
            }
            style={{
              marginRight: '4px',
              marginBottom: '4px',
            }}
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
      <DialogActions>
        <Button>취소</Button>
        <Button
          onClick={async () => {
            console.log({
              tabCd: null,
              userCd: userCd,
              scheduleNm: info.scheduleNm,
              scheduleEx: info.scheduleEx,
              scheduleStr: format(info.scheduleStr, 'yyyy-MM-dd hh:mm:ss a'),
              scheduleEnd: format(info.scheduleEnd, 'yyyy-MM-dd hh:mm:ss a'),
              scheduleCol: `rgba(${color.r},${color.g},${color.b},${color.a})`,
              schedulePublicState: 0,
            });
            const { data } = await axios.post('/schedule/', {
              tabCd: null,
              userCd: userCd,
              scheduleNm: info.scheduleNm,
              scheduleEx: info.scheduleEx,
              scheduleStr: format(info.scheduleStr, 'yyyy-MM-dd hh:mm:ss a'),
              scheduleEnd: format(info.scheduleEnd, 'yyyy-MM-dd hh:mm:ss a'),
              scheduleCol: `rgba(${color.r},${color.g},${color.b},${color.a})`,
              schedulePublicState: info.schedulePublicState,
            });
            console.log(data);
          }}
        >
          완료
        </Button>
      </DialogActions>
      {isColorClick === true ? (
        <Dialog open onClose={() => setIsColorClick(false)}>
          <div>
            <ChromePicker color={color} onChange={(color) => setColor(color.rgb)} />
          </div>
        </Dialog>
      ) : null}
    </Dialog>
  );
};
