import React, { useState } from 'react';
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
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const userDate = [
        {
            start: '2020-03-02',
            end: '2020-03-06'
        },
        {
            start: '2020-03-04',
            end: '2020-03-08'
        },
        {
            start: '2020-03-12',
            end: '2020-03-16'
        },
        {
            start: '2020-03-13',
            end: '2020-03-13'
        },
        {
            start: '2020-03-22',
            end: '2020-03-23'
        },
        {
            start: '2020-03-23',
            end: '2020-03-28'
        }
    ];

    const Header = () => {
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
                    {dateFns.format(dateFns.addDays(startDate, i), 'EEEE')}
                </div>
            );
        }

        return <div className='wrap-days'>{days}</div>;
    };

    const Cells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, 'd');
                const cloneDay = day;
                console.log(day);
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
            }
            rows.push(
                <div className='cell-row' key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return (
            <div className='wrap-cells'>
                {rows}
                {Schedual()}
            </div>
        );
    };

    const Schedual = () => {
        const sc = [];
        sc.push(
            <div
                style={{
                    position: 'absolute',
                    width: '85px',
                    height: '0',
                    top: `${74 * 0 + 18}px`,
                    left: `${85 * 3}px`
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        // width: '69px',
                        // height: '24px',
                        lineHeight: '24px',
                        margin: '0 8px'
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
                        발닦고 잠자기
                    </span>
                </div>
            </div>
        );
        sc.push(
            <div
                style={{
                    position: 'absolute',
                    width: `${85 * 3}px`,
                    height: '0',
                    top: `${74 * 0 + 18}px`,
                    left: `${85 * 4}px`
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        // width: '69px',
                        // height: '24px',
                        lineHeight: '24px',
                        margin: '0 8px'
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
                            borderLeft: '2px solid #9e5fff'
                        }}
                    >
                        3일간 이어지는 일정
                    </span>
                </div>
            </div>
        );

        return sc;
    };

    return (
        <div className='calendar'>
            {Header()}
            {Days()}
            {Cells()}
        </div>
    );
};

export default Calendar;

//인터벌 사용
// if (
//     // start == day 일시 반영안됨
//     dateFns.isWithinInterval(day, {
//         start: Date.parse(userDate.start),
//         end: Date.parse(userDate.end)
//     })
// ) {
//     console.log('kk');
//     return (
//         <div
//             style={{
//                 marginTop: '14px',
//                 height: '14px',
//                 backgroundColor: 'rgba(0,0,125,0.4)'
//             }}
//         />
//     );
// }
