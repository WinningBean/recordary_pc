import React from 'react';
import NotifyIconCount from './NotifyIconCount';

import { styled, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

const NotifyPopup = ({ data, onAccept, onDenial }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
  if (data !== undefined) {
    return (
      <div>
        <IconButton {...bindTrigger(popupState)}>
          <StyledBadge badgeContent={data.length} color='secondary'>
            <NotificationsIcon style={{ fontSize: 38, color: 'lightsteelblue' }} />
          </StyledBadge>
        </IconButton>
        <Menu
          {...bindMenu(popupState)}
          style={{ marginTop: '5px' }}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {data.length <= 0 ? (
            <MenuItem
              onClick={() => {
                popupState.close();
              }}
            >
              <div style={{ height: '100%', width: '100%', textAlign: 'center', color: 'lightgray' }}>
                알림이 없습니다.
              </div>
            </MenuItem>
          ) : (
            data.map((value, index) => (
              <div key={index}>
                <MenuItem>
                  <div className='notify-list'>
                    <div className='notify-list-time'>시간도 보내줘야돼</div>
                    <div>{`${value.userId}(${value.userNm}) 님이 그룹신청을 하였습니다.`}</div>
                  </div>
                </MenuItem>
                <div style={{ display: 'flex' }}>
                  <MenuItem
                    style={{ flex: 1 }}
                    onClick={() => {
                      onAccept(index);
                      // popupState.close();
                    }}
                  >
                    <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>수락</div>
                  </MenuItem>
                  <MenuItem
                    style={{ flex: 1 }}
                    onClick={() => {
                      onDenial(index);
                    }}
                  >
                    <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>거절</div>
                  </MenuItem>
                </div>
              </div>
            ))
          )}
        </Menu>
      </div>
    );
  }
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const IconButton = styled(Button)({
  minWidth: '40px',
  height: '50px',
});

export default NotifyPopup;
