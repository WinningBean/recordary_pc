import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import 'Components/Profile/PostAppend.css';
import DTP from 'Components/UI/DTP';
import SelectGroup from 'Components/UI/SelectGroup';
import PublicRange from 'Components/UI/PublicRange';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: '4px',
    marginBottom: '4px'
  }
}));

const CalendarScheduleEdit = props => {
  const classes = useStyles();
  const data = props.data;
  const [open, setOpen] = React.useState(false);
  const [colorClick, setColorClick] = useState(false);
  const [scheduleColor, setScheduleColor] = useState({
    r: '20',
    g: '81',
    b: '51',
    a: '1'
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='post-append-header' style={{ width: '600px' }}>
        <div className='Post-Append-titleName'>
          <CreateIcon
            style={{ fontSize: '40px', color: 'white', marginLeft: '10px' }}
          />
          <div className='PostAdd-title'>일정 수정</div>
        </div>
      </div>

      <div className='Post-Media-Schedule-Append-Form '>
        <div className='Post-Append-Group' style={{ marginLeft: '12px' }}>
          <div>
            <SelectGroup />
          </div>

          <div className='schedule-media-button '>
            <PublicRange />
          </div>
        </div>

        <div>
          <div className='Post-Append-title post-Append'>
            <TextField id='post_title' label='제목' />
            <div className='selectColor-form'>
              <span>일정 색상 설정</span>
              <div
                className='selectColor'
                onClick={() => setColorClick(true)}
                style={{
                  backgroundColor: `rgba(${scheduleColor.r}, ${scheduleColor.g}, ${scheduleColor.b}, ${scheduleColor.a})`
                }}
              />
            </div>
          </div>
          <div className='Post-Append-Schedule'>
            <DTP />
          </div>
          <div className='Post-Append-Tag-User post-Append'>
            <Chip
              avatar={<Avatar alt='이미지' src='img/RIcon.png' />}
              className={classes.chip}
              label='성호'
              style={{
                backgroundColor: 'rgba(20, 81, 51, 0.8)',
                color: '#ffffff',
                marginLeft: '5px'
              }}
              clickable
            />
          </div>
        </div>
        {colorClick === true ? (
          <Popover
            open={colorClick}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left'
            }}
            onClose={() => setColorClick(false)}
          >
            <ChromePicker
              color={scheduleColor}
              onChange={color => setScheduleColor(color.rgb)}
            />
          </Popover>
        ) : null}
        <div className='Post-Append-Bottom'>
          <div className='Post-Upload-buttons'>
            <Button>수정</Button>
            <Button onClick={() => props.onCancel()}>취소</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CalendarScheduleEdit;
