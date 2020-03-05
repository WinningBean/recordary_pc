import React, { useState, useEffect } from 'react';
import * as dateFns from 'date-fns';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import './Calendar.css';

const SideButton = styled(Button)({
  minWidth: '40px',
  height: '75px'
});

// 600x475
const Calendar = props => {
  const [userDate, setUserDate] = useState([
    {
      cd: '01',
      start: new Date('2020-03-02'),
      end: new Date('2020-03-02'),
      ex: '안녕하세요'
    },
    {
      cd: '02',
      start: new Date('2020-03-11'),
      end: new Date('2020-03-31'),
      ex: '발닦고 잠자기'
    },
    {
      cd: '03',
      start: new Date('2020-03-12'),
      end: new Date('2020-03-14'),
      ex: 'ex3'
    },
    {
      cd: '04',
      start: new Date('2020-03-15'),
      end: new Date('2020-03-15'),
      ex: '발닦고 잠자기'
    },
    {
      cd: '05',
      start: new Date('2020-03-17'),
      end: new Date('2020-03-18'),
      ex: '발닦고 잠자기'
    },
    {
      cd: '06',
      start: new Date('2020-03-20'),
      end: new Date('2020-03-22'),
      ex: '발닦고 잠자기'
    },
    {
      cd: '07',
      start: new Date('2020-03-25'),
      end: new Date('2020-03-29'),
      ex: '발닦고 잠자기'
    }
  ]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const Header = () => {
    console.log('this is header');
    return (
      <div className='calendar-header'>
        <div className='calendar-header-side'>
          <SideButton onClick={() => setCurrentMonth(dateFns.subMonths(currentMonth, 1))}>
            <LeftIcon />
          </SideButton>
        </div>
        <div className='calendar-header-center'>
          <span>{dateFns.format(currentMonth, 'MMM yyyy')}</span>
        </div>
        <div className='calendar-header-side'>
          <SideButton onClick={() => setCurrentMonth(dateFns.addMonths(currentMonth, 1))}>
            <RightIcon />
          </SideButton>
        </div>
      </div>
    );
  };
  const Days = () => {
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

  var dayLocation = [];

  //85x74
  const Cells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';
    let y = 18;
    let x = 0;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        dayLocation.push({ day: day, x: x, y: y });
        formattedDate = dateFns.format(day, 'd');
        days.push(
          <div
            className={`cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            // onClick={}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
        x += 85;
      }
      rows.push(
        <div className='cell-row' key={day}>
          {days}
        </div>
      );
      days = [];
      y += 74;
      x = 0;
    }
    return (
      <div id='wrap-cells' onMouseMove={MouseMoveHandler} onMouseUp={onScMouseUp}>
        {rows}
      </div>
    );
  };

  const shortSC = (cd, x, y, ex) => (
    <div
      id={`sc${cd}`}
      key={cd}
      style={{
        position: 'absolute',
        width: '85px',
        height: '0',
        top: `${y}px`,
        left: `${x}px`,
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onMouseDown={onScMouseDown}
    >
      <div
        style={{
          position: 'relative',
          lineHeight: '24px',
          margin: '0 5px'
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '0',
            top: '7px',
            backgroundColor: '#9e5fff',
            width: '6px',
            height: '6px',
            borderRadius: '50%'
          }}
        />
        <span
          style={{
            paddingLeft: '8px',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            fontSize: '11px'
          }}
        >
          {ex}
        </span>
      </div>
    </div>
  );

  // longSC = (스케줄코드, 가로, x, y, 설명, 첫 div인지 여부, 몇번째 div인지)
  const longSC = (cd, width, x, y, ex, index) => {
    const borderLeft = index === 0 ? '2px solid #9e5fff' : '';
    return (
      <div
        id={`sc${cd}`}
        key={`${cd}-${index === undefined ? '' : index}`}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: '0',
          top: `${y}px`,
          left: `${x}px`,
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onMouseDown={onScMouseDown}
      >
        <div
          style={{
            position: 'relative',
            // width: '69px',
            // height: '24px',
            lineHeight: '24px',
            margin: '0 5px'
          }}
        >
          <span
            style={{
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              fontSize: '11px',
              backgroundColor: '#9e5fff80',
              paddingLeft: '2px',
              borderLeft: borderLeft
            }}
          >
            {ex}
          </span>
        </div>
      </div>
    );
  };
  const Schedual = () => {
    const sc = [];
    userDate.map(value => {
      var sameDayLocation = dayLocation.filter(val => dateFns.isSameDay(val.day, value.start))[0];
      if (dateFns.isSameDay(value.start, value.end)) {
        console.log('shortSC');
        sc.push(shortSC(value.cd, sameDayLocation.x, sameDayLocation.y, value.ex));
      } else if (
        dateFns.isWithinInterval(value.end, {
          start: dayLocation[0].day,
          end: dayLocation[dayLocation.length - 1].day
        })
      ) {
        if (dateFns.differenceInCalendarWeeks(value.end, value.start) > 0) {
          var i = 0;
          const weekGap = dateFns.differenceInCalendarWeeks(value.end, value.start);
          sc.push(
            longSC(
              value.cd,
              595 - sameDayLocation.x,
              sameDayLocation.x,
              sameDayLocation.y,
              value.ex,
              i
            )
          );
          for (; i < weekGap - 1; i++) {
            sc.push(longSC(value.cd, 595, 0, sameDayLocation.y + (i + 1) * 74, value.ex, i + 1));
          }
          sameDayLocation = dayLocation.filter(val => dateFns.isSameDay(val.day, value.end))[0];
          sc.push(longSC(value.cd, sameDayLocation.x + 85, 0, sameDayLocation.y, value.ex, i + 1));
          return;
        }
        const diffDay = dateFns.differenceInDays(value.end, value.start) + 1;
        sc.push(longSC(value.cd, 85 * diffDay, sameDayLocation.x, sameDayLocation.y, value.ex, i));
      }
    });
    return sc;
  };

  const movingSchedual = value => {
    var sameDayLocation = dayLocation.filter(val => dateFns.isSameDay(val.day, value.start))[0];
    if (dateFns.isSameDay(value.start, value.end)) {
      return shortSC('moving', sameDayLocation.x, sameDayLocation.y + 3, value.ex);
    } else if (
      dateFns.isWithinInterval(value.end, {
        start: dayLocation[0].day,
        end: dayLocation[dayLocation.length - 1].day
      })
    ) {
      if (dateFns.differenceInCalendarWeeks(value.end, value.start) > 0) {
        var sc = [];
        var i = 0;
        const weekGap = dateFns.differenceInCalendarWeeks(value.end, value.start);
        sc.push(
          longSC(
            'moving',
            595 - sameDayLocation.x,
            sameDayLocation.x,
            sameDayLocation.y,
            value.ex,
            i
          )
        );
        for (; i < weekGap - 1; i++) {
          sc.push(longSC('moving', 595, 0, sameDayLocation.y + (i + 1) * 74, value.ex, i + 1));
        }
        sameDayLocation = dayLocation.filter(val => dateFns.isSameDay(val.day, value.end))[0];
        sc.push(longSC('moving', sameDayLocation.x + 85, 0, sameDayLocation.y, value.ex, i + 1));
        return sc;
      }
      const diffDay = dateFns.differenceInDays(value.end, value.start) + 1;
      return longSC('moving', 85 * diffDay, sameDayLocation.x, sameDayLocation.y, value.ex, i);
    }
  };

  var timer = null;
  var x = null;
  var y = null;
  var id = undefined;
  var isHolding = false;

  const onScMouseDown = e => {
    if (isHolding) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    id = e.currentTarget.id;
    isHolding = true;
    console.log('start holding');
  };

  const onScMouseUp = () => {
    isHolding = false;
    id = undefined;
    console.log('stop holding');
  };

  var moveLife = 20;
  var isMove = false;
  var moveX = null;
  var moveY = null;

  const MouseMoveHandler = e => {
    if (isHolding && id !== undefined) {
      if (moveLife-- < 0) {
        if (!isMove) {
          const el = document.querySelectorAll('#' + id);
          for (let i = 0; i < el.length; i++) {
            el[i].style.opacity = 0.5;
          }
          const moveObjDate = userDate.filter(value => value.cd === id.substring(2))[0];
          const moveLocation = dayLocation.filter(val =>
            dateFns.isSameDay(val.day, moveObjDate.start)
          )[0];
          moveX = moveLocation.x;
          moveY = moveLocation.y;
          // setMoveObject(moveObjDate);
          isMove = true;
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const xa = e.clientX - rect.left;
        const ya = e.clientY - rect.top;
        if (xa > moveX + 85) {
          console.log('X +85');
          // setMoveObject(dateFns.addDays(moveObject, 1));
        } else if (xa < moveX) {
          console.log('X -85');
          // setMoveObject(dateFns.subDays(moveObject, 1));
        }
        if (ya > moveY + 74) {
          console.log('Y + 74');
          // setMoveObject(dateFns.addWeeks(moveObject, 1));
        } else if (ya < moveY) {
          console.log('Y - 74');
          // setMoveObject(dateFns.subWeeks(moveObject, 1));
        }
      }
      return;
    }
    moveLife = 20;
  };

  return (
    <div className='calendar'>
      {Header()}
      {Days()}
      {Cells()}
      <div className='wrap-sc'>{Schedual()}</div>
    </div>
  );
};

export default Calendar;
