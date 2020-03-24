import React, { useState } from 'react';

import * as dateFns from 'date-fns';

import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const ToDoList = () => {
  const [today, setToday] = useState(new Date());

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
              style={{
                width: '300px',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                margin: '20px 10px',
                maxHeight: '350px'
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>To Do List</span>
                <PlaylistAddIcon style={{ fontSize: 30 }} />
              </div>

              <div style={{ border: '2px solid lightgray' }} />
              <div
                style={{
                  margin: '10px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid lightgray'
                }}
              >
                <div style={{ fontSize: '15px', color: 'gray' }}>{dateFns.format(today, 'yyyy-MM-dd')}</div>
                <FormControlLabel control={<Checkbox />} label='모바일 프로그래밍 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='졸업작품 디자인 수정' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid lightgray' }}>
                <div style={{ fontSize: '15px', color: 'gray' }}>2020-03-26</div>
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
                <FormControlLabel control={<Checkbox />} label='EnterPrise Java 강의 듣기' />
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
export default ToDoList;
