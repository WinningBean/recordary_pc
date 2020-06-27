import React, { useState } from 'react';

import { Dialog, DialogActions } from '@material-ui/core';

import DTP from '../UI/DTP';
import { colorContrast } from '../Other/ColorTransfer';
import PublicRange from '../UI/PublicRange';
import { ChromePicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import GroupMemberSearch from '../Group/GroupMemberSearch';
import AlertDialog from '../Other/AlertDialog';
import Snackbar from '../UI/Snackbar';

import { rgbToHex } from '../Other/ColorTransfer';

import { addHours, startOfDay, endOfDay, startOfSecond } from 'date-fns';

import axios from 'axios';

import store from '../../store';

// 255,197,0
export default ({ data, clickTab, clickDate, onClose, onSuccess, type, tabInfo }) => {
  const [color, setColor] = useState({
    r: 255,
    g: 197,
    b: 0,
    a: 1,
  });
  const [isColorClick, setIsColorClick] = useState(false);
  console.log(tabInfo);
  const [info, setInfo] = useState({
    tabCd: null,
    groupCd: data.groupCd,
    userCd: data.userCd,
    scheduleNm: '',
    scheduleEx: '',
    scheduleStr: clickDate,
    scheduleEnd: addHours(clickDate, 1),
    schedulePublicState: 0,
    scheduleMembers: [],
  });
  const [switchInfo, setSwitchInfo] = useState(false);
  const [clickTabState, setClickTabState] = useState(clickTab);
  const [isShowMemberSearch, setIsShowMemberSearch] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [popover, setPopover] = useState(null);

  var clickTabInfo = undefined;

  if (clickTabState !== undefined) {
    for (let i = 0; i < tabInfo.length; i++) {
      if (tabInfo[i].scheduleTabCd === clickTabState) {
        clickTabInfo = tabInfo[i];
        break;
      }
    }
  }
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
        <div className='Post-Append-title post-Append'>
          <TextField id='post_title' label='비고' onChange={(e) => setInfo({ ...info, scheduleEx: e.target.value })} />
          {tabInfo === undefined ? null : (
            <>
              <span>선택한 탭 :</span>
              <div
                className='transition-all'
                onClick={(e) => {
                  setPopover(e.currentTarget);
                }}
                style={{
                  height: '36px',
                  width: '200px',
                  backgroundColor: clickTabState === undefined ? '#ffc500' : clickTabInfo.scheduleTabColor,
                  marginLeft: '10px',
                  textAlign: 'center',
                  lineHeight: '36px',
                  textTransform: 'uppercase',
                  color: colorContrast(clickTabState === undefined ? '#ffc500' : clickTabInfo.scheduleTabColor),
                  borderRadius: '5px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {clickTabState === undefined ? 'ALL' : clickTabInfo.scheduleTabNm}
              </div>
            </>
          )}
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
          {info.scheduleMembers.map((value, index) => (
            <Chip
              key={`scheduleMembers-${index}`}
              avatar={<Avatar alt={`${info.userNm} img`} src={value.userPic} />}
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
        <div style={{ color: 'green', fontSize: 12, paddingLeft: '16px' }}>
          일정에 같이 참여하는 유저를 추가할 수 있습니다.
        </div>
      </div>
      <DialogActions>
        {type === 2 || type === 3 ? (
          <PublicRange
            options={['전체공개', '비공개']}
            onSetSelectedIndex={(index) => setInfo({ ...info, schedulePublicState: index === 0 ? 0 : 3 })}
            selectedIndex={info.schedulePublicState === 0 ? 0 : 1}
          />
        ) : (
          <PublicRange
            onSetSelectedIndex={(index) => setInfo({ ...info, schedulePublicState: index })}
            selectedIndex={info.schedulePublicState}
          />
        )}
        <Button onClick={() => onClose()}>취소</Button>
        <Button
          onClick={async () => {
            setDialog(<Snackbar severit='info' content='데이터 요청중...' onClose={() => setDialog(null)} />);

            const str = switchInfo ? startOfDay(info.scheduleStr) : info.scheduleStr;
            const end = switchInfo ? startOfSecond(endOfDay(info.scheduleEnd)) : info.scheduleEnd;
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
              tabCd: clickTabState === undefined ? null : clickTabState,
              groupCd: type === 2 || type === 3 ? data.groupCd : null,
              userCd: type === 2 || type === 3 ? data.currentUserCd : data.userCd,
              scheduleNm: info.scheduleNm,
              scheduleEx: info.scheduleEx,
              scheduleStr: str.getTime(),
              scheduleEnd: end.getTime(),
              scheduleCol: rgbToHex(color.r, color.g, color.b),
              scheduleMember: info.scheduleMembers.map((value) => value.userCd),
              schedulePublicState: info.schedulePublicState,
            });
            try {
              const scCd = (
                await axios.post('/schedule/', {
                  tabCd: clickTabState === undefined ? null : clickTabState,
                  groupCd: type === 2 || type === 3 ? data.groupCd : null,
                  userCd: type === 2 || type === 3 ? data.currentUserCd : data.userCd,
                  scheduleNm: info.scheduleNm,
                  scheduleEx: info.scheduleEx,
                  scheduleStr: str.getTime(),
                  scheduleEnd: end.getTime(),
                  scheduleMember: info.scheduleMembers.map((value) => value.userCd),
                  scheduleCol: rgbToHex(color.r, color.g, color.b),
                  schedulePublicState: info.schedulePublicState,
                })
              ).data;

              const postData = (
                await axios.post(`/post/`, {
                  userCd: type === 2 || type === 3 ? data.currentUserCd : data.userCd,
                  groupCd: type === 2 || type === 3 ? data.groupCd : null,
                  postOriginCd: null,
                  scheduleCd: scCd,
                  mediaCd: null,
                  postEx: info.scheduleEx,
                  postPublicState: 0,
                  postScheduleShareState: false,
                })
              ).data;

              info.scheduleMembers.forEach((value) => {
                store.dispatch({
                  type: 'SAVE_NOTICE',
                  notice: {
                    noticeType: 'GROUP_APPLY_INVITE', // 이벤트 타입
                    activeCd: scCd, // 이벤트 주체
                    targetCd: value.userCd, // 이벤트 대상
                  },
                });
              });

              console.log(postData);
              console.log(scCd);
              onSuccess({
                tab: clickTab === undefined ? null : clickTab,
                cd: scCd,
                nm: info.scheduleNm,
                ex: info.scheduleEx,
                state: info.schedulePublicState,
                start: str,
                end: end,
                members: info.scheduleMembers,
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
