import React from 'react';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import * as dateFns from 'date-fns';

const CalendarHeader = props => {
  return (
    <div className='calendar-header'>
      <div className='calendar-header-side'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '40px',
            height: '75px'
          }}
          onClick={props.onClickLeft}
        >
          <LeftIcon />
        </div>
      </div>
      <div className='calendar-header-center'>
        <span>{dateFns.format(props.currentMonth, 'MMM yyyy')}</span>
      </div>
      <div className='calendar-header-side'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '40px',
            height: '75px'
          }}
          onClick={props.onClickRight}
        >
          <RightIcon />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
