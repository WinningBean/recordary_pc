import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonIcon from '@material-ui/icons/Person';
import { format } from 'date-fns';

function TimelineOneDay({ title, ex, startDay, endDay }) {
  return (
    <>
      <div
        style={{
          flex: 1,
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          borderBottom: '1px solid rgb(229, 229, 229)'
        }}
      >
        {title}
      </div>
      <div style={{ flex: 3, height: '150px', display: 'flex', paddingTop: '8px' }}>{ex}</div>
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
          <span style={{ fontWeight: 'bold' }}>{format(startDay, 'yyyy.M.d EEE h:mm a')}</span>
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
          <span style={{ fontWeight: 'bold' }}>{format(endDay, 'yyyy.M.d EEE h:mm a')}</span>
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
  );
}

export default TimelineOneDay;
