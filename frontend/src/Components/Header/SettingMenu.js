import React, { useState } from 'react';
import './header.css';
import UserEditor from 'Components/Header/UserEditor';
import AlertSetting from 'Components/Header/AlertSetting';
import PublicSetting from 'Components/Header/PublicSetting';
import LockSetting from 'Components/Header/LockSetting';
import AdviceSetting from 'Components/Header/AdviceSetting';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LockIcon from '@material-ui/icons/Lock';
import SecurityIcon from '@material-ui/icons/Security';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  root: {
    width: '700px',
    height: '600px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // width: '200px',
    width: '200px',
    height: '540px',
    boxShadow: '0px 1px 5px lightgray'
  },
  wrap: {
    display: 'flex',
    width: '100%',
    height: '540px'
  },
  content: {
    display: 'flex',
    width: '500px',
    height: '540px',
    padding: '30px 30px'
  }
}));

const SettingMenu = props => {
  const classes = useStyles();
  const [listIndex, setListIndex] = useState(0);
  const data = props.data;

  const currPage = (() => {
    switch (listIndex) {
      case 0:
        return <UserEditor data={data} />;
      case 1:
        return <AlertSetting data={data} />;
      case 2:
        return <PublicSetting data={data} />;
      case 3:
        return <LockSetting data={data} />;
      case 4:
        return <AdviceSetting data={data} />;
    }
  })();

  return (
    <Dialog open onClose={() => props.onClose()}>
      <div className={classes.root}>
        <div className='dialog-header'>
          <div className='dialog-header-icon'>
            <SettingsIcon style={{ fontSize: '44px' }} />
          </div>
          &nbsp; 설정
          <div className='dialog-header-icon' style={{ position: 'absolute', right: '5px' }}>
            <IconButton onClick={() => props.onClose()}>
              <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
            </IconButton>
          </div>
        </div>
        <div className={classes.wrap}>
          <List component='nav' className={classes.list}>
            <ListItem
              button
              selected={listIndex === 0}
              onClick={() => {
                if (listIndex !== 0) {
                  setListIndex(0);
                }
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary='계정' />
            </ListItem>
            <ListItem
              button
              selected={listIndex === 1}
              onClick={() => {
                if (listIndex !== 1) {
                  setListIndex(1);
                }
              }}
            >
              <ListItemIcon>
                <NotificationsNoneIcon />
              </ListItemIcon>
              <ListItemText primary='알림' />
            </ListItem>
            <ListItem
              button
              selected={listIndex === 2}
              onClick={() => {
                if (listIndex !== 2) {
                  setListIndex(2);
                }
              }}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary='공개범위' />
            </ListItem>
            <ListItem
              button
              selected={listIndex === 3}
              onClick={() => {
                if (listIndex !== 3) {
                  setListIndex(3);
                }
              }}
            >
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary='보안' />
            </ListItem>
            <ListItem
              button
              selected={listIndex === 4}
              onClick={() => {
                if (listIndex !== 4) {
                  setListIndex(4);
                }
              }}
            >
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary='도움말' />
            </ListItem>
            <ListItem
              style={{
                position: 'absolute',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor: '#f0efef',
                height: '40px'
              }}
            >
              <div style={{ marginRight: '5px' }}>from.</div>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}> PairyFitt</div>
            </ListItem>
          </List>
          <div className={classes.content}>{currPage}</div>
        </div>
      </div>
    </Dialog>
  );
};

export default SettingMenu;
