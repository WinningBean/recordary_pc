import React from 'react';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import { styled } from '@material-ui/styles';
import * as dateFns from 'date-fns';

const SideButton = styled(Button)({
  minWidth: '40px',
  height: '75px'
});

const CalendarHeader = props => {
  return (
    <div className='calendar-header'>
      <div className='calendar-header-side'>
        <SideButton onClick={props.onClickLeft}>
          <LeftIcon />
        </SideButton>
      </div>
      <div className='calendar-header-center'>
        <span>{dateFns.format(props.currentMonth, 'MMM yyyy')}</span>
      </div>
      <div className='calendar-header-side'>
        <SideButton onClick={props.onClickRight}>
          <RightIcon />
        </SideButton>
      </div>
    </div>
  );
};

export default CalendarHeader;
