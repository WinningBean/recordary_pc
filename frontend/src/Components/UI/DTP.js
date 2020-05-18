import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

import { startOfDay, endOfDay } from 'date-fns';

// switchInfo = {
//   str: false,
//   end: false
// }
export default function DTP({ strDate, endDate, onChangeStrDate, onChangeEndDate, switchInfo, onChangeSwitch }) {
  // The first commit of Material-UI

  const today = new Date();
  const handleStartDateChange = (date) => {
    // setSelectedStartDate(date);
    onChangeStrDate(date);
  };
  const handleFinishDateChange = (date) => {
    // setSelectedFinishDate(date);
    onChangeEndDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <KeyboardDatePicker
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='시작일자'
          value={strDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          readOnly={switchInfo.str}
          variant='inline'
          margin='normal'
          id='time-picker'
          label='시작시간'
          value={switchInfo.str ? startOfDay(strDate) : strDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<AccessAlarmsIcon>Icon</AccessAlarmsIcon>}
        />
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={
            <Switch
              checked={switchInfo.str}
              onChange={() => {
                onChangeSwitch({ ...switchInfo, str: !switchInfo.str });
              }}
              color='primary'
            />
          }
          label='하루종일'
        />
      </div>
      <Grid container justify='space-around'>
        <KeyboardDatePicker
          // disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='종료일자'
          value={endDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          readOnly={switchInfo.end}
          variant='inline'
          margin='normal'
          id='time-picker'
          label='종료시간'
          value={switchInfo.end ? endOfDay(endDate) : endDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<AccessAlarmsIcon>Icon</AccessAlarmsIcon>}
        />
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={
            <Switch
              checked={switchInfo.end}
              onChange={() => {
                onChangeSwitch({ ...switchInfo, end: !switchInfo.end });
              }}
              color='primary'
            />
          }
          label='하루종일'
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
