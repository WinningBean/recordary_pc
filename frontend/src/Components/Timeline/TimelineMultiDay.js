import React, { useMemo, useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import * as dateFns from 'date-fns';

const TimelineMultiDay = ({ ex, sharedSchedule, sharedStartDay, sharedEndDay }) => {
  const [currentMonth, setCurrentMonth] = useState(dateFns.startOfMonth(sharedStartDay));
  const [dayLocation, setDayLocation] = useState(null);
  const [clickSc, setClickSc] = useState(undefined);
  const [clickPic, setClickPic] = useState(undefined);

  const CalendarHeader = useMemo(() => {
    // console.log('render header');
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
                color: '#4444',
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
                height: '25px',
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
                color: '#4444',
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
                height: '25px',
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
    // console.log('render day');
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
    // console.log('render cells');
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
    var y = 2;
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
                end: dateFns.endOfDay(sharedEndDay),
              })
                ? {
                    borderRight: dateFns.isSameDay(day, dateFns.endOfDay(sharedEndDay)) ? '1px solid #ddd' : 'none',
                    width: '68.43px',
                    height: '56px',
                  }
                : { width: '68.43px', height: '56px' }
            }
          >
            {/* {dateFns.isSameDay(day, today) ? (
              <div className='selected' style={{ opacity: '.5' }} />
            ) : null} */}
            {/* <span className='bg'>{formattedDate}</span> */}
            {dateFns.isWithinInterval(day, {
              start: dateFns.startOfDay(sharedStartDay),
              end: dateFns.endOfDay(sharedEndDay),
            }) ? (
              <>
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '38px',
                    lineHeight: '160%',
                    color: '#ddd',
                  }}
                >
                  {formattedDate}
                </div>
              </>
            ) : (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'white',
                }}
              ></div>
            )}

            <div className='more' />
            {/* <div style={{ backgroundColor: 'yellow', marginTop: '12px', height: '40px' }}> </div> */}
          </div>
        );

        location.push({
          x,
          y,
          day,
        });
        x += 67.14;
        day = dateFns.addDays(day, 1);
      }
      y += 56;
      x = 0;
      rows.push(
        <div className='cell-row' key={day} style={{ width: 'auto', height: 'auto', flex: '1', display: 'flex' }}>
          {days}
        </div>
      );
      days = [];
    }
    setDayLocation(location);
    return rows;
  }, [currentMonth, sharedEndDay, sharedStartDay]);

  const Schedule = () => {
    if (dayLocation === null) return null;
    if (!dateFns.isSameMonth(dayLocation[parseInt(dayLocation.length / 2)].day, currentMonth)) return null;

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

    sharedSchedule.forEach((scheduleValue, scheduleIndex) => {
      var isBeforeStartDay = false;
      if (!dateFns.isWithinInterval(Date.parse(scheduleValue.scheduleStr), { start: startDate, end: endDate })) {
        if (!dateFns.isWithinInterval(Date.parse(scheduleValue.scheduleEnd), { start: startDate, end: endDate }))
          return;
        index = 0;
        isBeforeStartDay = true;
      } else {
        for (let i = 0; i < dayLocation.length; i++) {
          if (dateFns.isSameDay(dayLocation[i].day, Date.parse(scheduleValue.scheduleStr))) {
            index = i;
            break;
          }
        }
      }

      if (index === undefined) return;

      const color = scheduleValue.scheduleCol;

      var diffCount = dateFns.differenceInCalendarWeeks(Date.parse(scheduleValue.scheduleEnd), dayLocation[index].day);

      if (diffCount > 0) {
        // console.log(`${dayLocation[index].day}-${overlap[index]}`);
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
              borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
              cursor: 'pointer',
            }}
            onClick={() => setClickSc(scheduleIndex)}
          />
        );
        const endOfWeek = dateFns.endOfWeek(dayLocation[index].day);
        const startOfWeek = dayLocation[index].day;
        for (let k = 0; k < dateFns.differenceInDays(endOfWeek, startOfWeek) + 1; k++) {
          ++overlap[index];
          ++index;
        }

        for (var i = 1; i < diffCount; i++) {
          if (dateFns.addWeeks(Date.parse(scheduleValue.scheduleStr), i) > endDate) {
            return;
          }
          // console.log(`${dayLocation[index].day}-${overlap[index]}`);
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
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setClickSc(scheduleIndex)}
            />
          );

          for (let k = 0; k < 7; k++) {
            ++overlap[index];
            ++index;
          }
        }
        if (dateFns.addWeeks(Date.parse(scheduleValue.scheduleStr), i) > endDate) {
          return;
        }
        const endDayLocation = dayLocation.filter((value) =>
          dateFns.isSameDay(value.day, Date.parse(scheduleValue.scheduleEnd))
        )[0];
        // console.log(`${dayLocation[index].day}-${overlap[index]}`);
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
              borderRight: `3px solid ${color}`,
              cursor: 'pointer',
            }}
            onClick={() => setClickSc(scheduleIndex)}
          />
        );

        const countDays = dateFns.differenceInDays(endDayLocation.day, dateFns.startOfWeek(endDayLocation.day)) + 1;
        for (let k = 0; k < countDays; k++) {
          ++overlap[index];
          ++index;
        }

        return;
      } else {
        console.log(overlap);
        if (dateFns.isSameDay(Date.parse(scheduleValue.scheduleStr), Date.parse(scheduleValue.scheduleEnd))) {
          // console.log(`${dayLocation[index].day}-${overlap[index]}`);
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
                borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
                cursor: 'pointer',
              }}
              onClick={() => setClickSc(scheduleIndex)}
            />
          );
          ++overlap[index];
          return;
        } else {
          const diffDays =
            dateFns.differenceInCalendarDays(
              Date.parse(scheduleValue.scheduleEnd),
              Date.parse(scheduleValue.scheduleStr)
            ) + 1;
          sc.push(
            <div
              key={`${dayLocation[index].day}-${overlap[index]}`}
              style={{
                position: 'absolute',
                left: `${dayLocation[index].x}px`,
                top: `${dayLocation[index].y + (size + 2) * overlap[index]}px`,
                width: `${68.43 * diffDays - 5}px`,
                height: `${size}px`,
                backgroundColor: `${color}80`,
                borderRadius: '4px',
                borderLeft: isBeforeStartDay === false ? `3px solid ${color}` : null,
                borderRight: `3px solid ${color}`,
                cursor: 'pointer',
              }}
              onClick={() => setClickSc(scheduleIndex)}
            />
          );
          const endOfWeek = Date.parse(scheduleValue.scheduleEnd);
          const startOfWeek = dayLocation[index].day;
          for (let k = 0; k <= diffDays; k++) {
            ++overlap[index];
            ++index;
          }

          return;
        }
      }
    });
    // console.log(sc);
    return sc;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {CalendarHeader}
        {CalendarDays}
        <div style={{ position: 'relative' }}>
          {Cells}
          {Schedule()}
        </div>
        <div
          className='transition-all'
          style={
            clickSc === undefined
              ? {
                  position: 'absolute',
                  bottom: '0',
                  height: 0,
                  transform: 'translateY(400px)',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgb(253,253,253)',
                }
              : {
                  position: 'absolute',
                  bottom: '0',
                  transform: 'translateY(0)',
                  width: '100%',
                  height: '100%',
                  zIndex: '1',
                  backgroundColor: 'rgb(253,253,253)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5px 5px',
                  borderTop: `3px solid ${sharedSchedule[clickSc].scheduleCol}`,
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
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ paddingLeft: '8px' }}>
                  <h2>Title</h2>
                </div>
                <div style={{ paddingRight: '8px', display: 'flex' }}>
                  <CloseIcon onClick={() => setClickSc(undefined)} />
                </div>
              </div>
              <div style={{ flex: 3, height: '150px', display: 'flex', paddingTop: '8px' }}>
                {sharedSchedule[clickSc].scheduleNm}
              </div>
              <div style={{ flex: 2 }}>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    fontSize: '15px',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>시작</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {dateFns.format(Date.parse(sharedSchedule[clickSc].scheduleStr), 'yyyy.M.d EEE h:mm a')}
                  </span>
                </div>
                <div
                  style={{
                    height: '50%',
                    display: 'flex',
                    fontSize: '15px',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgb(229, 229, 229)',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>종료</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {dateFns.format(Date.parse(sharedSchedule[clickSc].scheduleEnd), 'yyyy.M.d EEE h:mm a')}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                {/* <div> */}
                {/* <ul style={{ display: 'flex', alignItems: 'center' }}>
                    {sharedSchedule[clickSc].pic.length > 0
                      ? sharedSchedule[clickSc].pic.map((value, index) => {
                          return (
                            <li
                              key={`sharedSchedule-picture-${sharedSchedule[clickSc].cd}-${index}`}
                              style={{ marginRight: '4px' }}
                              onClick={() => setClickPic(value)}
                            >
                              <img
                                alt='shared-schedule-img'
                                src={value}
                                style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                              />
                            </li>
                          );
                        })
                      : null}
                  </ul> */}
                {/* </div> */}
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                  <span>함께하는 친구</span>
                </div>
                {sharedSchedule[clickSc].scheduleMemberList.length < 1 ? (
                  <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                    <span>함께하는 친구가 없습니다.</span>
                  </div>
                ) : (
                  <AvatarGroup>
                    {sharedSchedule[clickSc].scheduleMemberList.map((value, index) => (
                      <Avatar key={`${value.userCd}-${index}`} alt={`${value.userCd}-${index}`} src={value.userPic} />
                    ))}
                  </AvatarGroup>
                )}
              </div>
            </>
          )}
        </div>
        {clickPic === undefined ? null : (
          <Dialog
            open
            onClose={() => {
              setClickPic(undefined);
            }}
          >
            <div style={{ backgroundColor: 'black' }}>
              <img
                alt='clicked img'
                src={clickPic}
                style={{ maxHeight: '800px', maxWidth: '800px', objectFit: 'contain' }}
              />
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default React.memo(TimelineMultiDay);
