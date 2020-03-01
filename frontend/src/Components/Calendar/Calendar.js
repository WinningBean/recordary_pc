import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import { makeStyles, styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';

const SideButton = styled(Button)({
    minWidth: '40px',
    height: '75px'
});

const useStyles = makeStyles(theme => ({
    calendar: {
        position: 'relative',
        width: '595px',
        height: '475px',
        backgroundColor: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd'
    },
    headerCenter: {
        width: '515px',
        height: '75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    wrapDays: {
        display: 'flex',
        height: '30px',
        fontSize: '10px',
        textTransform: 'uppercase',
        borderBottom: '1px solid #ddd'
    },
    day: {
        display: 'flex',
        paddingTop: '3px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85px',
        color: '#777'
    },
    cellRow:{
        display:'flex',
        height:'74px',
        borderBottom: '1px solid #ddd'
    },
    cell:{
        height:'74px',
        width:'85px',
        borderRight: '1px solid #ddd'
    },
    disabledCell:{
        height:'74px',
        width:'85px',
    },
    selectedCell:{
        height:'74px',
        width:'85px',
    }
}));

// 600x475
const Calendar = props => {
    const classes = useStyles();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const Header = () => {
        return (
            <div className={classes.header}>
                <div className={classes.headerSide}>
                    <SideButton>
                        <LeftIcon />
                    </SideButton>
                </div>
                <div className={classes.headerCenter}>
                    <span>{dateFns.format(currentMonth, 'MMM yyyy')}</span>
                </div>
                <div className={classes.headerSide}>
                    <SideButton>
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
                <div className={classes.day} key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), 'EEEE')}
                </div>
            );
        }

        return <div className={classes.wrapDays}>{days}</div>;
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
                days.push(
                    <div
                        className={
                            !dateFns.isSameMonth(day, monthStart)
                                ? classes.disabledCell
                                : dateFns.isSameDay(day, selectedDate)
                                ? classes.selectedCell
                                : classes.cell
                        }
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
                <div className={classes.cellRow} key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className='calendar-body'>{rows}</div>;
    };

    return (
        <div className={classes.calendar}>
            {Header()}
            {Days()}
            {Cells()}
        </div>
    );
};

export default Calendar;
