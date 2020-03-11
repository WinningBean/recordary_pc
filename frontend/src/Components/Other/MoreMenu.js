import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = props.options;

  return (
    <>
      <MoreIconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </MoreIconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 120
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            onClick={e => {
              props.returnValue(e.currentTarget.innerText, props.code);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

const MoreIconButton = styled(Button)({
  minWidth: '30px',
  height: '50px'
});
