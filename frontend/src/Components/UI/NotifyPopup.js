import React from 'react';
import NotifyIconCount from './NotifyIconCount';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

const NotifyPopup = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu'
  });
  return (
    <div>
      <IconButton {...bindTrigger(popupState)}>
        <NotifyIconCount />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        style={{ marginTop: '5px' }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={popupState.close}>
          <div className='notify-list'>
            <div className='notify-list-time'>1시간 전</div>
            <div>'Wee Sung Ho'님이 팔로우 하였습니다.</div>
          </div>
        </MenuItem>
        <MenuItem onClick={popupState.close}>
          <div className='notify-list'>
            <div className='notify-list-time'>1일 전</div>
            <div>'WaterGlasses' 님이 팔로우 하였습니다.</div>
          </div>
        </MenuItem>
        <MenuItem onClick={popupState.close}>
          <div className='notify-list'>
            <div className='notify-list-time'>7일 전</div>
            <div>'Choi Ju Wun' 님이 팔로우 하였습니다.</div>
          </div>
        </MenuItem>
        <MenuItem onClick={popupState.close}>
          <div className='notify-list'>
            <div className='notify-list-time'>1달 전</div>
            <div>'Wsb' 님이 팔로우 하였습니다.</div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const IconButton = styled(Button)({
  minWidth: '40px',
  height: '50px'
});

export default NotifyPopup;
