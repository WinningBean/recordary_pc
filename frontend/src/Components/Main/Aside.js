import React, { useState, useEffect } from 'react';
import './mainPage.css';
import * as dateFns from 'date-fns';
import Popover from '@material-ui/core/Popover';

import axios from 'axios';

const Aside = (props) => {
  const [user, setUser] = useState({
    ...props.data,
  });

  const [todaySchedule, setTodaySchedule] = useState(null);

  const [clickSchedule, setClickSchedule] = useState(null);

  const getTodaySchedule = async () => {
    var { data } = await axios.get(`/schedule/today?userCd=${props.data.userCd}`);
    console.log(data);
    setTodaySchedule(data);
  };

  useEffect(() => {
    getTodaySchedule();
  }, []);

  return (
    <aside>
      <div className='aside-profile'>
        <div className='timeline-profile'>
          <img alt='user-img' src={user.userPic} />
        </div>
        <div className='aside-profile-info'>
          <div className='aside-profile-name'>
            {user.userId}({user.userNm})
          </div>
          <div className='aside-profile-statusMsg'>
            {user.userEx}
            {/* {user.userEx.split('\n').map((line) => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })} */}
          </div>
          <div className='aside-profile-TodaySchedule'>
            <hr />
            <div>Today's schedule</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(20, 81, 51,.7)',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                }}
              />
              <span style={{ paddingLeft: '5px' }}>내 일정</span>
              <span
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'tomato',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                }}
              />
              <span style={{ paddingLeft: '5px' }}>그룹</span>
              <span
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'dodgerblue',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                }}
              />
              <span style={{ paddingLeft: '5px' }}>참여 일정</span>
            </div>
            <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>
              {todaySchedule !== null
                ? todaySchedule.map((value, index) => {
                    return (
                      <li
                        className='hover'
                        key={`today-schedule-${index}`}
                        style={{ position: 'relative' }}
                        onClick={(e) => setClickSchedule({ value: value, event: e.currentTarget })}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: '0',
                            top: '7px',
                            backgroundColor:
                              value.scheduleInWhere === 0
                                ? 'rgba(20, 81, 51,.7)'
                                : value.scheduleInWhere === 1
                                ? 'tomato'
                                : 'dodgerblue',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                          }}
                        />
                        <span style={{ paddingLeft: '7px', cursor: 'pointer', userSelect: 'none' }}>
                          {value.scheduleNm}
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
      <Popover
        open={Boolean(clickSchedule)}
        anchorEl={clickSchedule === null ? null : clickSchedule.event}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
        onClose={() => setClickSchedule(null)}
      >
        <div
          className='calendar-detailedsc'
          style={{ borderTop: clickSchedule !== null ? `5px solid ${clickSchedule.value.scheduleCol}` : null }}
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
              <strong>{clickSchedule !== null ? clickSchedule.value.scheduleNm : null}</strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px', color: 'gray' }}>
              {clickSchedule !== null
                ? dateFns.format(new Date(clickSchedule.value.scheduleStr), 'yyyy.MM.dd hh:mm') +
                  ' - ' +
                  dateFns.format(new Date(clickSchedule.value.scheduleEnd), 'yyyy.MM.dd hh:mm')
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
              {clickSchedule !== null ? clickSchedule.value.scheduleEx : null}
            </div>
          </div>
        </div>
      </Popover>
    </aside>
  );
};

export default Aside;
