import React, { useMemo, useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import * as dateFns from 'date-fns';

const TimelineMultiDay = ({ title, ex, sharedSchedual, sharedStartDay, sharedEndDay }) => {
  const [currentMonth, setCurrentMonth] = useState(dateFns.startOfMonth(sharedStartDay));
  const [dayLocation, setDayLocation] = useState(null);
  const [clickSc, setClickSc] = useState(undefined);

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
    var y = 20;
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
                ? { borderRight: 'none', width: '68.43px', height: '56px' }
                : { width: '68.43px', height: '56px' }
            }
          >
            {/* {dateFns.isSameDay(day, today) ? (
              <div className='selected' style={{ opacity: '.5' }} />
            ) : null} */}
            {/* <span className='bg'>{formattedDate}</span> */}
            {dateFns.isWithinInterval(day, {
              start: dateFns.startOfDay(sharedStartDay),
              end: dateFns.endOfDay(sharedEndDay)
            }) ? (
              <>
                <div
                  style={{
                    height: '15px',
                    textAlign: 'center',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(20, 81, 51, 0.6)',
                    lineHeight: '1.7',
                    color: 'white'
                  }}
                >
                  {formattedDate}
                </div>
                <div style={{ height: '100%', borderRight: '1px solid lightgray' }} />
              </>
            ) : (
              <div
                style={{
                  height: '15px',
                  textAlign: 'center',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  lineHeight: '1.7'
                }}
              >
                {formattedDate}
              </div>
            )}

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

  const Schedual = () => {
    if (dayLocation === null) return null;
    if (!dateFns.isSameMonth(dayLocation[parseInt(dayLocation.length / 2)].day, currentMonth))
      return null;

    var size = 9;

    const monthStart = currentMonth;
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const sc = [];

    var index = undefined;

    const overlap = [];
    for (let i = 0; i < dayLocation.length; i++) {
      overlap.push(0);
    }

    sharedSchedual.forEach((schedualValue, schedualIndex) => {
      var isBeforeStartDay = false;
      if (!dateFns.isWithinInterval(schedualValue.start, { start: startDate, end: endDate })) {
        if (!dateFns.isWithinInterval(schedualValue.end, { start: startDate, end: endDate }))
          return;
        index = 0;
        isBeforeStartDay = true;
      } else {
        for (let i = 0; i < dayLocation.length; i++) {
          if (dateFns.isSameDay(dayLocation[i].day, schedualValue.start)) {
            index = i;
            break;
          }
        }
      }

      if (index === undefined) return;

      const color = schedualValue.color;

      var diffCount = dateFns.differenceInCalendarWeeks(schedualValue.end, dayLocation[index].day);

      if (diffCount > 0) {
        console.log(`${dayLocation[index].day}-${overlap[index]}`);
        sc.push(
          <div
            key={`${dayLocation[index].day}-${overlap[index]}`}
            style={{
              position: 'absolute',
              left: `${dayLocation[index].x}px`,
              top: `${dayLocation[index].y + (size + 2) * overlap[index]}px`,
              width: `${475 - dayLocation[index].x - 5}px`,
              height: `${size}px`,
              backgroundColor: `${color}80`,
              borderRadius: '4px',
              marginLeft: '5px',
              borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
              cursor: 'pointer'
            }}
            onClick={() => setClickSc(schedualIndex)}
          />
        );
        const endOfWeek = dateFns.endOfWeek(dayLocation[index].day);
        const startOfWeek = dayLocation[index].day;
        for (let k = 0; k < dateFns.differenceInDays(endOfWeek, startOfWeek) + 1; k++) {
          ++overlap[index];
          ++index;
        }

        for (var i = 1; i < diffCount; i++) {
          if (dateFns.addWeeks(schedualValue.start, i) > endDate) {
            return;
          }
          console.log(`${dayLocation[index].day}-${overlap[index]}`);
          sc.push(
            <div
              key={`${dayLocation[index].day}-${overlap[index]}`}
              style={{
                position: 'absolute',
                left: `0px`,
                top: `${dayLocation[index].y + (size + 2) * overlap[index]}px`,
                width: `470px`,
                height: `${size}px`,
                backgroundColor: `${color}80`,
                marginLeft: '5px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setClickSc(schedualIndex)}
            />
          );

          for (let k = 0; k < 7; k++) {
            ++overlap[index];
            ++index;
          }
        }
        if (dateFns.addWeeks(schedualValue.start, i) > endDate) {
          return;
        }
        const endDayLocation = dayLocation.filter(value =>
          dateFns.isSameDay(value.day, schedualValue.end)
        )[0];
        console.log(`${dayLocation[index].day}-${overlap[index]}`);
        sc.push(
          <div
            key={`${dayLocation[index].day}-${overlap[index]}`}
            style={{
              position: 'absolute',
              left: `0px`,
              top: `${endDayLocation.y + (size + 2) * overlap[index]}px`,
              width: `${endDayLocation.x + 68.43 - 5}px`,
              height: `${size}px`,
              backgroundColor: `${color}80`,
              borderRadius: '4px',
              marginLeft: '5px',
              borderRight: `3px solid ${color}`,
              cursor: 'pointer'
            }}
            onClick={() => setClickSc(schedualIndex)}
          />
        );

        const countDays =
          dateFns.differenceInDays(endDayLocation.day, dateFns.startOfWeek(endDayLocation.day)) + 1;
        for (let k = 0; k < countDays; k++) {
          ++overlap[index];
          ++index;
        }

        return;
      } else {
        if (dateFns.isSameDay(schedualValue.start, schedualValue.end)) {
          console.log(`${dayLocation[index].day}-${overlap[index]}`);
          sc.push(
            <div
              key={`${dayLocation[index].day}-${overlap[index]}`}
              style={{
                position: 'absolute',
                left: `${dayLocation[index].x}px`,
                top: `${dayLocation[index].y + (size + 2) * overlap[index]}px`,
                width: `${68.43 - 5}px`,
                height: `${size}px`,
                backgroundColor: `${color}80`,
                borderRadius: '4px',
                marginLeft: '5px',
                borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
                cursor: 'pointer'
              }}
              onClick={() => setClickSc(schedualIndex)}
            />
          );
          ++overlap[index];
          return;
        } else {
          console.log(`${dayLocation[index].day}-${overlap[index]}`);
          sc.push(
            <div
              key={`${dayLocation[index].day}-${overlap[index]}`}
              style={{
                position: 'absolute',
                left: `${dayLocation[index].x}px`,
                top: `${dayLocation[index].y + (size + 2) * overlap[index]}px`,
                width: `${480 - dayLocation[index].x - 10}px`,
                height: `${size}px`,
                backgroundColor: `${color}80`,
                borderRadius: '4px',
                marginLeft: '5px',
                borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
                borderRight: `3px solid ${color}`,
                cursor: 'pointer'
              }}
              onClick={() => setClickSc(schedualIndex)}
            />
          );
          const endOfWeek = schedualValue.end;
          const startOfWeek = dayLocation[index].day;
          for (let k = 0; k < dateFns.differenceInDays(endOfWeek, startOfWeek) + 1; k++) {
            ++overlap[index];
            ++index;
          }

          return;
        }
      }
    });
    console.log(sc);
    return sc;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {CalendarHeader}
        {CalendarDays}
        <div style={{ position: 'relative' }}>
          {Cells}
          {Schedual()}
        </div>
        <div
          className='transition-all'
          style={
            clickSc === undefined
              ? {
                  position: 'absolute',
                  bottom: '0',
                  height: 0,
                  width: '100%',
                  backgroundColor: 'rgb(253,253,253)'
                }
              : {
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  height: '100%',
                  zIndex: '1',
                  backgroundColor: 'rgb(253,253,253)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5px 5px',
                  borderTop: `3px solid ${sharedSchedual[clickSc].color}`
                }
          }
        >
          {clickSc === undefined ? null : (
            <>
              <div
                style={{
                  flex: 1,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgb(229, 229, 229)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <h2 style={{ paddingLeft: '8px' }}>Title</h2>
                <div onClick={() => setClickSc(undefined)} style={{ paddingRight: '8px' }}>
                  <CloseIcon />
                </div>
              </div>
              <div style={{ flex: 3, height: '150px', display: 'flex', paddingTop: '8px' }}>
                {sharedSchedual[clickSc].ex}
              </div>
              <div style={{ flex: 2 }}>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    fontSize: '15px',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>시작</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {dateFns.format(sharedSchedual[clickSc].start, 'yyyy.M.d EEE h:mm a')}
                  </span>
                </div>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    fontSize: '15px',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>종료</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {dateFns.format(sharedSchedual[clickSc].end, 'yyyy.M.d EEE h:mm a')}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: '6px', marginLeft: '6px' }}>
                <AvatarGroup>
                  <Avatar alt='Remy Sharp' src='http://placehold.it/40x40' />
                  <Avatar alt='Travis Howard' src='http://placehold.it/40x40' />
                  <Avatar alt='Cindy Baker' src='http://placehold.it/40x40' />
                  <Avatar>+3</Avatar>
                </AvatarGroup>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(TimelineMultiDay);
