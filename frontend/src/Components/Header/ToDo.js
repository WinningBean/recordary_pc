import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';

const ToDo = ({ open, onClose }) => {
  const [isHover, setIsHover] = useState(false);
  const fontSize = isHover ? '11px' : '14px';
  return (
    <Drawer open={open} style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} anchor='top' onClose={() => onClose()}>
      <div
        style={{ height: '350px', minWidth: '1300px', display: 'flex', position: 'relative' }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          style={{
            position: 'absolute',
            top: isHover ? '-20px' : 0,
            width: '100%',
            height: '40px',
            backgroundColor: '#fffa',
            boxShadow: '0px 1px 5px lightgrey',
            transition: 'top 0.3s',
            display: 'flex',
          }}
        >
          <div
            className='transition-all'
            style={{
              flex: 1,
              padding: '0px 6px',
              paddingTop: '14px',
              fontSize: fontSize,
              fontWeight: 'bold',
            }}
          >
            Before
          </div>
          <div
            className='transition-all'
            style={{
              flex: 1.4,
              padding: '0px 6px',
              paddingTop: '14px',
              fontSize: fontSize,
              fontWeight: 'bold',
            }}
          >
            D-DAY
          </div>
          <div
            className='transition-all'
            style={{
              flex: 1,
              padding: '0px 6px',
              paddingTop: '14px',
              fontSize: fontSize,
              fontWeight: 'bold',
            }}
          >
            Yesterday
          </div>
          <div
            className='transition-all'
            style={{
              flex: 1,
              padding: '0px 6px',
              paddingTop: '14px',
              fontSize: fontSize,
              fontWeight: 'bold',
            }}
          >
            Saturday
          </div>
          <div
            className='transition-all'
            style={{
              flex: 1,
              padding: '0px 6px',
              paddingTop: '14px',
              fontSize: fontSize,
              fontWeight: 'bold',
            }}
          >
            Over
          </div>
        </div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}></div>
        <div style={{ flex: 1.4, borderRight: '1px solid #eee' }}></div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}></div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}></div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}></div>
      </div>
    </Drawer>
  );
};

export default ToDo;
