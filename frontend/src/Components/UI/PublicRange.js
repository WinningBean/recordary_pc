import React from 'react';
import 'Components/Profile/PostAppend.css';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PublicIcon from '@material-ui/icons/Public';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  }
}));

const options = [
  '공개 범위',
  '전체 공개',
  '나만 보기',
  '친구만',
  '선택한 그룹만'
];

export default function PublicRange() {
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
