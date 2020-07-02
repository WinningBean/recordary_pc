import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import GroupMemberSearch from '../Group/GroupMemberSearch';

import axios from 'axios';

const AddChattingRoom = ({ userCd }) => {
  const [isClickButton, setIsClickButton] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const createRoom = (userCd, targetCd, groupCd) => {
    // 그룹 채팅일경우에는 groupCd만 보내줌
    axios
      .post('/room/create', {
        userCd: userCd,
        tergetCd: targetCd,
        groupCd: groupCd,
      })
      .then(({ data }) => {
        console.log('roomCd : ', data);
      });
  };

  return (
    <div className='transition-all chatting-list' style={{ transform: 'translateX(0)', opacity: '100%' }}>
      <div
        style={{
          height: '20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        채팅방 생성
      </div>
      <div
        style={{
          height: '60%',
          margin: '0px 14px',
          border: '1px solid #eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selectedUser !== null ? (
          <div style={{ display: 'relative', width: '50%', height: 'fit-content' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={selectedUser.userPic}
              alt={`${selectedUser.userNm} img`}
            />
            <div style={{ display: 'absolute', bottom: '0', textAlign: 'center' }}>{selectedUser.userNm}</div>
          </div>
        ) : (
          <Button
            onClick={() => {
              setIsClickButton(true);
            }}
            variant='outlined'
          >
            추가
          </Button>
        )}
      </div>
      <div className='flex-center' style={{ height: '20%', justifyContent: 'space-evenly' }}>
        <Button
          disabled={selectedUser === null ? true : false}
          color='primary'
          variant='contained'
          size='large'
          onClick={() => {
            createRoom(userCd, selectedUser.userCd);
          }}
        >
          생성
        </Button>
        <Button color='secondary' variant='contained' size='large'>
          취소
        </Button>
      </div>
      {isClickButton ? (
        <GroupMemberSearch
          type={1}
          onSelect={(value) => {
            setSelectedUser(value);
          }}
          onCancel={() => setIsClickButton(false)}
        />
      ) : null}
    </div>
  );
};

export default AddChattingRoom;
