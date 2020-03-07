import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function DTP() {
  // The first commit of Material-UI

  const today = new Date();
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date(today)
  );
  const [selectedFinishDate, setSelectedFinishDate] = React.useState(
    new Date(today)
  );
  const [close, setClose] = React.useState(false);

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };
  const handleFinishDateChange = date => {
    setSelectedFinishDate(date);
  };
  const handleClose = () => {
    setClose(true);
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
          value={selectedStartDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          onClose={handleClose}
        />

        <KeyboardTimePicker
          variant='inline'
          margin='normal'
          id='time-picker'
          label='시작시간'
          value={selectedStartDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
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
          value={selectedFinishDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <KeyboardTimePicker
          variant='inline'
          margin='normal'
          id='time-picker'
          label='종료시간'
          value={selectedFinishDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
