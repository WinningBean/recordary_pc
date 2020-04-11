import React, { useState } from 'react';

import * as dateFns from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import './header.css';

import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const ToDoList = () => {
  const [today, setToday] = useState(new Date());
  const [toDoAdd, setToDoAdd] = useState(false);
  const [listOpen, setListOpen] = useState({
    first: false,
    second: false,
    third: false
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [doList, setDoList] = useState([
    {
      day: new Date('2020-03-24'),
      ex: 'EnterPrise Java 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-25'),
      ex: '시스템 분석 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-26'),
      ex: '강교수님 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-26'),
      ex: '모바일 프로그래밍 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-26'),
      ex: '운영체제 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-27'),
      ex: '투썸 강의 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-27'),
      ex: '스타벅스 듣기',
      checked: false
    },
    {
      day: new Date('2020-03-28'),
      ex: '이디야',
      checked: false
    },
    {
      day: new Date('2020-03-29'),
      ex: '카페베네',
      checked: false
    },
    {
      day: new Date('2020-03-29'),
      ex: '아이스크림',
      checked: false
    },
    {
      day: new Date('2020-03-29'),
      ex: '아이스 아메리카노',
      checked: false
    },
    {
      day: new Date('2020-03-30'),
      ex: '아이스티',
      checked: false
    },
    {
      day: new Date('2020-03-31'),
      ex: '카페라떼',
      checked: false
    }
  ]);

  let count = 0;
  const [beforeList, setBeforeList] = useState(false);
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {popupState => (
        <div className='header-ring'>
          <ToDoButton {...bindTrigger(popupState)}>
            <AssignmentIcon style={{ fontSize: 37, color: 'white' }} />
          </ToDoButton>
          <Popover
            style={{ marginTop: '5px' }}
            {...bindPopover(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div
              className='todoList'
              style={{
                width: '300px',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                margin: '10px 20px 20px 20px',
                maxHeight: '400px'
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  paddingBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>To Do List</span>
                <ToDoPlusButton>
                  <PlaylistAddIcon style={{ fontSize: 30 }} onClick={() => setToDoAdd(true)} />
                </ToDoPlusButton>
                {toDoAdd === true ? (
                  <Dialog open onClose={() => setToDoAdd(false)} style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
                    <div style={{ width: '500px' }}>
                      <div className='dialog-header'>
                        <div className='dialog-header-icon'>
                          <PlaylistAddIcon style={{ fontSize: '44px' }} />
                        </div>
                        &nbsp;
                        <span>할 일 추가</span>
                      </div>
                      <div style={{ marginLeft: '20px' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            variant='inline'
                            format='yyyy-MM-dd'
                            margin='normal'
                            id='date-picker-inline'
                            label='To Do List Add'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <div style={{ margin: '10px 20px 10px 20px' }}>
                        <TextField
                          style={{ width: '460px' }}
                          id='to-do-text'
                          label='내용'
                          multiline
                          variant='outlined'
                          rowsMax='3'
                          rows='2'
                          name='to-do-text'
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginBottom: '10px',
                          marginRight: '20px'
                        }}
                      >
                        <Button onClick={() => setToDoAdd(false)} autoFocus>
                          추가
                        </Button>
                        <Button onClick={() => setToDoAdd(false)} autoFocus>
                          취소
                        </Button>
                      </div>
                    </div>
                  </Dialog>
                ) : null}
              </div>
              <div style={{ border: '2px solid lightgray', marginBottom: '5px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid lightgray' }}>
                {doList.map(value => {
                  if (dateFns.differenceInCalendarDays(today, value.day) > 0) {
                    count = count + 1;
                  }
                })}
                {count > 0 ? (
                  <div
                    className='before-todo'
                    style={{ fontSize: '15px', color: 'lightgray', display: 'flex', justifyContent: 'center' }}
                    onClick={() => setBeforeList(!beforeList)}
                  >
                    {beforeList === false ? (
                      <KeyboardArrowDownIcon fontSize='8px' />
                    ) : (
                      <KeyboardArrowUpIcon fontSize='8px' />
                    )}
                  </div>
                ) : null}
                <div style={beforeList === true ? { borderBottom: '1px solid lightgray' } : null}>
                  {beforeList === true
                    ? doList.map(value => {
                        const diffBeforeDay = dateFns.differenceInCalendarDays(today, value.day);
                        if (diffBeforeDay > 0) {
                          return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <FormControlLabel control={<Checkbox />} label={value.ex} />
                              <div style={{ fontWeight: 'bold' }}>D+{diffBeforeDay}</div>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0px'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 'bold', paddingTop: '5px' }}>D-day</div>
                </div>
                {doList.map(value =>
                  dateFns.differenceInCalendarDays(today, value.day) === 0 ? (
                    <FormControlLabel control={<Checkbox />} label={value.ex} />
                  ) : null
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid lightgray' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0px'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 'bold' }}>D-1</div>
                  <div>
                    {listOpen.first !== true ? (
                      <KeyboardArrowDownIcon onClick={() => setListOpen({ ...listOpen, first: true })} />
                    ) : (
                      <KeyboardArrowUpIcon onClick={() => setListOpen({ ...listOpen, first: false })} />
                    )}
                  </div>
                </div>
                {listOpen.first === true
                  ? doList.map(value => {
                      if (Math.abs(dateFns.differenceInCalendarDays(value.day, today)) === 1) {
                        return <FormControlLabel control={<Checkbox />} label={value.ex} />;
                      }
                    })
                  : null}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid lightgray' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0px'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 'bold' }}>D-2</div>
                  <div>
                    {listOpen.second !== true ? (
                      <KeyboardArrowDownIcon onClick={() => setListOpen({ ...listOpen, second: true })} />
                    ) : (
                      <KeyboardArrowUpIcon onClick={() => setListOpen({ ...listOpen, second: false })} />
                    )}
                  </div>
                </div>
                {listOpen.second === true
                  ? doList.map(value => {
                      if (Math.abs(dateFns.differenceInCalendarDays(value.day, today)) === 2) {
                        return <FormControlLabel control={<Checkbox />} label={value.ex} />;
                      }
                    })
                  : null}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid lightgray' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0px'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 'bold' }}>After Three Days</div>
                  <div>
                    {listOpen.third !== true ? (
                      <KeyboardArrowDownIcon onClick={() => setListOpen({ ...listOpen, third: true })} />
                    ) : (
                      <KeyboardArrowUpIcon onClick={() => setListOpen({ ...listOpen, third: false })} />
                    )}
                  </div>
                </div>
                {listOpen.third === true
                  ? doList.map(value => {
                      const diffDay = Math.abs(dateFns.differenceInCalendarDays(value.day, today));
                      if (diffDay >= 3) {
                        return (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FormControlLabel control={<Checkbox />} label={value.ex} />
                            <div style={{ fontWeight: 'bold' }}>D-{diffDay}</div>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

const ToDoButton = styled(Button)({
  minWidth: '40px',
  height: '50px'
});
const ToDoPlusButton = styled(Button)({
  minWidth: '30px',
  height: '40px',
  marginLeft: '10px'
});

export default ToDoList;
