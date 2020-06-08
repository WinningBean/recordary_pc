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

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));

const CalendarScheduleEdit = ({ onCancel, info, onChangeStrDate, onChangeEndData, userCd, groupCd }) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [colorClick, setColorClick] = useState(false);
  const [switchInfo, setSwitchInfo] = useState(false);
  const [scheduleColor, setScheduleColor] = useState({
    r: '20',
    g: '81',
    b: '51',
    a: '1',
  });
  const [schedule, setSchedule] = useState(info);
  const [addedSchedule, setAddedSchedule] = useState([]);
  const [subtractedSchedule, setSubtractedSchedule] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div
        className='post-append-header'
        style={{
          width: '600px',
          transitionProperty: 'background-color',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease-out',
          backgroundColor: `rgba(${scheduleColor.r}, ${scheduleColor.g}, ${scheduleColor.b}, ${scheduleColor.a})`,
        }}
      >
        <div className='Post-Append-titleName'>
          <CreateIcon style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }} />
          <div className='PostAdd-title'>일정 수정</div>
        </div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div>
          <div className='Post-Append-title post-Append'>
            <TextField
              id='post_title'
              label='제목'
              defaultValue={schedule.ex}
              onChange={(e) => setSchedule({ ...schedule, ex: e.target.value })}
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
            <Chip
              avatar={<Avatar alt='이미지' src='img/RIcon.png' />}
              className={classes.chip}
              label='성호'
              style={{
                marginLeft: '5px',
                marginBottom: '5px',
              }}
              clickable
            />
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
        </div>
        {colorClick === true ? (
          <Popover
            open={colorClick}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            onClose={() => setColorClick(false)}
          >
            <ChromePicker color={scheduleColor} onChange={(color) => setScheduleColor(color.rgb)} />
          </Popover>
        ) : null}
        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            <PublicRange />
            <Button
              onClick={async () => {
                const str = switchInfo ? dateFns.startOfDay(schedule.start) : schedule.start;
                const end = switchInfo ? dateFns.startOfSecond(dateFns.endOfDay(schedule.end)) : schedule.end;
                console.log(groupCd, userCd);

                await axios.post(`/schedule/update/${schedule.cd}`, {
                  groupCd: groupCd,
                  TabCodeFK: schedule.cd,
                  scheduleNm: schedule.nm,
                  scheduleEx: schedule.ex,
                  scheduleStr: str.getTime(),
                  scheduleEnd: end.getTime(),
                  scheduleCol: schedule.color,
                  schedulePublicState: schedule.state,
                  createMember: addedSchedule,
                  deleteMember: subtractedSchedule,
                });
              }}
            >
              수정
            </Button>
            <Button onClick={() => onCancel()}>취소</Button>
          </div>
        </div>
      </div>
      {dialog}
    </Dialog>
  );
};

export default CalendarScheduleEdit;
