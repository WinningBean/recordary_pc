import React, { useState } from 'react';
import PublicRange from 'Components/UI/PublicRange';

const PublicSetting = props => {
  // const data = props.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>계정 공개 범위</span>
        <PublicRange />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>내 게시물</span>
        <PublicRange />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>내가 쓴 댓글</span>
        <PublicRange />
      </div>
      <div className='AlertStyle'>
        <span style={{ fontSize: '16px' }}>함께 하는 멤버</span>
        <PublicRange />
      </div>
    </div>
  );
};

export default PublicSetting;
