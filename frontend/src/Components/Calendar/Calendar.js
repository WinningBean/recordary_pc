import React, { useState, useMemo, useCallback, useEffect } from 'react';
import * as dateFns from 'date-fns';
import CalendarScheduleEdit from './CalendarScheduleEdit';

import Popover from '@material-ui/core/Popover';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';

import LongMenu from '../Other/MoreMenu';
import SnackBar from '../UI/Snackbar';
import AddSchedule from './AddSchedule';
import AlertDialog from '../Other/AlertDialog';
import './Calendar.css';
import produce from 'immer';

import { Link } from 'react-router-dom';

import axios from 'axios';

// 600x475, 85x74
const Calendar = (props) => {
  const type = props.type;
  // this.state.type
  // 0 : 내 프로필
  // 1 : 남의 프로필
  // 2 : 마스터 그룹 프로필
  // 3 : 그룹원 프로필
  // 4 : 개인 일정 공유
  // 5 : 남의 그룹 프로필
  // 6 : 그룹 일정 공유
  const [userDate, setUserDate] = useState([]);

  const [publicState, SetPublicState] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dayLocation, setDayLocation] = useState(null);
  const [popover, setPopover] = useState(null);
  const [detailedSC, setDetailedSC] = useState(null);
  const [scheduleEditOpen, setScheduleEditOpen] = useState(false);
  const [clickDate, setClickDate] = useState(null);
  const [alert, setAlert] = useState(null);
  const open = Boolean(popover);
  const selectedDetailedSC = (() => {
    if (detailedSC !== null) {
      for (let i = 0; i < userDate.length; i++) {
        if (userDate[i].cd === detailedSC.cd) {
          return userDate[i];
        }
      }
    }
    return null;
  })();

  const onAddUserDate = (newSchedule) => {
    const copyDraft = produce(userDate.concat(newSchedule), (draft) => {
      draft.sort((a, b) => {
        if (dateFns.isSameDay(a.start, b.start)) {
          if (dateFns.isSameDay(a.end, b.end)) {
            return 0;
          }
          return dateFns.differenceInDays(b.end, a.end);
        }
        return dateFns.differenceInDays(a.start, b.start);
      });
    });
    setUserDate(copyDraft);
  };

  useEffect(() => {
    if (props.searchedSchedule === null) {
      return;
    }
    setCurrentMonth(props.searchedSchedule.scheduleStr);
  }, [props.searchedSchedule]);

  useEffect(() => {
    (async () => {
      setAlert(
        <div
          // className='loading'
          style={{
            position: 'absolute',
            top: '106px',
            left: 0,
            width: '100%',
            height: '444px',
            backgroundColor: '#eee8',
          }}
        />
      );
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);

      var data = undefined;

      console.log(props.info, props.type);
      try {
        if (props.type === 2 || props.type === 3 || props.type === 5 || props.type === 6) {
          data = (
            await axios.post(`/schedule/showGroupSchedule/${props.info.groupCd}`, {
              groupCd: props.info.groupCd,
              frommDate: startDate.getTime(),
              toDate: endDate.getTime(),
            })
          ).data;
        } else {
          data = (
            await axios.post(`/schedule/showUserSchedule/${props.info.userCd}`, {
              userCd: props.info.userCd,
              frommDate: startDate.getTime(),
              toDate: endDate.getTime(),
            })
          ).data;
        }

        console.log(data);

        const abcd = data.map((value) => ({
          tab: value.tabCd,
          cd: value.scheduleCd,
          nm: value.scheduleNm,
          ex: value.scheduleEx,
          start: new Date(value.scheduleStr),
          end: new Date(value.scheduleEnd),
          color: value.scheduleCol,
          state: value.schedulePublicState,
          members: value.scheduleMemberList,
          user: value.user,
        }));

        const copyDraft = produce(abcd, (draft) => {
          draft.sort((a, b) => {
            if (dateFns.isSameDay(a.start, b.start)) {
              if (dateFns.isSameDay(a.end, b.end)) {
                return 0;
              }
              return dateFns.differenceInDays(b.end, a.end);
            }
            return dateFns.differenceInDays(a.start, b.start);
          });
        });
        setUserDate(copyDraft);
        setAlert(null);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentMonth]);

  console.log(userDate);

  //#region Handler
  var id = undefined;
  var x = null;
  var y = null;

  const onMouseDownCell = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  };
  const onScMouseDown = (e) => {
    if (alert !== null) {
      return;
    }
    id = e.currentTarget.className.substring(25);
    console.log('start holding', id);
  };

  const onScMouseUp = (e) => {
    if (id === undefined) {
      return;
    }
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

      const moveObjDate = userDate.filter((value) => value.cd == id.substring(3))[0];
      setAlert(
        <AlertDialog
          severity='info'
          content={
            <>
              <div>{`'${moveObjDate.nm}' 일정 을 바꾸시겠습니까?`}</div>
              <div>{`현재 일정: ${dateFns.format(moveObjDate.start, 'yyyy년 MM월 dd일')} - ${dateFns.format(
                moveObjDate.end,
                'yyyy년 MM월 dd일'
              )}`}</div>
              <div>{`바뀐 일정: ${dateFns.format(
                dateFns.addWeeks(dateFns.addDays(moveObjDate.start, moveBlockX), moveBlockY),
                'yyyy년 MM월 dd일'
              )} - ${dateFns.format(
                dateFns.addWeeks(dateFns.addDays(moveObjDate.end, moveBlockX), moveBlockY),
                'yyyy년 MM월 dd일'
              )}`}</div>
            </>
          }
          onAlertClose={() => {
            setAlert(null);
          }}
          onAlertSubmit={async () => {
            setAlert(<SnackBar severity='info' content='일정을 수정중입니다...' duration={999999} />);
            try {
              await axios.post(`/schedule/update/${moveObjDate.cd}`, {
                groupCd: type === 0 ? null : props.info.groupCd,
                TabCodeFK: null,
                scheduleNm: moveObjDate.nm,
                scheduleEx: moveObjDate.ex,
                scheduleStr: dateFns.addWeeks(dateFns.addDays(moveObjDate.start, moveBlockX), moveBlockY),
                scheduleEnd: dateFns.addWeeks(dateFns.addDays(moveObjDate.end, moveBlockX), moveBlockY),
                scheduleCol: moveObjDate.color,
                schedulePublicState: moveObjDate.state,
              });
              var changedUserDate = userDate.map((value) => {
                if (moveObjDate.cd == value.cd) {
                  return {
                    ...value,
                    start: dateFns.addWeeks(dateFns.addDays(value.start, moveBlockX), moveBlockY),
                    end: dateFns.addWeeks(dateFns.addDays(value.end, moveBlockX), moveBlockY),
                  };
                }
                return value;
              });
              setUserDate(
                produce(changedUserDate, (draft) => {
                  draft.sort((a, b) => {
                    if (dateFns.isSameDay(a.start, b.start)) {
                      if (dateFns.isSameDay(a.end, b.end)) {
                        return 0;
                      }
                      return dateFns.differenceInDays(b.end, a.end);
                    }
                    return dateFns.differenceInDays(a.start, b.start);
                  });
                })
              );
              setAlert(
                <SnackBar
                  severity='success'
                  content='일정이 수정되었습니다.'
                  duration={1000}
                  onClose={() => setAlert(null)}
                />
              );
            } catch (error) {
              setAlert(<SnackBar severity='error' content={error} onClose={() => setAlert(null)} />);
            }
          }}
        />
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

  const MouseMoveHandler = (e) => {
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
          cloneObj.style.borderLeft = `2px solid ${realObj[0].style.backgroundColor}`;
          cloneObj.style.lineHeight = '24px';
          cloneObj.style.cursor = 'move';
          cloneObj.innerText = realObj[0].innerText;
          cloneObj.style.backgroundColor = realObj[0].style.backgroundColor;
          document.getElementById('wrap-cells').appendChild(cloneObj);
          isMove = true;
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
  //#endregion

  //#region View

  const CalendarHeader = useMemo(() => {
    console.log('render CalendarHeader');
    return (
      <div className='calendar-header'>
        <div className='calendar-header-side'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '40px',
              height: '75px',
            }}
            onClick={() => setCurrentMonth(dateFns.subMonths(currentMonth, 1))}
          >
            <LeftIcon />
          </div>
        </div>
        <div className='calendar-header-center'>
          <div>{dateFns.format(currentMonth, 'MMM yyyy')}</div>
          {type === 2 || type === 3 || type === 6 ? (
            <div
              style={{
                fontSize: '11px',
                color: '#666',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {`${publicState === 0 ? '전체' : publicState === 3 ? '비공개' : null} ▼`}
              <LongMenu
                hide={true}
                options={['전체공개', '비공개']}
                returnValue={(selectedValue) => {
                  console.log(selectedValue);
                  switch (selectedValue) {
                    case '전체공개':
                      if (publicState !== 0) {
                        SetPublicState(0);
                      }
                      break;
                    case '비공개':
                      if (publicState !== 3) {
                        SetPublicState(3);
                      }
                      break;
                  }
                }}
              />
            </div>
          ) : null}
          {type === 0 || type === 4 ? (
            <div
              style={{
                fontSize: '11px',
                color: '#666',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* {type === 2 || type === 3 || type === 6} */}
              {`${
                publicState === 0
                  ? '전체'
                  : publicState === 1
                  ? '팔로워만'
                  : publicState === 2
                  ? '친구만'
                  : publicState === 3
                  ? '나만'
                  : null
              } ▼`}
              <LongMenu
                hide={true}
                options={['전체공개', '팔로워만', '친구만', '나만보기']}
                returnValue={(selectedValue) => {
                  console.log(selectedValue);
                  switch (selectedValue) {
                    case '전체공개':
                      if (publicState !== 0) {
                        SetPublicState(0);
                      }
                      break;
                    case '팔로워만':
                      if (publicState !== 1) {
                        SetPublicState(1);
                      }
                      break;
                    case '친구만':
                      if (publicState !== 2) {
                        SetPublicState(2);
                      }
                      break;
                    case '나만보기':
                      if (publicState !== 3) {
                        SetPublicState(3);
                      }
                      break;
                  }
                }}
              />
            </div>
          ) : null}
        </div>
        <div className='calendar-header-side'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '40px',
              height: '75px',
            }}
            onClick={() => setCurrentMonth(dateFns.addMonths(currentMonth, 1))}
          >
            <RightIcon />
          </div>
        </div>
      </div>
    );
  }, [currentMonth, publicState]);

  const CalendarDays = useMemo(() => {
    console.log('render CalendarDays');
    const days = [];

    let startDate = dateFns.startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='day' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className='wrap-days'>{days}</div>;
  }, []);

  const Cells = useMemo(() => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const selectedDate = new Date();

    const rows = [];
    var location = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';
    let y = 18;
    let x = 0;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        location.push({
          day: day,
          overlap: 0,
          isSecondBlock: false,
          x: x,
          y: y,
        });
        formattedDate = dateFns.format(day, 'd');
        const currDay = day; // 클로저
        var isBorderLeft = false;
        if (i === 0) isBorderLeft = true;

        days.push(
          <div
            id={`cell-index-${dateFns.format(day, 'MMdd')}`}
            className={`cell ${!dateFns.isSameMonth(day, monthStart) ? 'disabled' : ''} ${
              isBorderLeft === true ? 'borderLeft' : ''
            }`}
            key={day}
            onClick={() => {
              if (type === 4 || type === 6) {
                props.onChoice(currDay, userDate, publicState);
              } else if (type === 0 || type === 2 || type === 3) {
                setClickDate(currDay);
              }
            }}
            style={(() => {
              if (type !== 4) {
                return null;
              }
              if (props.choiceSharedStartDate !== null && props.choiceSharedEndDate === null) {
                if (dateFns.differenceInCalendarDays(currDay, props.choiceSharedStartDate) === 0)
                  return { border: '2px solid green' };
              } else if (props.choiceSharedStartDate !== null && props.choiceSharedEndDate !== null) {
                if (
                  dateFns.isWithinInterval(currDay, {
                    start: props.choiceSharedStartDate,
                    end: props.choiceSharedEndDate,
                  })
                ) {
                  return { backgroundColor: 'rgba(20, 81, 51, 0.1)' };
                }
              }
            })()}
          >
            {dateFns.isSameDay(day, selectedDate) ? (
              <div
                className='selected'
                style={{ backgroundColor: type === 2 || type === 3 || type === 5 ? 'tomato' : null }}
              />
            ) : null}
            <span className='bg'>{formattedDate}</span>
            <span className='number'>{formattedDate}</span>
            {/* <div
              className='more'
              style={{ zIndex: 9 }}
              onClick={(e) => setPopover({ event: e.currentTarget, date: currDay })}
            /> */}
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

    setDayLocation(location);
    return rows;
  }, [currentMonth, type, props.choiceSharedStartDate, props.choiceSharedEndDate, props.onChoice]);
  //#endregion

  //#region Schedule View
  const shortSC = (cd, x, y, nm, color) => (
    <div
      className={`transition-all animation sc-${cd}`}
      data-id={cd}
      key={cd}
      style={{
        position: 'absolute',
        width: '85px',
        height: '0',
        top: `${y}px`,
        left: `${x}px`,
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 10,
        backgroundColor: color,
      }}
      onMouseDown={type === 0 || type === 2 || type === 3 ? onScMouseDown : null}
      onClick={(e) => {
        if (alert !== null) {
          return;
        }
        setDetailedSC({ event: e.currentTarget, cd: cd });
      }}
    >
      <div
        style={{
          position: 'relative',
          lineHeight: '24px',
          margin: '0 5px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '0',
            top: '7px',
            backgroundColor: color + 'a0',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
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
            fontSize: '12px',
          }}
        >
          {nm}
        </span>
      </div>
    </div>
  );

  // longSC = (스케줄코드, 가로, x, y, 설명, start Date , end Date, 몇번째 div인지)
  const longSC = (cd, width, x, y, nm, index, color) => {
    const borderLeft = index === 0 ? `2px solid ${color}` : '';
    return (
      <div
        className={`transition-all animation sc-${cd}`}
        key={`${cd}-${index === undefined ? '' : index}`}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: '0',
          top: `${y}px`,
          left: `${x}px`,
          cursor: 'pointer',
          userSelect: 'none',
          zIndex: 10,
          backgroundColor: color,
        }}
        onMouseDown={type === 0 || type === 2 || type === 3 ? onScMouseDown : null}
        onClick={(e) => {
          if (alert !== null) {
            return;
          }
          setDetailedSC({ event: e.currentTarget, cd: cd });
        }}
      >
        <div
          style={{
            position: 'relative',
            // width: '69px',
            // height: '24px',
            lineHeight: '20px',
            margin: '0 5px',
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
              backgroundColor: color + '80',
              paddingLeft: '2px',
              borderLeft: borderLeft,
            }}
          >
            {nm}
          </span>
        </div>
      </div>
    );
  };
  //#endregion

  const Schedual = () => {
    if (dayLocation === null) {
      return null;
    }
    if (!dateFns.isSameMonth(dayLocation[parseInt(dayLocation.length / 2)].day, currentMonth)) return null;
    console.log('render schedual');
    const sc = [];

    const tabSc = props.clickTab !== undefined ? userDate.filter((value) => value.tab === props.clickTab) : userDate;

    const copyDraft = produce(tabSc, (draft) => {
      draft.sort((a, b) => {
        if (dateFns.isSameDay(a.start, b.start)) {
          if (dateFns.isSameDay(a.end, b.end)) {
            return 0;
          }
          return dateFns.differenceInDays(b.end, a.end);
        }
        return dateFns.differenceInDays(a.start, b.start);
      });
    });

    // const moreList = document.querySelectorAll('.more');
    // for (let i = 0; i < moreList.length; i++) {
    //   moreList[i].style.display = 'none';
    // }

    var isSelect = false;
    if (props.searchedSchedule !== null) {
      isSelect = true;
    }

    var copyDayLocation = dayLocation.map((value) => ({ ...value }));
    copyDraft.forEach((value) => {
      if (publicState !== 0 && value.state !== publicState) {
        return;
      }
      console.log(props.tabInfo, props.clickTabIndex);
      var color = undefined;
      if (props.type === 0 || props.type === 1) {
        if (props.clickTab === undefined) {
          // 탭 색상 반영 유무 체크
          if (value.tab === null || type === 4 || type === 6) {
            color = value.color;
          } else {
            console.log(props.clickTab);
            color = props.tabInfo.find((_value) => _value.scheduleTabCd === value.tab).scheduleTabColor;
          }
        } else {
          color = value.color;
        }
      } else {
        color = value.color;
      }

      var index = null;
      var secondBlock = false;
      var beforeStartDay = false;
      if (
        dateFns.isWithinInterval(value.start, {
          start: copyDayLocation[0].day,
          end: dateFns.endOfDay(copyDayLocation[copyDayLocation.length - 1].day),
        })
      ) {
        for (let i = 0; i < copyDayLocation.length; i++) {
          if (dateFns.isSameDay(copyDayLocation[i].day, value.start)) {
            index = i;
            break;
          }
        }
      } else {
        if (
          dateFns.isWithinInterval(value.end, {
            start: copyDayLocation[0].day,
            end: dateFns.endOfDay(copyDayLocation[copyDayLocation.length - 1].day),
          })
        ) {
          index = 0;
          beforeStartDay = true;
        } else {
          return;
        }
      }
      if (copyDayLocation[index].overlap === 2) {
        sc.push(
          <div
            style={{
              position: 'absolute',
              top: copyDayLocation[index].y - 19,
              left: copyDayLocation[index].x,
              width: 85,
              height: 74,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                transform: 'skew(45deg, -45deg)',
                backgroundColor: 'rgb(209, 209, 209)',
              }}
              onClick={(e) => setPopover({ event: e.currentTarget, date: copyDayLocation[index].day })}
            />
          </div>
        );
        return;
      } else if (copyDayLocation[index].overlap > 2) {
        return;
      }
      if (dateFns.isSameDay(value.start, value.end)) {
        if (copyDayLocation[index].isSecondBlock) {
          if (dateFns.differenceInHours(value.end, value.start) >= 23) {
            sc.push(longSC(value.cd, 85, copyDayLocation[index].x, copyDayLocation[index].y + 25, value.nm, 0, color));
          } else {
            sc.push(shortSC(value.cd, copyDayLocation[index].x, copyDayLocation[index].y + 20, value.nm, color));
          }
        } else {
          if (dateFns.differenceInHours(value.end, value.start) >= 23) {
            sc.push(longSC(value.cd, 85, copyDayLocation[index].x, copyDayLocation[index].y, value.nm, 0, color));
          } else {
            sc.push(shortSC(value.cd, copyDayLocation[index].x, copyDayLocation[index].y, value.nm, color));
          }
        }
        copyDayLocation[index].overlap = ++copyDayLocation[index].overlap;
        copyDayLocation[index].isSecondBlock = !copyDayLocation[index].isSecondBlock;
      } else {
        if (dateFns.differenceInCalendarWeeks(value.end, copyDayLocation[index].day) > 0) {
          if (copyDayLocation[index].isSecondBlock === true) {
            secondBlock = true;
            sc.push(
              longSC(
                value.cd,
                595 - copyDayLocation[index].x,
                copyDayLocation[index].x,
                copyDayLocation[index].y + 25,
                value.nm,
                beforeStartDay ? -1 : 0,
                color
              )
            );
          } else {
            copyDayLocation[index].isSecondBlock = !copyDayLocation[index].isSecondBlock;
            sc.push(
              longSC(
                value.cd,
                595 - copyDayLocation[index].x,
                copyDayLocation[index].x,
                copyDayLocation[index].y,
                value.nm,
                beforeStartDay ? -1 : 0,
                color
              )
            );
          }

          const endOfWeek = dateFns.endOfWeek(copyDayLocation[index].day);
          const startOfWeek = copyDayLocation[index].day;
          for (let k = 0; k < dateFns.differenceInDays(endOfWeek, startOfWeek) + 1; k++) {
            copyDayLocation[index].isSecondBlock = !secondBlock;
            ++copyDayLocation[index].overlap;
            ++index;
          }
          var i = 0;
          const weekGap = beforeStartDay
            ? dateFns.differenceInCalendarWeeks(value.end, copyDayLocation[0].day)
            : dateFns.differenceInCalendarWeeks(value.end, value.start);
          for (; i < weekGap - 1; i++) {
            // middle sc
            if (index >= copyDayLocation.length) {
              const cloneElement = React.cloneElement(
                sc[sc.length - 1],
                { style: sc[sc.length - 1].props.style },
                React.Children.map(sc[sc.length - 1].props.children, (child) =>
                  React.cloneElement(child, {
                    style: {
                      ...child.props.style,
                      marginRight: 0,
                      borderRight: '3px solid gray',
                    },
                  })
                )
              );
              sc.pop();
              sc.push(cloneElement);
              return;
            }
            if (secondBlock) {
              sc.push(longSC(value.cd, 595, 0, copyDayLocation[index].y + 25, '　', i + 1, color));
            } else {
              sc.push(longSC(value.cd, 595, 0, copyDayLocation[index].y, '　', i + 1, color));
            }
            // const currWeek = dateFns.addWeeks(value.start, i + 1);
            // const currWeekFisrtDay = dateFns.startOfWeek(currWeek);
            for (let j = 0; j < 7; ++j) {
              copyDayLocation[index].isSecondBlock = !secondBlock;
              copyDayLocation[index].overlap = ++copyDayLocation[index].overlap;
              index++;
            }
          }

          if (
            dateFns.addDays(copyDayLocation[copyDayLocation.length - 1].day, 1) <= dateFns.addWeeks(value.start, i + 1)
          ) {
            const cloneElement = React.cloneElement(
              sc[sc.length - 1],
              { style: sc[sc.length - 1].props.style },
              React.Children.map(sc[sc.length - 1].props.children, (child) =>
                React.cloneElement(child, {
                  style: {
                    ...child.props.style,
                    marginRight: 0,
                    borderRight: '3px solid gray',
                  },
                })
              )
            );
            sc.pop();
            sc.push(cloneElement);
            return;
          }
          const diffDay = dateFns.differenceInDays(value.end, copyDayLocation[index].day) + 1;
          if (secondBlock) {
            sc.push(longSC(value.cd, 85 * diffDay, 0, copyDayLocation[index].y + 25, '　', i + 1, color));
          } else {
            sc.push(longSC(value.cd, 85 * diffDay, 0, copyDayLocation[index].y, '　', i + 1, color));
          }

          // const currWeek = dateFns.addWeeks(value.start, i + 1);
          // const currWeekFisrtDay = dateFns.startOfWeek(currWeek);

          for (let j = 0; j < diffDay; j++) {
            console.log(value.nm, index);
            copyDayLocation[index].isSecondBlock = !secondBlock;
            copyDayLocation[index].overlap = ++copyDayLocation[index].overlap;
            index++;
          }
          return;
        }
        const diffDay = dateFns.differenceInDays(value.end, copyDayLocation[index].day) + 1;
        if (copyDayLocation[index].isSecondBlock) {
          sc.push(
            longSC(
              value.cd,
              85 * diffDay,
              copyDayLocation[index].x,
              copyDayLocation[index].y + 25,
              value.nm,
              beforeStartDay ? -1 : 0,
              color
            )
          );
        } else {
          sc.push(
            longSC(
              value.cd,
              85 * diffDay,
              copyDayLocation[index].x,
              copyDayLocation[index].y,
              value.nm,
              beforeStartDay ? -1 : 0,
              color
            )
          );
        }

        for (let i = 0; i < dateFns.differenceInDays(value.end, value.start) + 1; i++) {
          copyDayLocation[index].isSecondBlock = !secondBlock;
          copyDayLocation[index].overlap = ++copyDayLocation[index].overlap;
          index++;
        }
      }
      if (isSelect && props.searchedSchedule.scheduleCd === value.cd) {
        const cloneElement = React.cloneElement(
          sc[sc.length - 1],
          { style: sc[sc.length - 1].props.style },
          React.Children.map(sc[sc.length - 1].props.children, (child) =>
            React.cloneElement(child, {
              style: {
                ...child.props.style,
                border: '2px solid darkslategray',
              },
            })
          )
        );
        sc.pop();
        sc.push(cloneElement);
      }
    });
    return sc;
  };

  return (
    <div className='calendar'>
      {CalendarHeader}
      {CalendarDays}
      {type === 0 || type === 2 || type === 3 ? (
        <div id='wrap-cells' onMouseDown={onMouseDownCell} onMouseMove={MouseMoveHandler} onMouseUp={onScMouseUp}>
          {Cells}
          {Schedual()}
        </div>
      ) : (
        <div id='wrap-cells'>
          {Cells}
          {Schedual()}
        </div>
      )}
      <Popover
        open={open}
        anchorEl={popover === null ? null : popover.event}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
        onClose={() => setPopover(null)}
      >
        <div className='calendar-popover'>
          <div className='calendar-popover-header'>
            {popover === null ? null : (
              <>
                <div style={{ fontSize: '24px', textAlign: 'center' }}>{dateFns.format(popover.date, 'd일')}</div>
                <div
                  style={{
                    fontSize: '12px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {dateFns.format(popover.date, 'EEE')}
                </div>
              </>
            )}
          </div>
          <div className='calendar-popover-content'>
            {popover === null
              ? null
              : (() =>
                  userDate
                    .filter((value) =>
                      dateFns.isWithinInterval(popover.date, {
                        start: dateFns.startOfDay(value.start),
                        end: dateFns.endOfDay(value.end),
                      })
                    )
                    .map((value) => (
                      <div
                        className={`sc${value.cd}`}
                        key={value.cd}
                        style={{
                          position: 'relative',
                          marginTop: '5px',
                          width: '190px',
                          height: '30px',
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                        // onMouseDown={onScMouseDown}
                        onClick={(e) =>
                          setDetailedSC({
                            event: e.currentTarget,
                            cd: value.cd,
                          })
                        }
                      >
                        <div
                          style={{
                            position: 'absolute',
                            lineHeight: '24px',
                            margin: '0 5px',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: '0',
                              top: '7px',
                              backgroundColor: value.color,
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                            }}
                          />
                          <span
                            style={{
                              paddingLeft: '10px',
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontWeight: 'bold',
                              fontSize: '14px',
                            }}
                          >
                            {value.nm}
                          </span>
                          <span
                            style={{
                              position: 'absolute',
                              left: '10px',
                              top: '15px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontWeight: 'bold',
                              fontSize: '10px',
                              color: 'gray',
                            }}
                          >
                            {dateFns.isSameDay(value.start, value.end)
                              ? null
                              : dateFns.format(value.start, 'M월 dd일 ')}
                            {dateFns.format(value.start, 'a ') === 'AM' ? '오전' : '오후'}
                            {dateFns.format(value.start, 'h - ')}
                            {dateFns.isSameDay(value.start, value.end) ? null : dateFns.format(value.end, 'M월 dd일 ')}
                            {dateFns.format(value.end, 'a ') === 'AM' ? '오전' : '오후'}
                            {dateFns.format(value.end, 'h')}
                          </span>
                        </div>
                      </div>
                    )))()}
          </div>
        </div>
      </Popover>
      <Popover
        open={detailedSC === null ? false : true}
        anchorEl={detailedSC === null ? null : detailedSC.event}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
        onClose={() => setDetailedSC(null)}
      >
        <div
          className='calendar-detailedsc'
          style={{ borderTop: selectedDetailedSC !== null ? `5px solid ${selectedDetailedSC.color}` : null }}
        >
          <div className='calendar-detailedsc-content'>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
              }}
            >
              <strong>{selectedDetailedSC !== null ? selectedDetailedSC.nm : null}</strong>
            </div>
            {selectedDetailedSC !== null && props.info.currentUserCd !== selectedDetailedSC.user.userCd ? (
              <Link to={`/${selectedDetailedSC.user.userId}`}>
                <div style={{ display: 'flex', fontSize: '13px', alignItems: 'center' }}>
                  <div style={{ paddingRight: '5px' }}>from.</div>

                  <div className='group-post-user' style={{ marginLeft: '1px' }}>
                    <img alt={`${selectedDetailedSC.user.userId}`} src={selectedDetailedSC.user.userPic} />
                  </div>
                  <div style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                    {selectedDetailedSC.user.userId}({selectedDetailedSC.user.userNm})
                  </div>
                </div>
              </Link>
            ) : null}
            <div style={{ marginTop: '5px', fontSize: '12px', color: 'gray' }}>
              {selectedDetailedSC !== null
                ? dateFns.format(selectedDetailedSC.start, 'yyyy.MM.dd hh:mm') +
                  ' - ' +
                  dateFns.format(selectedDetailedSC.end, 'yyyy.MM.dd hh:mm')
                : null}
            </div>
            <div
              style={{
                marginTop: '5px',
                fontSize: '14px',
                width: '220px',
                whiteSpace: 'normal',
              }}
            >
              {selectedDetailedSC !== null ? selectedDetailedSC.ex : null}
            </div>
            <div
              style={{
                width: '100%',
                height: '80px',
                paddingTop: '3px',
                paddingBottom: '3px',
                overflowX: 'scroll',
                overflowY: 'hidden',
              }}
            >
              <div style={{ display: 'flex' }}>
                {selectedDetailedSC !== null
                  ? selectedDetailedSC.members.map((value, index) => (
                      <div key={`${value.userCd}-${index}`}>
                        <img
                          style={{
                            width: '40px',
                            height: '40px',
                            marginRight: '4px',
                            objectFit: 'cover',
                            borderRadius: '20%',
                            border: value.scheduleState ? `3px solid ${selectedDetailedSC.color}` : null,
                          }}
                          src={value.userPic}
                        />
                        <div>{detailedSC === null ? null : value.userNm}</div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          {selectedDetailedSC !== null &&
          (type === 0 || type === 2 || type === 3) &&
          props.info.currentUserCd === selectedDetailedSC.user.userCd ? (
            <div className='calendar-detailedsc-buttons'>
              <div className='calendar-detailedsc-buttons-button' onClick={() => setScheduleEditOpen(true)}>
                <CreateIcon fontSize='small' />
                수정
              </div>
              {scheduleEditOpen === true ? (
                <CalendarScheduleEdit
                  groupCd={type === 2 || type === 3 ? props.info.groupCd : undefined}
                  userCd={type === 0 ? props.info.userCd : props.info.currentUserCd}
                  userInfo={type === 0 ? props.info : null}
                  info={selectedDetailedSC}
                  clickTab={props.clickTab}
                  tabInfo={props.tabInfo}
                  onModify={(data) => {
                    const copyUserDate = userDate.slice();
                    for (let i = 0; i < copyUserDate.length; i++) {
                      if (copyUserDate[i].cd === data.cd) {
                        copyUserDate[i] = data;
                        break;
                      }
                    }
                    setAlert(
                      <SnackBar
                        severity='success'
                        content='일정수정 완료'
                        onClose={() => setAlert(null)}
                        duration={1000}
                      />
                    );
                    setUserDate(copyUserDate);
                    setScheduleEditOpen(false);
                  }}
                  onCancel={() => setScheduleEditOpen(false)}
                />
              ) : null}
              <div
                style={{
                  background: '#e5e5e5',
                  width: '1px',
                  height: '14px',
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  marginTop: '7px',
                }}
              />
              <div
                className='calendar-detailedsc-buttons-button'
                onClick={async () => {
                  setAlert(<SnackBar severity='info' content='일정 삭제중...' duration={999999} />);
                  try {
                    console.log(selectedDetailedSC.cd);
                    await axios.delete(`/schedule/${selectedDetailedSC.cd}`);
                    setUserDate(userDate.filter((value) => value.cd !== selectedDetailedSC.cd));
                    setDetailedSC(null);
                    setAlert(
                      <SnackBar
                        severity='success'
                        content='일정이 삭제되었습니다.'
                        duration={1000}
                        onClose={() => setAlert(null)}
                      />
                    );
                  } catch (error) {
                    setAlert(<SnackBar severity='error' content={error} onClose={() => setAlert(null)} />);
                  }
                }}
              >
                <DeleteIcon fontSize='small' />
                삭제
              </div>
            </div>
          ) : null}
        </div>
      </Popover>
      {clickDate !== null ? (
        <AddSchedule
          type={props.type}
          data={props.info}
          clickTab={props.clickTab}
          tabInfo={props.tabInfo}
          onClose={() => setClickDate(null)}
          clickDate={clickDate}
          onSuccess={(newSc) => {
            setClickDate(null);
            onAddUserDate(newSc);
            props.onSuccessAlert();
          }}
        />
      ) : null}
      {alert}
    </div>
  );
};

export default Calendar;
