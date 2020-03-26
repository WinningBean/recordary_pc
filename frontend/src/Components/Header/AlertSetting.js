import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

const AlertSetting = props => {
  // const data = props.data;
  const [state, setState] = React.useState({
    pushAlert: false,
    chatAlert: false,
    commentAlert: false,
    postAlert: false,
    shareAlert: false
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>푸시 알림</span>
        <Switch checked={state.pushAlert} onChange={handleChange} name='pushAlert' />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>채팅 메시지</span>
        <Switch checked={state.chatAlert} onChange={handleChange} name='chatAlert' />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>댓글 알림</span>
        <Switch checked={state.commentAlert} onChange={handleChange} name='commentAlert' />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>새로운 게시물 알림</span>
        <Switch checked={state.postAlert} onChange={handleChange} name='postAlert' />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>게시물 공유 알림</span>
        <Switch checked={state.shareAlert} onChange={handleChange} name='shareAlert' />
      </div>
    </div>
  );
};

export default AlertSetting;
