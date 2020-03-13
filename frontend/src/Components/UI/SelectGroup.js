import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SelectGroup() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div style={{ width: '120px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>그룹 선택</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>--그룹 미선택</MenuItem>
          <MenuItem value={20}>--스터디</MenuItem>
          <MenuItem value={30}>--요리</MenuItem>
          <MenuItem value={40}>--여행</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
