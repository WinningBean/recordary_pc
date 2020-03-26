import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

const LockSetting = props => {
  // const data = props.data;
  const [state, setState] = React.useState({
    searchList: false
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>검색 내역 저장</span>
        <Switch checked={state.searchList} onChange={handleChange} name='searchList' />
      </div>
    </div>
  );
};

export default LockSetting;
