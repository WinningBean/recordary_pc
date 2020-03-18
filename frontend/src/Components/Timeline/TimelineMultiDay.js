import React, { useMemo, useState } from 'react';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import * as dateFns from 'date-fns';
import produce from 'immer';

const TimelineMultiDay = ({ title, ex, sharedSchedual, sharedStartDay, sharedEndDay }) => {
  const [currentMonth, setCurrentMonth] = useState(dateFns.startOfMonth(sharedStartDay));
  const [dayLocation, setDayLocation] = useState(null);

  const CalendarHeader = useMemo(() => {
    console.log('render header');
    return (
      <div className='calendar-header' style={{ height: '25px' }}>
        <div className='calendar-header-side'>
          {dateFns.isSameMonth(currentMonth, sharedStartDay) ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '40px',
                height: '25px',
                color: '#4444'
              }}
            >
              <LeftIcon />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '40px',
                height: '25px'
              }}
              onClick={() => setCurrentMonth(dateFns.subMonths(currentMonth, 1))}
            >
              <LeftIcon />
            </div>
          )}
        </div>
        <div className='calendar-header-center' style={{ height: '25px', fontSize: '15px' }}>
          <span>{dateFns.format(currentMonth, 'MMM yyyy')}</span>
        </div>
        <div className='calendar-header-side'>
          {dateFns.isSameMonth(currentMonth, sharedEndDay) ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '40px',
                height: '25px',
                color: '#4444'
              }}
            >
              <RightIcon />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '40px',
                height: '25px'
              }}
              onClick={() => setCurrentMonth(dateFns.addMonths(currentMonth, 1))}
            >
              <RightIcon />
            </div>
          )}
        </div>
      </div>
    );
  }, [currentMonth, sharedStartDay, sharedEndDay]);

  const CalendarDays = useMemo(() => {
    console.log('render day');
    const days = [];

    let startDate = dateFns.startOfWeek(new Date());

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
  }, []);

  const Cells = useMemo(() => {
    console.log('render cells');
    const today = new Date();
    const monthStart = currentMonth;
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    const location = [];
    var x = 0;
    var y = 15;
    // var x = 68.43;
    // var y = 56;

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
            style={
              dateFns.isWithinInterval(day, {
                start: dateFns.startOfDay(sharedStartDay),
                end: dateFns.endOfDay(sharedEndDay)
              })
                ? { width: 'auto', height: '56px', flex: '1' }
                : {
                    backgroundColor: 'rgba(116, 116, 116, 0.1)',
                    width: 'auto',
                    height: '56px',
                    flex: '1'
                  }
            }
          >
            {dateFns.isSameDay(day, today) ? (
              <div className='selected' style={{ opacity: '.5' }} />
            ) : null}
            {/* <span className='bg'>{formattedDate}</span> */}
            <span className='number' style={{ left: 1, top: 0 }}>
              {formattedDate}
            </span>
            <div className='more' />
            {/* <div style={{ backgroundColor: 'yellow', marginTop: '12px', height: '40px' }}> </div> */}
          </div>
        );

        location.push({
          x,
          y,
          day
        });
        x += 68.43;
        day = dateFns.addDays(day, 1);
      }
      y += 56;
      x = 0;
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
    setDayLocation(location);
    return rows;
  }, [currentMonth, sharedEndDay, sharedStartDay]);

  console.log(dayLocation);

  const Schedual = () => {
    if (dayLocation === null) return null;

    var size = undefined;

    const length = sharedSchedual.length;
    if (length < 2) size = 43;
    else if (length === 2) size = 21;
    else if (length === 3) size = 14;
    else if (length === 4) size = 10;
    else if (length === 5) size = 8;
    else if (length <= 6) size = 7;

    const monthStart = currentMonth;
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const sc = [];

    console.log(sharedSchedual);
    sharedSchedual.forEach((schedualValue, index) => {
      if (dateFns.isWithinInterval(schedualValue.start, { start: monthStart, end: endDate })) {
        const currDayLocation = dayLocation.filter(value =>
          dateFns.isSameDay(value.day, schedualValue.start)
        )[0];

        const diffCount = dateFns.differenceInCalendarWeeks(
          currDayLocation.start,
          currDayLocation.end
        );
        if (diffCount > 0) {
          // 시작일과 끝일 주가 다를때
        } else {
          console.log(schedualValue.start, schedualValue.end);
          if (dateFns.isSameDay(schedualValue.start, schedualValue.end)) {
            sc.push(
              <div
                style={{
                  key: currDayLocation.y + size * index,
                  position: 'absolute',
                  left: `${currDayLocation.x}px`,
                  top: `${currDayLocation.y + size * index}px`,
                  width: '68.43px',
                  height: `${size}px`,
                  backgroundColor: `rgba(${Math.random() * 255},${Math.random() *
                    255},${Math.random() * 255},.8)`,
                  borderRadius: '4px',
                  paddingLeft: '5px',
                  borderLeft: '3px solid gray'
                }}
              />
            );
            return;
          } else {
            sc.push(
              <div
                style={{
                  key: currDayLocation.y + size * index,
                  position: 'absolute',
                  left: `${currDayLocation.x}px`,
                  top: `${currDayLocation.y + size * index}px`,
                  width: `${480 - currDayLocation.x}px`,
                  height: `${size}px`,
                  backgroundColor: `rgba(${Math.random() * 255},${Math.random() *
                    255},${Math.random() * 255},.5)`,
                  borderRadius: '4px',
                  marginLeft: '5px',
                  borderLeft: '3px solid gray'
                }}
              />
            );
            return;
          }
        }
      }
    });
    console.log(sc);
    return sc;
  };
  console.log(dayLocation);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CalendarHeader}
        {CalendarDays}
        <div style={{ position: 'relative' }}>
          {Cells}
          {Schedual()}
        </div>
      </div>
    </>
  );
};

export default TimelineMultiDay;
