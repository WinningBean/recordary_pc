import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonIcon from '@material-ui/icons/Person';
import * as dateFns from 'date-fns';

const TimelineMultiDay = ({ title, ex, startDay, endDay }) => {
  const Cells = () => {
    const startDate = dateFns.startOfWeek(startDay);
    const endDate = dateFns.endOfWeek(endDay);
    const today = new Date();

    const rows = [];

    let days = [];
    let day = startDate;
    var formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, 'd');

        var isBorderLeft = false;
        if (i === 0) isBorderLeft = true;

        days.push(
          <div
            id={`cell-index-${dateFns.format(day, 'MMdd')}`}
            className={`cell ${
              !dateFns.isWithinInterval(day, {
                start: dateFns.startOfDay(startDay),
                end: dateFns.endOfDay(endDay)
              })
                ? 'disabled'
                : ''
            } ${isBorderLeft === true ? 'borderLeft' : ''}`}
            key={day}
            style={{
              width: 'auto',
              height: 'auto',
              flex: 1
            }}
          >
            {dateFns.isSameDay(day, today) ? <div className='selected' /> : null}
            {dateFns.isWithinInterval(day, {
              start: dateFns.startOfDay(startDay),
              end: dateFns.endOfDay(endDay)
            }) ? (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(125,0,0,.3)' }} />
            ) : null}
            <span className='number'>{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div key={day} style={{ flex: 1, display: 'flex', width: '100%' }}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };
  return (
    <>
      <div style={{ height: '110px', display: 'flex' }}>
        <div style={{ width: '40%' }}>타이틀</div>
        <div
          id='wrap-cells'
          style={{ display: 'flex', flexDirection: 'column', height: '110px', width: '60%' }}
        >
          {Cells()}
        </div>
      </div>
      <div>본문</div>
    </>
  );
};

export default TimelineMultiDay;
