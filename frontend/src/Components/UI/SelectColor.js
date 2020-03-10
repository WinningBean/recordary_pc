import React from 'react';
import 'Components/Profile/PostAppend.css';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const options = [
  'color',
  <span className='colorChange' style={{ backgroundColor: 'red' }}>
    r
  </span>,
  <span className='colorChange' style={{ backgroundColor: 'orange' }}>
    o
  </span>,
  <span className='colorChange' style={{ backgroundColor: 'yellow' }}>
    y
  </span>,
  <span className='colorChange' style={{ backgroundColor: 'blue' }}>
    b
  </span>,
  <span className='colorChange' style={{ backgroundColor: 'purple' }}>
    p
  </span>
];

export default function SelectColor() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
      <div className='selectColor' onClick={handleClickListItem}>
        {options[selectedIndex]}
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
            disabled={index === 0}
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
