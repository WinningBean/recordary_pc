import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

export default function DTP({ strDate, endDate, onChangeStrDate, onChangeEndDate }) {
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
          variant='inline'
          margin='normal'
          id='time-picker'
          label='시작시간'
          value={strDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<AccessAlarmsIcon>Icon</AccessAlarmsIcon>}
        />
      </Grid>
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
          variant='inline'
          margin='normal'
          id='time-picker'
          label='종료시간'
          value={endDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<AccessAlarmsIcon>Icon</AccessAlarmsIcon>}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
