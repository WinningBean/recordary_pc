import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  marginBottom: {
    marginBottom: '10px'
  }
}));

const GroupDelete = props => {
  const classes = useStyles();

  const data = props.data;
  const [check, setCheck] = useState(false);

  return (
    <div className='dialog-wrap'>
      <DialogContent className={classes.content}>
        <TextField
          className={classes.marginBottom}
          label='그룹명'
          name='group_nm'
          defaultValue={data.group.group_nm}
          disabled
        />
        <TextField
          className={classes.marginBottom}
          label='그룹 상태메세지'
          name='group_nm'
          defaultValue={data.group.group_ex}
          disabled
        />
        <TextField label='그룹장' name='group_ex' defaultValue={data.group.group_admin} disabled />
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={<Checkbox checked={check} onChange={() => setCheck(!check)} value='checkedA' />}
          label='정말로 그룹을 삭제하시겠습니까?'
        />
        <Button color='secondary' disabled={!check}>
          삭제
        </Button>
      </DialogActions>
    </div>
  );
};

export default GroupDelete;
