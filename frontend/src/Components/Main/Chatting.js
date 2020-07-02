import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { format, isSameDay } from 'date-fns';

import SnackBar from '../UI/Snackbar';
import AlertDialog from '../Other/AlertDialog';

import AddChattingRoom from './AddChattingRoom';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import CircularProgress from '@material-ui/core/CircularProgress';

import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

import axios from 'axios';

function isEmptyObject(param) {
  return Object.keys(param).length === 0;
}

const Chatting = ({ isOpen, user }) => {
  const [searchText, setSearchText] = useState('');
  const [writedMessage, setWritedMessage] = useState('');
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(undefined);
  const [isAddChatRoom, setIsAddChatRoom] = useState(false);
  const chatListRef = React.createRef();
  const [reload, setReload] = useState(false);
  const [alert, setAlert] = useState(null);

  const [info, setInfo] = useImmer(undefined);
  const [client, setClient] = useState(null);

  console.log(info);

  const setWebSock = (data) => {
    var sock = new SockJs('/ws-stomp');
    var client = Stomp.over(sock);
    client.connect({}, function () {
      data.forEach((value) => {
        if (value.isGroup) {
          client.subscribe(`/queue/chat/${value.roomCd}`, function (response) {
            setInfo((draft) => {
              const json = JSON.parse(response.body);
              const index = draft.findIndex((object) => object.roomCd === value.roomCd);
              if (draft[index].chatList === null) {
                console.log('draft');
              } else {
                draft[index].chatList.push(json);
              }
              ++draft[index].noticeCount;
              draft[index].lastChat = json.content;
            });
          });
        } else {
          client.subscribe(`/topic/chat/${value.roomCd}`, function (response) {
            console.log(value.roomCd);
            setInfo((draft) => {
              const json = JSON.parse(response.body);
              const index = draft.findIndex((object) => object.roomCd === value.roomCd);
              if (draft[index].chatList === null) {
                console.log('draft');
              } else {
                draft[index].chatList.push(json);
              }
              ++draft[index].noticeCount;
              draft[index].lastChat = json.content;
            });
          });
        }
      });
    });
    setClient(client);
  };

  const getInfo = () => {
    axios.get(`/room/list/${user.userCd}`).then(({ data }) => {
      console.log(data, 'real data');
      setInfo((draft) => (draft = data.map((value) => ({ ...value, noticeCount: 0 }))));
      setWebSock(data);
    });
  };

  const getChatList = async (roomCd, index) => {
    const { data } = await axios.post(`/room/enter/${roomCd}`);
    console.log(data, 'is list data');
    setInfo((draft) => {
      draft[index].chatList = data;
    });
  };

  const deleteRoom = (roomCd) => {
    setAlert(
      <AlertDialog
        severity='info'
        content='정말 채팅을 삭제하시겠습니까?'
        onAlertClose={() => setAlert(null)}
        onAlertSubmit={() => {
          axios.delete(`/room/${roomCd}`).then(() => {
            setInfo((draft) => {
              const index = draft.findIndex((value) => value.roomCd === roomCd);
              draft.splice(index, 1);
              setAlert(
                <SnackBar
                  severity='info'
                  content='삭제완료'
                  duration={3000}
                  onClose={() => {
                    setAlert(null);
                  }}
                />
              );
              setSelectedRoomIndex(undefined);
            });
          });
        }}
      />
    );
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (chatListRef.current !== null) {
      console.log('pass');
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight - chatListRef.current.clientHeight;
    }
  }, [chatListRef]);

  const listView = () => {
    const copyChatList =
      searchText === '' ? [...info] : info.filter((value) => new RegExp(searchText, 'i').exec(value.targetNm));
    return copyChatList.map((value, index) => {
      return (
        <div
          key={value.roomCd}
          className='chatting-cell'
          style={{
            height: '60px',
            display: 'flex',
            paddingLeft: '10px',
          }}
          onClick={() => {
            if (info[index].chatList === null) {
              getChatList(value.roomCd, index);
            }
            setInfo((draft) => {
              draft[index].noticeCount = 0;
            });
            setSelectedRoomIndex(index);
          }}
        >
          <div
            style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
          >
            <img
              src={value.targetPic}
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
            {value.noticeCount === 0 ? null : (
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  right: '3px',
                  backgroundColor: 'red',
                  color: 'white',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  textAlign: 'center',
                }}
              >
                {value.noticeCount}
              </div>
            )}
          </div>
          <div
            style={{
              flex: '6',
              paddingLeft: '10px',
            }}
          >
            <div style={{ paddingTop: '12px', fontWeight: 'bold' }}>{value.targetNm}</div>
            <div
              style={{
                paddingTop: '6px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {value.lastChat}
            </div>
          </div>
        </div>
      );
    });
  };

  const sendMessage = (e) => {
    if (writedMessage === '') return null;
    const dom = document.getElementById('chat-input');
    dom.disabled = true;
    console.log({
      roomCd: info[selectedRoomIndex].roomCd,
      userCd: user.userCd,
      userNm: user.userNm,
      content: writedMessage,
    });
    axios
      .post('/chat/sendMessage', {
        roomCd: info[selectedRoomIndex].roomCd,
        userCd: user.userCd,
        userNm: user.userNm,
        content: writedMessage,
      })
      .then(() => {
        const dom = document.getElementById('chat-input');
        dom.disabled = false;
        dom.value = '';
        dom.focus();
        // setInfo((draft) => {
        //   // var copyMessage = writedMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
        //   draft[selectedRoomIndex].chatList.push({
        //     sendUser: user,
        //     content: writedMessage,
        //     crateChat: new Date(),
        //   });
        // });
      })
      .catch(() => {
        dom.disabled = false;
      })

      .finally(() => {
        setWritedMessage('');
      });
  };

  // useMemo(() => (

  // ), []);

  const chatListView = () => {
    return (
      <div
        className='transition-all chatting-list'
        style={
          selectedRoomIndex === undefined
            ? { transform: 'translateX(100%)', opacity: 0 }
            : { transform: 'translateX(0)', opacity: '100%' }
        }
      >
        {selectedRoomIndex === undefined ? null : (
          <>
            <div
              style={{
                height: '10%',
                display: 'flex',
                backgroundColor: '#40739e',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <div
                style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}
                onClick={() => {
                  const saveSelectedRoomIndex = selectedRoomIndex;
                  setInfo((draft) => {
                    draft[saveSelectedRoomIndex].noticeCount = 0;
                  });
                  setSelectedRoomIndex(undefined);
                }}
              >
                <ArrowBackIcon style={{ marginLeft: '10px' }} />
              </div>
              <div
                style={{
                  flex: '6',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '5px',
                }}
              >
                <img
                  src={info[selectedRoomIndex].targetPic}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', padding: '5px' }}
                />
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', paddingLeft: '6px' }}>
                  {info[selectedRoomIndex].targetNm}
                </span>
              </div>
              <div
                className='flex-center'
                style={{ flex: '1', color: 'white', cursor: 'pointer', marginRight: '5px' }}
                onClick={() => {
                  deleteRoom(info[selectedRoomIndex].roomCd);
                }}
              >
                <DeleteIcon fontSize='default' />
              </div>
            </div>
            <div style={{ height: '90%', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  height: '85%',
                  backgroundColor: 'rgba(226, 226, 226, 0.1)',
                  overflowY: 'scroll',
                }}
                ref={chatListRef}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100%' }}
                >
                  {/* {()=> {
                    for(let i = 0; value.message.length; i++){
                      if(value.message[i].date !== value.message[i+1].date){
                        return(<div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ backgroundColor: 'rgba(64, 115, 158,0.6)', color: 'white' }}>
                          {format(chatList.date, 'yyyy-MM-dd')}
                        </div>
                      </div>
                      )
                      }
                    }
                  }} */}
                  {info[selectedRoomIndex].chatList === null ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ) : (
                    info[selectedRoomIndex].chatList.map((val, index) => {
                      var isMyMessage = val.sendUser.userCd === user.userCd ? true : false;
                      return isMyMessage ? (
                        <div
                          key={`chatList-${info[selectedRoomIndex].roomCd}-${index}`}
                          style={{
                            margin: '5px 10px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-end',
                              paddingTop: '13px',
                              paddingRight: '2px',
                              color: '#40739e',
                            }}
                          >
                            {/* {isSameDay(new Date(), val.date)
                            ? format(val.date, 'a') === 'AM'
                              ? '오전'
                              : '오후' + format(val.date, 'h:mm')
                            : `${format(val.date, 'yyyy-MM-dd')} ${
                                format(val.date, 'a') === 'AM' ? '오전' : '오후'
                              } ${format(val.date, 'h:mm')}`} */}
                          </div>
                          <div
                            style={{
                              padding: '7px 15px',
                              maxWidth: '70%',
                              backgroundColor: 'rgba(64, 115, 158,0.2)',
                              borderRight: '4px solid rgba(64, 115, 158,1.0)',
                              // borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              overflowWrap: 'break-word',
                            }}
                          >
                            {val.content}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`${info[selectedRoomIndex].roomCd}-${index}`}
                          style={{ margin: '5px 10px', display: 'flex', justifyContent: 'flex-start' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              padding: '7px 15px',
                              maxWidth: '70%',
                              backgroundColor: '#eee',
                              borderLeft: '4px solid #aaa',
                              // borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              overflowWrap: 'break-word',
                            }}
                          >
                            {val.content}
                          </div>
                          <div
                            style={{
                              alignItems: 'flex-end',
                              paddingTop: '13px',
                              paddingLeft: '2px',
                              color: '#938a8a',
                            }}
                          >
                            {/* {isSameDay(new Date(), val.date)
                            ? format(val.date, 'a') === 'AM'
                              ? '오전'
                              : '오후' + format(val.date, 'h:mm')
                            : `${format(val.date, 'yyyy-MM-dd')} ${
                                format(val.date, 'a') === 'AM' ? '오전' : '오후'
                              } ${format(val.date, 'h:mm')}`} */}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div
                style={{
                  height: '15%',
                  borderTop: '1px solid #eee',
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomLeftRadius: '5px',
                  borderBottomRightRadius: '5px',
                }}
              >
                <textarea
                  id='chat-input'
                  autoFocus={true}
                  onChange={(e) => setWritedMessage(e.target.value)}
                  style={{
                    resize: 'none',
                    width: '75%',
                    height: '80%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                  }}
                  onKeyPress={(e) => {
                    if (!e.shiftKey) {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                      }
                    }
                  }}
                ></textarea>
                <div
                  style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={sendMessage}
                >
                  <SubdirectoryArrowLeftIcon />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const ffffffff = () => {
    setTimeout(() => {
      if (client === null || client.connected === false) {
        ffffffff();
      }
      setReload(!reload);
    }, 5000);
  };
  if (client === null || client.connected === false) {
    ffffffff();
  }
  return (
    <div
      className='transition-all chatting-wrap'
      style={
        isOpen
          ? {
              opacity: '100%',
              transform: 'translateX(0)',
              width: '300px',
              height: '550px',
              boxShadow: `0px 1px 5px rgba(161, 159, 159, 0.8)`,
            }
          : {
              opacity: 0,
              transform: 'translateX(300px)',
              width: '300px',
              height: '550px',
              overflow: 'hidden',
            }
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          height: '55px',
          borderBottom: '1px solid lightgray',
          fontSize: '20px',
          backgroundColor: '#40739e',
          boxShadow: '0px 1px 5px lightgrey',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          color: 'white',
          position: 'relative',
        }}
        onClick={() => {
          console.log(client);
          console.log(client.subscriptions);
        }}
      >
        Chatting
      </div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '55px',
          width: '55px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={() => setIsAddChatRoom(true)}
      >
        <AddIcon/>
      </div>
      <div style={{ height: '7%', backgroundColor: '#fff', display: 'flex', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0px 5px 0px 10px' }}>
          <SearchIcon />
        </div>
        <input
          placeholder='검색'
          style={{ border: 'none', width: '100%', fontSize: '16px' }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {info === undefined ? (
        <div>채팅 리스트가 없습니다</div>
      ) : (
        <div style={{ display: 'flex', height: '85%', flexDirection: 'column' }}>{listView()}</div>
      )}
      {selectedRoomIndex === undefined ? null : chatListView()}
      {isAddChatRoom ? (
        <AddChattingRoom
          info={info}
          userCd={user.userCd}
          onClose={() => setIsAddChatRoom(false)}
          onCreate={() => {
            if (client.connected) {
              client.disconnect(() => {
                getInfo();
                setIsAddChatRoom(false);
              });
            } else {
              client.abort();
              getInfo();
              setIsAddChatRoom(false);
            }
          }}
          onFull={() => {
            setIsAddChatRoom(false);
            setAlert(
              <SnackBar
                severity='info'
                content='이미 존재하는 채팅방입니다.'
                duration={6000}
                onClose={() => {
                  setAlert(null);
                }}
              />
            );
          }}
        />
      ) : null}
      {alert}
      {client === null || client.connected === false ? (
        <div className='flex-center loading' style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>연결중입니다...</span>
        </div>
      ) : null}
    </div>
  );
};

export default Chatting;
