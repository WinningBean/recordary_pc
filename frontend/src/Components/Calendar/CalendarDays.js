import React from 'react';
import * as dateFns from 'date-fns';

const CalendarDays = ({ currentMonth }) => {
  const days = [];

  let startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className='day' key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), 'EEE')}
      </div>
    );
  }

  return <div className='wrap-days'>{days}</div>;
};

export default CalendarDays;
