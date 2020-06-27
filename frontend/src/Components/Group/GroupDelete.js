import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '../UI/Snackbar';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginBottom: {
    marginBottom: '10px',
  },
}));

const GroupDelete = ({ info, onDeleteGroupList, onClose }) => {
  const classes = useStyles();

  const [check, setCheck] = useState(false);
  const [alert, setAlert] = useState(null);

  const onDelete = async () => {
    try {
      const { data } = await axios.delete(`/group/${info.groupCd}`);
      setAlert(
        <Snackbar
          onClose={() => {
            onDeleteGroupList(info.groupCd);
            onClose();
          }}
          severity='success'
          content={`정상적으로 그룹이 삭제되었습니다.`}
        />
      );
    } catch (error) {
      console.error(error);
      setAlert(
        <Snackbar
          onClose={() => setAlert(null)}
          severity='error'
          content={`서버에러로 인하여 데이터 요청에 실패하였습니다.
${error}`}
        />
      );
    }
  };

  return (
    <div className='dialog-wrap'>
      <DialogContent className={classes.content}>
        <TextField className={classes.marginBottom} label='그룹명' defaultValue={info.groupNm} disabled />
        <TextField className={classes.marginBottom} label='그룹 상태메세지' defaultValue={info.groupEx} disabled />
        <TextField label='그룹장' defaultValue={info.userNm} disabled />
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={<Checkbox checked={check} onChange={() => setCheck(!check)} value='checkedA' />}
          label='정말로 그룹을 삭제하시겠습니까?'
        />
        <Button color='secondary' disabled={!check} onClick={onDelete}>
          삭제
        </Button>
      </DialogActions>
      {alert}
    </div>
  );
};

export default GroupDelete;
