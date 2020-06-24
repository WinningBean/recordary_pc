import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import '../Profile/PostAppend.css';
import DTP from '../UI/DTP';
import AlertDialog from '../Other/AlertDialog';
import GroupMemberSearch from '../Group/GroupMemberSearch';
import PublicRange from '../UI/PublicRange';

import Snackbar from '../UI/Snackbar';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import CreateIcon from '@material-ui/icons/Create';

import * as dateFns from 'date-fns';

import { colorContrast } from '../Other/ColorTransfer';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));

const CalendarScheduleEdit = ({
  onCancel,
  info,
  onChangeStrDate,
  onChangeEndData,
  userCd,
  groupCd,
  onModify,
  userInfo,
  tabInfo,
  clickTab,
}) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(null);
  const [colorRef, setColorRef] = useState(null);
  const [switchInfo, setSwitchInfo] = useState(false);
  const [schedule, setSchedule] = useState(info);
  const [addedSchedule, setAddedSchedule] = useState([]);
  const [subtractedSchedule, setSubtractedSchedule] = useState([]);
  const [clickTabState, setClickTabState] = useState(info.tab === null ? undefined : info.tab);
  const [tabPopover, setTabPopover] = useState(null);

  console.log(schedule);

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
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => onCancel()}>
      <div
        className='post-append-header'
        style={{
          width: '600px',
          transitionProperty: 'background-color',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease-out',
          backgroundColor: schedule.color,
        }}
      >
        <div className='Post-Append-titleName'>
          <CreateIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title' style={{ color: colorContrast(schedule.color) }}>
            일정 수정
          </div>
        </div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div>
          <div className='Post-Append-title post-Append'>
            <TextField
              id='post_title'
              label='제목'
              defaultValue={info.nm}
              onChange={(e) => setSchedule({ ...schedule, nm: e.target.value })}
            />
            <div className='selectColor-form'>
              <span>일정 색상 설정</span>
              <div
                className='selectColor'
                onClick={(e) => setColorRef(e.currentTarget)}
                style={{
                  backgroundColor: schedule.color,
                }}
              />
            </div>
          </div>
          <div className='Post-Append-title post-Append'>
            <TextField
              id='post_ex'
              label='비고'
              defaultValue={info.ex}
              onChange={(e) => setSchedule({ ...schedule, ex: e.target.value })}
            />
            {tabInfo === undefined ? null : (
              <>
                <span>선택한 탭 :</span>
                <div
                  className='transition-all'
                  onClick={(e) => {
                    setTabPopover(e.currentTarget);
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
              strDate={schedule.start}
              endDate={schedule.end}
              onChangeStrDate={(data) => setSchedule({ ...schedule, start: data })}
              onChangeEndDate={(data) => setSchedule({ ...schedule, end: data })}
              switchInfo={switchInfo}
              onChangeSwitch={(bool) => setSwitchInfo(bool)}
            />
          </div>
          <div className='Post-Append-Tag-User post-Append'>
            {userInfo === null ? null : (
              <Chip
                avatar={<Avatar alt='이미지' src={userInfo.userPic} />}
                className={classes.chip}
                label={userInfo.userNm}
                style={{
                  marginLeft: '5px',
                  marginBottom: '5px',
                }}
                clickable
              />
            )}

            {schedule.members.map((value, index) => (
              <Chip
                avatar={<Avatar alt={`${value.userNm} img`} src={value.userPic} />}
                key={`member-${value.userCd}`}
                className={classes.chip}
                label={value.userNm}
                clickable
                variant='outlined'
                onDelete={() => {
                  setDialog(
                    <AlertDialog
                      severity='info'
                      content='정말로 삭제하시겠습니까'
                      onAlertClose={() => setDialog(null)}
                      onAlertSubmit={() => {
                        const k = JSON.parse(JSON.stringify(schedule.members));
                        k.splice(index, 1);
                        setSchedule({
                          ...schedule,
                          members: k,
                        });
                        setSubtractedSchedule(subtractedSchedule.concat(value.userCd));
                        setDialog(
                          <Snackbar
                            severity='success'
                            content='삭제하였습니다'
                            duration={1000}
                            onClose={() => setDialog(null)}
                          />
                        );
                      }}
                    />
                  );
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
              onClick={() =>
                setDialog(
                  <GroupMemberSearch
                    type={1}
                    onSelect={(value) => {
                      var isOverlap = false;
                      for (let i = 0; i < schedule.members.length; i++) {
                        if (value.userCd === schedule.members[i].userCd || value.userCd === userCd) {
                          return;
                        }
                      }
                      setSchedule({ ...schedule, members: schedule.members.concat(value) });
                      setAddedSchedule(addedSchedule.concat(value.userCd));
                      setDialog(
                        <Snackbar
                          severity='success'
                          content='추가하였습니다.'
                          duration={1000}
                          onClose={() => setDialog(null)}
                        />
                      );
                    }}
                    onCancel={() => setDialog(false)}
                  />
                )
              }
            />
            {/* {isShowMemberSearch ? (
              <GroupMemberSearch
                type={1}
                onSelect={(value) => setInfo({ ...info, scheduleMembers: info.scheduleMembers.concat(value) })}
                onCancel={() => setIsShowMemberSearch(false)}
              />
            ) : null} */}
          </div>
          <div style={{ color: 'green', fontSize: 12, paddingLeft: '16px' }}>
            일정에 같이 참여하는 유저를 추가할 수 있습니다.
          </div>
        </div>
        <Popover
          open={Boolean(colorRef)}
          anchorEl={colorRef}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
          onClose={() => setColorRef(null)}
        >
          <ChromePicker
            disableAlpha={true}
            color={schedule.color}
            onChange={(color) => {
              setSchedule({ ...schedule, color: color.hex });
            }}
          />
        </Popover>
        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            {groupCd !== undefined ? (
              <PublicRange
                options={['전체공개', '비공개']}
                onSetSelectedIndex={(index) => setSchedule({ ...schedule, state: index === 0 ? 0 : 3 })}
                selectedIndex={schedule.state === 0 ? 0 : 1}
              />
            ) : (
              <PublicRange
                selectedIndex={schedule.state}
                onSetSelectedIndex={(_state) => {
                  setSchedule({ ...schedule, state: _state });
                }}
              />
            )}

            <Button
              onClick={async () => {
                const str = switchInfo ? dateFns.startOfDay(schedule.start) : schedule.start;
                const end = switchInfo ? dateFns.startOfSecond(dateFns.endOfDay(schedule.end)) : schedule.end;
                console.log(groupCd, userCd, schedule.tab);

                try {
                  await axios.post(`/schedule/update/${schedule.cd}`, {
                    groupCd: groupCd === undefined ? null : groupCd,
                    TabCodeFK: clickTabState === undefined ? null : clickTabState,
                    scheduleNm: schedule.nm,
                    scheduleEx: schedule.ex,
                    scheduleStr: str.getTime(),
                    scheduleEnd: end.getTime(),
                    scheduleCol: schedule.color,
                    schedulePublicState: schedule.state,
                    createMember: addedSchedule,
                    deleteMember: subtractedSchedule,
                  });
                  onModify(schedule);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              수정
            </Button>
            <Button onClick={() => onCancel()}>취소</Button>
          </div>
        </div>
      </div>
      {dialog}
      {tabInfo === undefined ? null : (
        <Popover
          open={Boolean(tabPopover)}
          anchorEl={tabPopover === null ? null : tabPopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
          onClose={() => setTabPopover(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
            <Button
              style={{ width: '200px' }}
              onClick={() => {
                setClickTabState(undefined);
                setTabPopover(null);
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
                    setTabPopover(null);
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

export default CalendarScheduleEdit;
