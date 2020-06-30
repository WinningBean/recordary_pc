import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { format, isSameDay } from 'date-fns';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import AddIcon from '@material-ui/icons/Add';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

import axios from 'axios';

const Chatting = ({ isOpen, user }) => {
  const [searchText, setSearchText] = useState('');
  const [writedMessage, setWritedMessage] = useState('');
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(undefined);
  const [isAddChatRoom, setIsAddChatRoom] = useState(false);
  const textareaRef = React.createRef();
  const chatListRef = React.createRef();

  const [info, setInfo] = useImmer(undefined);

  console.log(writedMessage);

  const getInfo = async () => {
    const { data } = await axios.get(`/room/list/${user.userCd}`);
    console.log(data, 'real data');
    setInfo((draft) => (draft = data));

    // var sock = new SockJs('/ws-stomp');
    // var client = Stomp.over(sock);
    // client.connect({}, function () {
    //   data.forEach((value) => {
    //     if (value.isGroup) {
    //       client.subscribe(`/queue/chat/${value.roomCd}`, function (response) {
    //         console.log(JSON.parse(response.body));
    //       });
    //     } else {
    //       client.subscribe(`/topic/chat/${value.roomCd}`, function (response) {
    //         console.log(JSON.parse(response.body));
    //       });
    //     }
    //   });
    // });
  };

  const getChatList = async (roomCd, index) => {
    const { data } = await axios.post(`/room/enter/${roomCd}`);
    console.log(data, 'is list data');
    setInfo((draft) => {
      draft[index].chatList = data;
    });
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
            setSelectedRoomIndex(index);
          }}
        >
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/15'}
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              flex: '6',
              paddingLeft: '5px',
            }}
          >
            <div style={{ paddingTop: '10px', fontWeight: 'bold' }}>{value.targetNm}</div>
            <div
              style={{
                paddingTop: '5px',
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

  const sendMessage = async (e) => {
    if (writedMessage === '') return null;
    textareaRef.current.disabled = true;
    console.log({
      roomCd: info[selectedRoomIndex].roomCd,
      userCd: user.userCd,
      userNm: user.userNm,
      content: writedMessage,
    });
    try {
      const data = await axios.post('/chat/sendMessage', {
        roomCd: info[selectedRoomIndex].roomCd,
        userCd: user.userCd,
        userNm: user.userNm,
        content: writedMessage,
      });
      console.log(data);
      textareaRef.current.disabled = false;
      textareaRef.current.focus();
      textareaRef.current.value = '';
      setInfo((draft) => {
        // var copyMessage = writedMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
        draft[selectedRoomIndex].chatList.push({
          sendUser: user,
          content: writedMessage,
          crateChat: new Date(),
        });
      });
      setWritedMessage('');
    } catch (error) {
      textareaRef.current.disabled = false;
      textareaRef.current.focus();
      console.error(error);
    }
  };

  const AddChatRoom = () => {
    return (
      <div
        className='transition-all chatting-list'
        style={
          !isAddChatRoom
            ? { transform: 'translateX(100%)', opacity: 0 }
            : { transform: 'translateX(0)', opacity: '100%' }
        }
      >
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
          <div style={{ display: 'relative', width: '50%', height: 'fit-content' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/group/basic.png'
              alt='이미지'
            />
            <div style={{ display: 'absolute', bottom: '0', textAlign: 'center' }}>김길동</div>
          </div>
        </div>
        <div className='flex-center' style={{ height: '20%', justifyContent: 'space-evenly' }}>
          <Button color='primary' variant='contained' size='large'>
            생성
          </Button>
          <Button color='secondary' variant='contained' size='large' onClick={() => setIsAddChatRoom(false)}>
            취소
          </Button>
        </div>
      </div>
    );
  };

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
                onClick={() => setSelectedRoomIndex(undefined)}
              >
                <ArrowBackIcon fontSize='large' style={{ marginLeft: '10px' }} />
              </div>
              <div
                style={{
                  flex: '7',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10px',
                }}
              >
                <img
                  src={'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/group/basic.png'}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', padding: '5px' }}
                />
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', paddingLeft: '6px' }}>
                  {info[selectedRoomIndex].targetNm}
                </span>
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
                            {val.content.split('\n').map((line, index) => {
                              return (
                                <span key={`content ${info[selectedRoomIndex].roomCd}-${line}-${index}`}>
                                  {line}
                                  <br />
                                </span>
                              );
                            })}
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
                            {val.content.split('\n').map((line) => {
                              return (
                                <span key={`content ${info[selectedRoomIndex].roomCd}-${line}-${index}`}>
                                  {line}
                                  <br />
                                </span>
                              );
                            })}
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
                  autoFocus={true}
                  ref={textareaRef}
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
          height: '10%',
          borderBottom: '1px solid lightgray',
          fontSize: '20px',
          backgroundColor: '#40739e',
          boxShadow: '0px 1px 5px lightgrey',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          color: 'white',
          position: 'relative',
        }}
      >
        Chatting
      </div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '64.72px',
          width: '64.72px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={() => setIsAddChatRoom(true)}
      >
        <AddIcon fontSize='large' />
      </div>
      <div style={{ height: '7%', backgroundColor: '#fff', display: 'flex', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0px 3px' }}>
          <SearchIcon />
        </div>
        <input
          placeholder='검색'
          style={{ border: 'none', width: '100%', fontSize: '16px' }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', height: '85%', flexDirection: 'column' }}>{listView()}</div>
      {info === undefined ? <div>채팅 리스트가 없습니다</div> : chatListView()}
      {AddChatRoom()}
    </div>
  );
};

export default Chatting;
