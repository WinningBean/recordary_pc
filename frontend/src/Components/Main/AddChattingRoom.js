import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import GroupMemberSearch from '../Group/GroupMemberSearch';

import axios from 'axios';

const AddChattingRoom = ({ info, userCd, onClose, onCreate, onFull }) => {
  const [isClickUserButton, setIsClickUserButton] = useState(false);
  const [isClickGroupButton, setIsClickGroupButton] = useState(false);
  const [myGroupList, setMyGroupList] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const createRoom = (userCd, targetCd, groupCd) => {
    // 그룹 채팅일경우에는 groupCd만 보내줌
    const isExist = info.findIndex((value) => value.isGroup === false && value.targetCd === targetCd);
    console.log(isExist, info);
    if (isExist !== -1) {
      onFull();
      return;
    }
    if (groupCd === undefined) {
      axios
        .post('/room/create', {
          userCd: userCd,
          targetCd: targetCd,
          groupCd: groupCd,
        })
        .then(() => {
          onCreate();
        });
    } else {
      axios
        .post('/room/create', {
          userCd: userCd,
          targetCd: targetCd,
          groupCd: groupCd,
        })
        .then(() => {
          onCreate();
        });
    }
  };

  const getMyGroupList = () => {
    axios.get(`/room/check/groupChat/${userCd}`).then(({ data }) => {
      setMyGroupList(data);
    });
  };

  return (
    <div className='transition-all chatting-list' style={{ transform: 'translateX(0)', opacity: '100%' }}>
      <div
        style={{
          height: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        채팅방 생성
      </div>
      <div
        style={{
          height: '20%',
          margin: '0px 14px',
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
        ) : selectedGroup !== null ? (
          <div style={{ display: 'relative', width: '50%', height: 'fit-content' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={selectedGroup.groupPic}
              alt={`${selectedGroup.groupNm} img`}
            />
            <div style={{ display: 'absolute', bottom: '0', textAlign: 'center' }}>{selectedGroup.groupNm}</div>
          </div>
        ) : (
          <>
            <Button
              onClick={() => {
                setIsClickUserButton(true);
              }}
              variant='outlined'
              style={{marginRight: '10px'}}
            >
              유저 추가
            </Button>
            <Button
              onClick={() => {
                getMyGroupList();
                setIsClickGroupButton(true);
              }}
              variant='outlined'
            >
              그룹 추가
            </Button>
          </>
        )}
      </div>
      <div className='flex-center' style={{ height: '40%', justifyContent: 'space-evenly' }}>
        <Button
          disabled={selectedUser === null && selectedGroup === null}
          color='primary'
          variant='contained'
          size='large'
          onClick={() => {
            if (selectedUser !== null) {
              createRoom(userCd, selectedUser.userCd);
            } else {
              createRoom(undefined, undefined, selectedGroup.groupCd);
            }
          }}
        >
          생성
        </Button>
        <Button color='secondary' variant='contained' size='large' onClick={() => onClose()}>
          취소
        </Button>
      </div>
      {isClickUserButton ? (
        <GroupMemberSearch
          type={1}
          onSelect={(value) => {
            setSelectedUser(value);
          }}
          onCancel={() => setIsClickUserButton(false)}
        />
      ) : null}
      <Dialog open={isClickGroupButton} onClose={() => setIsClickGroupButton(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '6px 8px',
            maxHeight: '600px',
          }}
        >
          {myGroupList === null ? (
            <span style={{ color: '#999' }}>그룹 목록 가져오는중...</span>
          ) : (
            myGroupList.map((value, index) => {
              return (
                <div
                  onClick={() => {
                    setIsClickGroupButton(false);
                    setSelectedGroup(value);
                  }}
                  key={`groupList-${index}`}
                  style={{
                    height: '60px',
                    padding: '0px 2px',
                    display: 'flex',
                    borderBottom: '1px solid #eee',
                    padding: '5px 0',
                  }}
                >
                  <img
                    style={{
                      boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.8)',
                      height: '50px',
                      width: '50px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                    src={value.groupPic}
                    alt={`${value.groupNm} img`}
                  />
                  <div
                    style={{
                      flex: 1,
                      paddingLeft: '18px',
                      fontWeight: 'bold',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span>{value.groupNm}</span>
                    <span style={{ fontWeight: 'normal', paddingLeft: '4px' }}>{value.groupEx}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AddChattingRoom;
