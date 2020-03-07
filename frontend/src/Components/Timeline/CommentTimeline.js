import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EjectIcon from '@material-ui/icons/Eject';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  width: {
    width: '350px'
  }
}));

const SendButton = styled(Button)({
  minWidth: '30px',
  height: '40px'
});

export default function Comment() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.margin}>
        <TextField
          className={(classes.margin, classes.width)}
          id='input-with-icon-textfield'
          label='Comment'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <SendButton>
                  {' '}
                  <EjectIcon />{' '}
                </SendButton>
              </InputAdornment>
            )
          }}
          variant='outlined'
          multiline
          rowsMax='3'
          rows='3'
        ></TextField>
      </FormControl>
    </div>
  );
}
