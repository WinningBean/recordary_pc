import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonIcon from '@material-ui/icons/Person';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import * as dateFns from 'date-fns';
import { useImmer } from 'use-immer';

const TimelineMultiDay = ({ title, ex, sharedSchedual, sharedStartDay, sharedEndDay }) => {
  const [currentMonth, setCurrentMonth] = useImmer(dateFns.startOfMonth(sharedStartDay));

  const CalendarHeader = () => {
    return (
      <div className='calendar-header' style={{ height: '45px' }}>
        <div className='calendar-header-side'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '40px',
              height: '45px'
            }}
            onClick={() => setCurrentMonth(draft => dateFns.subMonths(draft, 1))}
          >
            <LeftIcon />
          </div>
        </div>
        <div className='calendar-header-center' style={{ height: '45px', fontSize: '15px' }}>
          <span>{dateFns.format(currentMonth, 'MMM yyyy')}</span>
        </div>
        <div className='calendar-header-side'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '40px',
              height: '45px'
            }}
            onClick={() => setCurrentMonth(draft => dateFns.addMonths(draft, 1))}
          >
            <RightIcon />
          </div>
        </div>
      </div>
    );
  };

  const CalendarDays = () => {
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className='day'
          style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {dateFns.format(dateFns.addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return (
      <div className='wrap-days' style={{ display: 'flex', height: '20px' }}>
        {days}
      </div>
    );
  };

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
            style={{ width: 'auto', height: '50px', flex: '1' }}
          >
            {dateFns.isSameDay(day, today) ? (
              <div className='selected' style={{ opacity: '.5' }} />
            ) : null}
            <span className='bg'>{formattedDate}</span>
            <span className='number' style={{ left: 1, top: 0 }}>
              {formattedDate}
            </span>
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CalendarHeader()}
        {CalendarDays()}
        {Cells()}
      </div>
    </>
  );
};

export default TimelineMultiDay;
