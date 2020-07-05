import React from 'react';
import NotifyIconCount from './NotifyIconCount';

import { styled, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import { format, differenceInCalendarDays, isSameDay } from 'date-fns';

// type === 0 : 그룹
// type === 1 : 일반
const NotifyPopup = ({ data, onAccept, onDenial, type }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });
  if (type === 0) {
    return (
      <div className='notifyIcon'>
        <IconButton {...bindTrigger(popupState)}>
          <StyledBadge badgeContent={data.length} color='secondary'>
            <NotificationsIcon style={{ fontSize: 30, color: '#fff' }} />
          </StyledBadge>
        </IconButton>
        <Menu
          {...bindMenu(popupState)}
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
              <div
                key={index}
                style={{
                  margin: '5px 10px',
                  paddingBottom: '5px',
                  borderBottom: '1px solid lightgray',
                  width: '290px',
                }}
              >
                <MenuItem>
                  <div className='notify-list'>
                    <div className='notify-list-time' style={{ fontSize: '14px' }}>
                      {`${differenceInCalendarDays(new Date(), Date.parse(value.date))}일전`}
                    </div>
                    <div
                      style={{ fontSize: '14px', paddingTop: '5px' }}
                    >{`${value.userId}(${value.userNm}) 님이 그룹신청을 하였습니다.`}</div>
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
  } else if (type === 1) {
    return (
      <div>
        <IconButton {...bindTrigger(popupState)}>
          <StyledBadge badgeContent={data.length} color='secondary'>
            <NotificationsIcon style={{ fontSize: 35, color: '#fff' }} />
          </StyledBadge>
        </IconButton>
        <Menu
          {...bindMenu(popupState)}
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
              <div
                key={index}
                style={{
                  margin: '5px 10px',
                  paddingBottom: '5px',
                  borderBottom: '1px solid lightgray',
                  width: '290px',
                }}
              >
                {value.scheduleCd === null ? (
                  <>
                    <MenuItem>
                      <div className='notify-list'>
                        <div className='notify-list-time' style={{ fontSize: '14px' }}>
                          {isSameDay(new Date(), Date.parse(value.createTime))
                            ? format(Date.parse(value.createTime), 'a') === 'AM'
                              ? '오전 ' + format(Date.parse(value.createTime), 'h:mm')
                              : '오후 ' + format(Date.parse(value.createTime), 'h:mm')
                            : `${format(Date.parse(value.createTime), 'YYY' + ' / ' + 'MM' + ' / ' + 'dd')} ${
                                format(Date.parse(value.createTime), 'a') === 'AM' ? '(오전' : '(오후'
                              } ${format(Date.parse(value.createTime), 'h:mm)')}`}
                        </div>
                        <div
                          style={{ fontSize: '14px', paddingTop: '5px' }}
                        >{`'${value.groupNm}'그룹이 그룹초대하였습니다.`}</div>
                      </div>
                    </MenuItem>
                    <div style={{ display: 'flex' }}>
                      <MenuItem
                        style={{ flex: 1 }}
                        onClick={() => {
                          onAccept(index, true);
                          // popupState.close();
                        }}
                      >
                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>수락</div>
                      </MenuItem>
                      <MenuItem
                        style={{ flex: 1 }}
                        onClick={() => {
                          onDenial(index, true);
                        }}
                      >
                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>거절</div>
                      </MenuItem>
                    </div>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <div className='notify-list'>
                        <div className='notify-list-time' style={{ fontSize: '14px' }}>
                          {isSameDay(new Date(), Date.parse(value.createTime))
                            ? format(Date.parse(value.createTime), 'a') === 'AM'
                              ? '오전 ' + format(Date.parse(value.createTime), 'h:mm')
                              : '오후 ' + format(Date.parse(value.createTime), 'h:mm')
                            : `${format(Date.parse(value.createTime), 'YYY' + ' / ' + 'MM' + ' / ' + 'dd')} ${
                                format(Date.parse(value.createTime), 'a') === 'AM' ? '(오전' : '(오후'
                              } ${format(Date.parse(value.createTime), 'h:mm)')}`}
                        </div>
                        <div
                          style={{ fontSize: '14px', whiteSpace: 'pre-wrap', paddingTop: '5px' }}
                        >{`${value.userNm}님이 ${value.scheduleNm}스케줄에 함께하는 멤버로 초대하였습니다.`}</div>
                      </div>
                    </MenuItem>
                    <div style={{ display: 'flex' }}>
                      <MenuItem
                        style={{ flex: 1 }}
                        onClick={() => {
                          onAccept(index, false);
                          // popupState.close();
                        }}
                      >
                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>수락</div>
                      </MenuItem>
                      <MenuItem
                        style={{ flex: 1 }}
                        onClick={() => {
                          onDenial(index, false);
                        }}
                      >
                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>거절</div>
                      </MenuItem>
                    </div>
                  </>
                )}
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
  height: '40px',
});

export default NotifyPopup;
