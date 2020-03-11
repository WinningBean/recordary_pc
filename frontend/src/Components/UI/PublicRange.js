import React from 'react';
import 'Components/Profile/PostAppend.css';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PublicIcon from '@material-ui/icons/Public';

const options = ['전체공개', '나만보기', '친구만', '팔로워만'];

export default function PublicRange() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
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
          <span style={{ fontSize: '15px', marginLeft: '5px' }}>
            {options[selectedIndex]}
          </span>
        </div>
      </div>
      <Menu
        id='lock-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
            onChange={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
