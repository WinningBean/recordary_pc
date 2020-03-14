import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonIcon from '@material-ui/icons/Person';
import * as dateFns from 'date-fns';
import { useImmer } from 'use-immer';

const TimelineMultiDay = ({ title, ex, sharedSchedual, sharedStartDay, sharedEndDay }) => {
  const [currentMonth, useCurrentMonth] = useImmer(dateFns.startOfMonth(sharedStartDay));
  console.log(sharedStartDay);

  const Cells = () => {
    const today = new Date();
    const monthStart = currentMonth;
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, 'd');
        var isBorderLeft = false;
        if (i === 0) isBorderLeft = true;

        days.push(
          <div
            id={`cell-index-${dateFns.format(day, 'MMdd')}`}
            className={`cell ${!dateFns.isSameMonth(day, monthStart) ? 'disabled' : ''} ${
              isBorderLeft === true ? 'borderLeft' : ''
            }`}
            key={day}
            onClick={() => console.log('click days')}
            style={{ width: 'auto', height: 'auto', flex: '1' }}
          >
            {dateFns.isSameDay(day, today) ? <div className='selected' /> : null}
            <span className='bg'>{formattedDate}</span>
            <span className='number'>{formattedDate}</span>
            <div className='more' />
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div
          className='cell-row'
          key={day}
          style={{ width: 'auto', height: 'auto', flex: '1', display: 'flex' }}
        >
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <>
      <div>asdfsdf</div>
      <div style={{ height: '240px', display: 'flex', flexDirection: 'column' }}>{Cells()}</div>
    </>
  );
};

export default TimelineMultiDay;
