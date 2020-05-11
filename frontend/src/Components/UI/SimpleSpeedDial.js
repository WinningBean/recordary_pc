import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ShareIcon from '@material-ui/icons/Share';
import PostMediaScheduleAppend from '../Profile/PostMediaScheduleAppend';
// import PostMediaScheduleAppend from '../../Containers/Profile/PostMediaScheduleAppend';

import ScheduleShare from '../Timeline/ScheduleShare';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [postMediaScheduleClick, setPostMediaScheduleClick] = React.useState(null);
  const [scheduleShareClick, setScheduleShareClick] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const PostMediaScheduleWrite = () => {
    if (postMediaScheduleClick === null) {
      setPostMediaScheduleClick(
        <PostMediaScheduleAppend data={props.data} onCancel={() => setPostMediaScheduleClick(null)} />
      );
      return;
    }
    setPostMediaScheduleClick(null);
    return null;
  };
  const ScheduleShareForm = () => {
    if (scheduleShareClick === null) {
      setScheduleShareClick(<ScheduleShare isMyCalendar={false} onCancel={() => setScheduleShareClick(null)} />);
      return;
    }
    setScheduleShareClick(null);
    return null;
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel='SpeedDial example'
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            key={'PostAppend'}
            icon={<PostAddIcon />}
            tooltipTitle={'PostAppend'}
            onClick={PostMediaScheduleWrite}
          />
          <SpeedDialAction
            key={'PosShared'}
            icon={<ShareIcon />}
            tooltipTitle={'PosShared'}
            onClick={ScheduleShareForm}
          />
          {postMediaScheduleClick}
          {scheduleShareClick}
        </SpeedDial>
      </div>
    </div>
  );
}
