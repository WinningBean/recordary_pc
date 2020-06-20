import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import './ProfilePage.css';

import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.2),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    // border: '1px solid rgba(255,255,255,0.8)'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fade(theme.palette.common.white, 0.8),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    color: 'white',
  },
}));

export default function ScheduleSearch(props) {
  const classes = useStyles();
  const data = props.data;
  const [searchedList, setSearchedList] = useState(null);
  const [scheduleSearch, setScheduleSearch] = useState('');

  const SearchedList = () => {
    // const copyList =
    //   scheduleSearch === '' ? [...data] : data.filter((value) => new RegExp(scheduleSearch, 'i').exec(value.ex));
    console.log(scheduleSearch, data);
    return searchedList.map((value) => (
      <li
        className='schedule-list'
        key={value.scheduleCd}
        style={{
          height: '50px',
          borderBottom: '1px solid lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#16a085',
              borderRadius: '50%',
              height: '10px',
              width: '10px',
              marginRight: '10px',
            }}
          />
          <div
            style={{
              fontWeight: 'bold',
              maxWidth: '270px',
              width: '270px',
              marginRight: '5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value.scheduleNm}
          </div>
        </div>
        <div style={{ fontWeight: 'bold' }}>
          {dateFns.differenceInCalendarDays(value.scheduleStr, value.scheduleEnd) === 0
            ? dateFns.format(value.scheduleStr, 'yyyy-MM-dd')
            : `${dateFns.format(value.scheduleStr, 'yyyy-MM-dd')}
          ~${dateFns.format(value.scheduleEnd, 'yyyy-MM-dd')}`}
        </div>
      </li>
    ));
  };
  const setEnterKeyPress = () => {
    if (searchedList !== null) {
      console.log(data);
      return (
        <Dialog open onClose={() => setSearchedList(null)}>
          <div style={{ height: '500px', maxHeight: '500px', width: '400px' }}>
            <div className='dialog-header'>
              <div className='dialog-header-icon'>
                <SearchIcon style={{ fontSize: '40px' }} />
              </div>
              &nbsp;
              <span>'{scheduleSearch}'에 대한 일정</span>
              <div className='dialog-header-icon' style={{ position: 'absolute', right: '5px' }}>
                <IconButton onClick={() => setSearchedList(null)}>
                  <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
                </IconButton>
              </div>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>{SearchedList()}</ul>
          </div>
        </Dialog>
      );
    }
    return null;
  };

  const handleKeyPress = async (e) => {
    console.log(props.data, scheduleSearch);
    if (e.key === 'Enter') {
      const userData = (
        await axios.get(`/schedule/search/${props.data.userInfo.userCd}`, { params: { input: scheduleSearch } })
      ).data;
      // const groupData = (await axios.get("http://172.30.1.47:8080/group/search", {params : { groupSearch : userSearch}})).data;
      console.log(userData);

      setSearchedList(
        userData.map((value) => ({
          ...value,
          scheduleStr: new Date(value.scheduleStr),
          scheduleEnd: new Date(value.scheduleEnd),
        }))
      );
    }
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='일정 검색'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            setScheduleSearch(e.target.value);
          }}
        />
      </div>
      {setEnterKeyPress()}
    </div>
  );
}
