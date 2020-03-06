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

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };
  const handleFinishDateChange = date => {
    setSelectedFinishDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='시작일'
          value={selectedStartDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='종료일'
          value={selectedFinishDate}
          onChange={handleFinishDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
