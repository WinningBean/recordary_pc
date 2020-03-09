import React, { useState, useEffect, Fragment } from 'react';
import * as dateFns from 'date-fns';
import Header from 'Components/Calendar/CalendarHeader';
import Days from 'Components/Calendar/CalendarDays';
import Popover from '@material-ui/core/Popover';

import './Calendar.css';

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
      cd: '04',
      start: new Date('2020-03-02'),
      end: new Date('2020-03-02'),
      ex: 'Hello World'
    },
    {
      cd: '03',
      start: new Date('2020-03-12'),
      end: new Date('2020-03-14'),
      ex: 'ex3'
    },
    {
      cd: '02',
      start: new Date('2020-03-18'),
      end: new Date('2020-04-05'),
      ex: '발닦고 잠자기'
    }
    // {
    //   cd: '04',
    //   start: new Date('2020-03-15'),
    //   end: new Date('2020-03-15'),
    //   ex: '발닦고 잠자기'
    // },
    // {
    //   cd: '05',
    //   start: new Date('2020-03-17'),
    //   end: new Date('2020-03-18'),
    //   ex: '발닦고 잠자기'
    // },
    // {
    //   cd: '06',
    //   start: new Date('2020-03-20'),
    //   end: new Date('2020-03-22'),
    //   ex: '발닦고 잠자기'
    // },
    // {
    //   cd: '07',
    //   start: new Date('2020-03-25'),
    //   end: new Date('2020-03-29'),
    //   ex: '발닦고 잠자기'
    // }
  ]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popover, setPopover] = useState(null);
  const open = Boolean(popover);

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
        dayLocation.push({ day: day, overlap: 0, isSecondBlock: false, x: x, y: y });
        formattedDate = dateFns.format(day, 'd');
        days.push(
          <div
            id={`cell-index-${dateFns.format(day, 'MMdd')}`}
            className={`cell ${!dateFns.isSameMonth(day, monthStart) ? 'disabled' : ''}`}
            key={day}
            onClick={() => console.log(userDate)}
          >
            {dateFns.isSameDay(day, selectedDate) ? <div className='selected' /> : null}
            <span className='bg'>{formattedDate}</span>
            <span className='number'>{formattedDate}</span>
            <div className='more' onClick={e => setPopover(e.currentTarget)} />
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
    userDate.sort((a, b) => {
      if (dateFns.isSameDay(a.start, b.start)) {
        if (dateFns.isSameDay(a.end, b.end)) {
          return 0;
        }
        return dateFns.differenceInDays(b.end, a.end);
      }
      return dateFns.differenceInDays(a.start, b.start);
    });
    return (
      <div
        id='wrap-cells'
        onMouseDown={onMouseDownCell}
        onMouseMove={MouseMoveHandler}
        onMouseUp={onScMouseUp}
      >
        {rows}
        {Schedual()}
        <Popover
          open={open}
          anchorEl={popover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          disableRestoreFocus
          onClose={() => setPopover(null)}
        >
          <div style={{ width: '250px', height: '250px' }}>
            {(() => (popover === null ? null : popover.id))()}
            asdfsdf
          </div>
        </Popover>
      </div>
    );
  };
  const shortSC = (cd, x, y, ex) => (
    <div
      className={`sc${cd}`}
      key={cd}
      style={{
        position: 'absolute',
        width: '85px',
        height: '0',
        top: `${y}px`,
        left: `${x}px`,
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: '#9e5fff80'
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
            fontSize: '12px'
          }}
        >
          {ex}
        </span>
      </div>
    </div>
  );

  // longSC = (스케줄코드, 가로, x, y, 설명, start Date , end Date, 몇번째 div인지)
  const longSC = (cd, width, x, y, ex, index) => {
    const borderLeft = index === 0 ? '2px solid #9e5fff' : '';
    return (
      <div
        className={`sc${cd}`}
        key={`${cd}-${index === undefined ? '' : index}`}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: '0',
          top: `${y}px`,
          left: `${x}px`,
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor: '#9e5fff80'
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
              fontSize: '12px',
              backgroundColor: '#9e5fff80',
              paddingLeft: '2px',
              borderLeft: borderLeft
            }}
            onClick={e => {
              setPopover(e.currentTarget);
            }}
          >
            {ex}
          </span>
        </div>
      </div>
    );
  };

  //<span className='number'>{formattedDate}</span>
  const Schedual = () => {
    const sc = [];
    console.log('pass sc');

    const moreList = document.querySelectorAll('.more');
    for (let i = 0; i < moreList.length; i++) {
      moreList[i].style.display = 'none';
    }

    userDate.map(value => {
      if (
        // 데이트가 해당 캘린더 안에 속하는지 확인
        !(
          dateFns.isWithinInterval(value.start, {
            start: dayLocation[0].day,
            end: dateFns.addDays(dayLocation[dayLocation.length - 1].day, 1)
          }) ||
          dateFns.isWithinInterval(value.end, {
            start: dayLocation[0].day,
            end: dateFns.addDays(dayLocation[dayLocation.length - 1].day, 1)
          })
        )
      ) {
        return;
      }
      var index = null;
      var secondBlock = false;
      var beforeStartDay = false;
      if (
        !dateFns.isWithinInterval(value.start, {
          start: dayLocation[0].day,
          end: dateFns.addDays(dayLocation[dayLocation.length - 1].day, 1)
        })
      ) {
        index = 0;
        beforeStartDay = true;
        console.log('ispass');
      } else {
        for (let i = 0; i < dayLocation.length; i++) {
          if (dateFns.isSameDay(dayLocation[i].day, value.start)) {
            index = i;
            break;
          }
        }
      }
      if (dayLocation[index].overlap === 2) {
        const currDom = document.getElementById(
          `cell-index-${dateFns.format(dayLocation[index].day, 'MMdd')}`
        );
        const moreList = document.querySelectorAll('.more');
        moreList[index].style.display = 'block';
        return;
      } else if (dayLocation[index].overlap > 2) {
        return;
      } else {
      }
      if (dateFns.isSameDay(value.start, value.end)) {
        if (dayLocation[index].isSecondBlock) {
          sc.push(shortSC(value.cd, dayLocation[index].x, dayLocation[index].y + 20, value.ex));
        } else {
          dayLocation[index].isSecondBlock = true;
          sc.push(shortSC(value.cd, dayLocation[index].x, dayLocation[index].y, value.ex));
        }
        dayLocation[index].overlap = ++dayLocation[index].overlap;
        dayLocation[index].isSecondBlock = true;
      } else {
        if (dateFns.differenceInCalendarWeeks(value.end, value.start) > 0) {
          if (!beforeStartDay) {
            if (dayLocation[index].isSecondBlock === true) {
              secondBlock = true;
              sc.push(
                longSC(
                  value.cd,
                  595 - dayLocation[index].x,
                  dayLocation[index].x,
                  dayLocation[index].y + 25,
                  value.ex,
                  0
                )
              );
            } else {
              dayLocation[index].isSecondBlock = true;
              sc.push(
                longSC(
                  value.cd,
                  595 - dayLocation[index].x,
                  dayLocation[index].x,
                  dayLocation[index].y,
                  value.ex,
                  0
                )
              );
            }

            for (
              let k = 0;
              k < dateFns.differenceInDays(dateFns.endOfWeek(value.start), value.start) + 1;
              k++
            ) {
              dayLocation[index].isSecondBlock = true;
              dayLocation[index].overlap = ++dayLocation[index].overlap;
              index++;
            }
          }

          var i = 0;
          const weekGap = dateFns.differenceInCalendarWeeks(value.end, value.start);
          for (; i < weekGap - 1; i++) {
            // middle sc
            if (index >= dayLocation.length) {
              const cloneElement = React.cloneElement(
                sc[sc.length - 1],
                { style: sc[sc.length - 1].props.style },
                React.Children.map(sc[sc.length - 1].props.children, child =>
                  React.cloneElement(child, {
                    style: { ...child.props.style, marginRight: 0, borderRight: '3px solid gray' }
                  })
                )
              );
              sc.pop();
              sc.push(cloneElement);
              return sc;
            }
            if (secondBlock) {
              sc.push(longSC(value.cd, 595, 0, dayLocation[index].y + 25, value.ex, i + 1));
            } else {
              sc.push(longSC(value.cd, 595, 0, dayLocation[index].y, value.ex, i + 1));
            }
            // const currWeek = dateFns.addWeeks(value.start, i + 1);
            // const currWeekFisrtDay = dateFns.startOfWeek(currWeek);
            for (let j = 0; j < 7; ++j) {
              dayLocation[index].isSecondBlock = true;
              dayLocation[index].overlap = ++dayLocation[index].overlap;
              index++;
            }
          }

          if (
            dateFns.addDays(dayLocation[dayLocation.length - 1].day, 1) <=
            dateFns.addWeeks(value.start, i + 1)
          ) {
            const cloneElement = React.cloneElement(
              sc[sc.length - 1],
              { style: sc[sc.length - 1].props.style },
              React.Children.map(sc[sc.length - 1].props.children, child =>
                React.cloneElement(child, {
                  style: { ...child.props.style, marginRight: 0, borderRight: '3px solid gray' }
                })
              )
            );
            sc.pop();
            sc.push(cloneElement);
            return sc;
          }
          if (secondBlock) {
            sc.push(
              longSC(
                value.cd,
                dayLocation[index].x + 85,
                0,
                dayLocation[index].y + 25,
                value.ex,
                i + 1
              )
            );
          } else {
            const diffDay = dateFns.differenceInDays(value.end, dayLocation[index].day) + 1;
            sc.push(longSC(value.cd, 85 * diffDay, 0, dayLocation[index].y, value.ex, i + 1));
          }

          // const currWeek = dateFns.addWeeks(value.start, i + 1);
          // const currWeekFisrtDay = dateFns.startOfWeek(currWeek);

          const countDays = dateFns.differenceInDays(value.end, dateFns.startOfWeek(value.end)) + 1;
          for (let j = 0; j < countDays; j++) {
            dayLocation[index].isSecondBlock = true;
            dayLocation[index].overlap = ++dayLocation[index].overlap;
            index++;
          }
          return;
        }
        const diffDay = dateFns.differenceInDays(value.end, dayLocation[index].day) + 1;
        if (dayLocation[index].isSecondBlock) {
          sc.push(
            longSC(
              value.cd,
              85 * diffDay,
              dayLocation[index].x,
              dayLocation[index].y + 25,
              value.ex,
              0
            )
          );
        } else {
          sc.push(
            longSC(value.cd, 85 * diffDay, dayLocation[index].x, dayLocation[index].y, value.ex, 0)
          );
        }

        for (let i = 0; i < dateFns.differenceInDays(value.end, value.start) + 1; i++) {
          dayLocation[index].isSecondBlock = true;
          dayLocation[index].overlap = ++dayLocation[index].overlap;
          index++;
        }
      }
    });
    return sc;
  };

  var id = undefined;
  var x = null;
  var y = null;
  var popoverX = null;
  var popoverY = null;

  const onMouseDownCell = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  };
  const onScMouseDown = e => {
    id = e.currentTarget.className;
    console.log('start holding');
  };

  const onScMouseUp = e => {
    console.log('stop holding');
    if (isMove) {
      const rect = e.currentTarget.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const moveY = e.clientY - rect.top;

      var moveBlockX = 0;
      var moveBlockY = 0;
      if (moveX > x) {
        moveBlockX = parseInt(moveX / 85) - parseInt(x / 85);
      } else {
        moveBlockX = -(parseInt(x / 85) - parseInt(moveX / 85));
      }
      if (moveY > y) {
        moveBlockY = parseInt(moveY / 74) - parseInt(y / 74);
      } else {
        moveBlockY = -(parseInt(y / 74) - parseInt(moveY / 74));
      }
      const moveObjDate = userDate.filter(value => value.cd === id.substring(2))[0];
      setUserDate(
        userDate.map(value => {
          if (moveObjDate.cd === value.cd) {
            return {
              ...value,
              start: dateFns.addWeeks(dateFns.addDays(value.start, moveBlockX), moveBlockY),
              end: dateFns.addWeeks(dateFns.addDays(value.end, moveBlockX), moveBlockY)
            };
          }
          return value;
        })
      );
      const realObj = document.querySelectorAll('.' + id);
      for (let i = 0; i < realObj.length; i++) {
        realObj[i].style.opacity = 1.0;
      }

      var header = document.getElementById('clone-obj'); //제거하고자 하는 엘리먼트
      header.parentNode.removeChild(header);
    }
    id = undefined;
  };

  var moveLife = 5;
  var isMove = false;

  const MouseMoveHandler = e => {
    if (id !== undefined) {
      if (moveLife-- < 0) {
        if (!isMove) {
          // 기존 옮기는 div를 투명하게 처리
          const realObj = document.querySelectorAll('.' + id);
          for (let i = 0; i < realObj.length; i++) {
            realObj[i].style.opacity = 0.5;
          }
          // 움직일려는 객체에 대한 위치를 저장
          var cloneObj = document.createElement('span');
          cloneObj.id = 'clone-obj';
          cloneObj.display = 'block';
          cloneObj.style.position = 'absolute';
          cloneObj.style.overflow = 'hidden';
          cloneObj.style.width = '85px';
          cloneObj.style.fontSize = '11px';
          cloneObj.style.textOverflow = 'ellipsis';
          cloneObj.style.whiteSpace = 'nowrap';
          cloneObj.style.fontWeight = 'bold';
          cloneObj.style.borderLeft = '2px solid #9e5fff';
          cloneObj.style.lineHeight = '24px';
          cloneObj.style.cursor = 'move';
          cloneObj.innerText = realObj[0].innerText;
          cloneObj.style.backgroundColor = realObj[0].style.backgroundColor;
          document.getElementById('wrap-cells').appendChild(cloneObj);
          isMove = true;
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const xa = e.clientX - rect.left;
        const ya = e.clientY - rect.top;
        const clone = document.getElementById('clone-obj');
        clone.style.top = `${ya - 10}px`;
        clone.style.left = `${xa - 20}px`;
      }
      return;
    }
    moveLife = 5;
  };
  console.log(userDate);
  return (
    <div className='calendar'>
      <Header
        currentMonth={currentMonth}
        onClickLeft={() => setCurrentMonth(dateFns.subMonths(currentMonth, 1))}
        onClickRight={() => setCurrentMonth(dateFns.addMonths(currentMonth, 1))}
      />
      <Days currentMonth={currentMonth} />
      {Cells()}

      {/* <div className='wrap-sc'>{}</div> */}
    </div>
  );
};

export default Calendar;
