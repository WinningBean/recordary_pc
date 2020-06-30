import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectGroup({ options, onSetSelectedGroup, selectedIndex, currentGroup, groupList }) {
  const classes = useStyles();
  const [group, setGroup] = React.useState(groupList);

  // useEffect(() => {
  //   console.log(options);
  // }, []);

  const handleChange = (event) => {
    setGroup(event.target.value);
    // onSetSelectedGroup(event.target.value);
    options.map((option) => {
      if (event.target.value === option.groupNm) {
        onSetSelectedGroup(option.groupCd);
      } else return;
    });
  };

  return (
    <div style={{ width: '120px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>그룹 선택</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={currentGroup !== null ? currentGroup.groupNm : group}
          onChange={handleChange}
        >
          {currentGroup !== null ? (
            <MenuItem value={currentGroup.groupNm} selected={true} disabled={false}>
              {currentGroup.groupNm}
            </MenuItem>
          ) : (
            options.map((option, index) => {
              return (
                <MenuItem key={`${option.groupCd}-${index}`} value={option.groupNm} selected={index === selectedIndex}>
                  {option.groupNm}
                </MenuItem>
              );
            })
          )}
        </Select>
      </FormControl>
    </div>
  );
}
