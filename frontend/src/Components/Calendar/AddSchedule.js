import React, { useState } from 'react';

import { Dialog, DialogActions } from '@material-ui/core';

import DTP from '../UI/DTP';
import PublicRange from '../UI/PublicRange';
import { ChromePicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GroupMemberSearch from '../Group/GroupMemberSearch';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';

import { addHours, startOfDay, endOfDay, startOfSecond } from 'date-fns';

import axios from 'axios';

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// 255,197,0
export default ({ data, clickDate, onClose, onSuccess }) => {
  const [color, setColor] = useState({
    r: 255,
    g: 197,
    b: 0,
    a: 1,
  });
  const [isColorClick, setIsColorClick] = useState(false);
  const [info, setInfo] = useState({
    tabCd: null,
    userCd: data.userCd,
    scheduleNm: '',
    scheduleEx: '',
    scheduleStr: clickDate,
    scheduleEnd: addHours(clickDate, 1),
    schedulePublicState: 0,
    scheduleMembers: [],
  });
  const [switchInfo, setSwitchInfo] = useState({
    str: false,
    end: false,
  });
  const [isShowMemberSearch, setIsShowMemberSearch] = useState(false);
  const [dialog, setDialog] = useState(null);
  return (
    <Dialog open onClose={() => onClose()}>
      <div style={{ padding: '8px 10px', borderTop: `rgba(${color.r},${color.g},${color.b},${color.a}) 6px solid` }}>
        <div className='Post-Append-title post-Append'>
          <TextField id='post_title' label='제목' onChange={(e) => setInfo({ ...info, scheduleNm: e.target.value })} />

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
        <div className='selectColor-form'>
          <TextField id='post_title' label='비고' onChange={(e) => setInfo({ ...info, scheduleEx: e.target.value })} />
        </div>
        <div className='Post-Append-Schedule'>
          <DTP
            strDate={info.scheduleStr}
            endDate={info.scheduleEnd}
            onChangeStrDate={(value) => setInfo({ ...info, scheduleStr: value })}
            onChangeEndDate={(value) => setInfo({ ...info, scheduleEnd: value })}
            switchInfo={switchInfo}
            onChangeSwitch={(value) => setSwitchInfo(value)}
          />
        </div>
        <div className='Post-Append-Tag-User post-Append'>
          <Chip
            avatar={
              // <Avatar alt={`${info.user_id} img`} src={info.user_pic} />
              <Avatar alt={`${data.userNm} img`} src='img/RIcon.png' />
            }
            label={data.userNm}
            style={{
              backgroundColor: 'rgba(20, 81, 51, 0.8)',
              color: '#ffffff',
              marginLeft: '5px',
              marginBottom: '5px',
            }}
            clickable
          />
          {info.scheduleMembers.map((value, index) => (
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
                const copyList = info.scheduleMembers.slice();
                copyList.splice(index, 1);
                setInfo({ ...info, scheduleMembers: copyList });
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
      <DialogActions>
        <PublicRange
          onSetSelectedIndex={(index) => setInfo({ ...info, schedulePublicState: index })}
          selectedIndex={info.schedulePublicState}
        />
        <Button>취소</Button>
        <Button
          onClick={async () => {
            setDialog(<Snackbar severit='info' content='데이터 요청중...' onClose={() => setDialog(null)} />);

            const str = switchInfo.str ? startOfDay(info.scheduleStr) : info.scheduleStr;
            const end = switchInfo.end ? startOfSecond(endOfDay(info.scheduleEnd)) : info.scheduleEnd;
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
            console.log({
              tabCd: null,
              userCd: data.userCd,
              scheduleNm: info.scheduleNm,
              scheduleEx: info.scheduleEx,
              scheduleStr: str.getTime(),
              scheduleEnd: end.getTime(),
              scheduleCol: rgbToHex(color.r, color.g, color.b),
              schedulePublicState: info.schedulePublicState,
            });
            try {
              const scCd = (
                await axios.post('/schedule/', {
                  tabCd: null,
                  userCd: data.userCd,
                  scheduleNm: info.scheduleNm,
                  scheduleEx: info.scheduleEx,
                  scheduleStr: str.getTime(),
                  scheduleEnd: end.getTime(),
                  scheduleCol: rgbToHex(color.r, color.g, color.b),
                  schedulePublicState: info.schedulePublicState,
                })
              ).data;
              onSuccess({
                cd: scCd,
                nm: info.scheduleNm,
                ex: info.scheduleEx,
                start: str,
                end: end,
                color: rgbToHex(color.r, color.g, color.b),
              });
            } catch (error) {
              console.log(error);
              setDialog(<Snackbar severit='error' content={error} onClose={() => setDialog(null)} />);
            }
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
      {isShowMemberSearch ? (
        <GroupMemberSearch
          type={1}
          onSelect={(value) => setInfo({ ...info, scheduleMembers: info.scheduleMembers.concat(value) })}
          onCancel={() => setIsShowMemberSearch(false)}
        />
      ) : null}
      {dialog}
    </Dialog>
  );
};
