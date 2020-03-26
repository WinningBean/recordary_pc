import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

const AdviceSetting = props => {
  // const data = props.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>문제 신고</span>
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>고객 센터</span>
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>데이터 정책</span>
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>이용 약관</span>
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>오픈 소스 라이브러리</span>
      </div>
    </div>
  );
};

export default AdviceSetting;
