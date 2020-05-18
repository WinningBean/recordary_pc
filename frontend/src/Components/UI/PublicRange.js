import React from 'react';
import '../Profile/PostAppend.css';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PublicIcon from '@material-ui/icons/Public';

const options = ['전체공개', '팔로워만', '친구만', '나만보기'];

// onSetSelectedIndex={(index) => setInfo({ ...info, schedulePublicState: index })}
// state 변경 함수 props
// selectedIndex={info.schedulePublicState}
// 해당 index state

export default function PublicRange({ onSetSelectedIndex, selectedIndex }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    onSetSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className='plus-button-design' onClick={handleClickListItem}>
        <div className='plus-button-design-2'>
          <PublicIcon style={{ fontSize: '30px' }} />
          <span style={{ fontSize: '15px', marginLeft: '5px' }}>{options[selectedIndex]}</span>
        </div>
      </div>
      <Menu id='lock-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            onChange={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
