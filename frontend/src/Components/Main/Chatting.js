import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { format, isSameDay } from 'date-fns';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

const Chatting = ({ isOpen }) => {
  const [searchText, setSearchText] = useState('');
  const [writedMessage, setWritedMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(undefined);
  const textareaRef = React.createRef();
  const chatListRef = React.createRef();

  console.log(writedMessage);

  useEffect(() => {
    if (chatListRef.current !== null) {
      console.log('pass');
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight - chatListRef.current.clientHeight;
    }
  }, [chatListRef]);

  const [chatList, setChatList] = useImmer([
    {
      id: 'abcd1234',
      nm: '홍길동',
      content: 'ABCDEFGHIJKLMNOPQRX ABCDE',
      date: new Date('2020-03-25'),
      pic: 'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date('2020-03-28'),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: false,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
        {
          ex: 'hello world',
          date: new Date(),
          isMyMessage: true,
        },
      ],
      isLogin: true,
    },
    {
      id: '142213',
      nm: '김길동',
      content: 'Hello World',
      date: new Date('2020-03-26'),
      pic: 'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: false,
    },
    {
      id: '64315',
      nm: '위길동',
      content: 'ABCDEFG',
      date: new Date('2020-03-27'),
      pic: 'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: true,
    },
    {
      id: '73453',
      nm: 'Pablo Fornals',
      content: 'OK see you later',
      date: new Date(),
      pic: 'https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg',
      message: [
        {
          ex: 'hello world',
          date: new Date(),
        },
      ],
      isLogin: true,
    },
  ]);

  const listView = () => {
    const copyChatList =
      searchText === '' ? [...chatList] : chatList.filter((value) => new RegExp(searchText, 'i').exec(value.nm));
    return copyChatList.map((value) => {
      return (
        <div
          key={value.nm}
          className='chatting-cell'
          style={{
            height: '60px',
            display: 'flex',
            borderLeft: value.isLogin ? '5px solid #40739e' : 'none',
            paddingLeft: value.isLogin ? '5px' : '10px',
          }}
          onClick={() => setSelectedUser(value.id)}
        >
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={value.pic} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <div
            style={{
              flex: '6',
              paddingLeft: '5px',
            }}
          >
            <div style={{ paddingTop: '10px', fontWeight: 'bold' }}>{value.nm}</div>
            <div
              style={{
                paddingTop: '5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {value.content}
            </div>
          </div>
        </div>
      );
    });
  };

  const sendMassge = (e) => {
    if (writedMessage === '') return null;
    setChatList((draft) => {
      var value = undefined;
      for (let i = 0; i < draft.length; i++) {
        if (draft[i].id === selectedUser) {
          value = draft[i];
          break;
        }
      }
      // var copyMessage = writedMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
      value.message.push({
        ex: writedMessage,
        date: new Date(),
        isMyMessage: true,
      });
    });
    textareaRef.current.focus();
    textareaRef.current.value = '';
    setWritedMessage('');
  };

  const chatListView = () => {
    var value = undefined;
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].id === selectedUser) {
        value = chatList[i];
        break;
      }
    }

    return (
      <div
        className='transition-all chatting-list'
        style={selectedUser === undefined ? { width: '0' } : { width: '100%' }}
      >
        {selectedUser === undefined || value === undefined ? null : (
          <>
            <div
              style={{
                height: '10%',
                display: 'flex',
                backgroundColor: '#910033',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <div
                style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}
                onClick={() => setSelectedUser(undefined)}
              >
                <ArrowBackIcon fontSize='large' />
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
                  src={value.pic}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', padding: '5px' }}
                />
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', paddingLeft: '6px' }}>
                  {value.nm}
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
                  {value.message.map((val, index) => {
                    return val.isMyMessage ? (
                      <div
                        key={`${value.id}-${index}`}
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
                            color: '#938a8a',
                          }}
                        >
                          {isSameDay(new Date(), val.date)
                            ? format(val.date, 'a') === 'AM'
                              ? '오전'
                              : '오후' + format(val.date, 'h:mm')
                            : `${format(val.date, 'yyyy-MM-dd')} ${
                                format(val.date, 'a') === 'AM' ? '오전' : '오후'
                              } ${format(val.date, 'h:mm')}`}
                        </div>
                        <div
                          style={{
                            padding: '7px 15px',
                            maxWidth: '70%',
                            backgroundColor: 'rgba(245, 0, 87, 0.2)',
                            borderRight: '4px solid rgba(245, 0, 87, 1)',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {val.ex.split('\n').map((line) => {
                            return (
                              <span>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`${value.id}-${index}`}
                        style={{ margin: '5px 10px', display: 'flex', justifyContent: 'flex-start' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            padding: '7px 15px',
                            maxWidth: '70%',
                            backgroundColor: '#eee',
                            borderLeft: '4px solid #aaa',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {val.ex.split('\n').map((line) => {
                            return (
                              <span>
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
                          {isSameDay(new Date(), val.date)
                            ? format(val.date, 'a') === 'AM'
                              ? '오전'
                              : '오후' + format(val.date, 'h:mm')
                            : `${format(val.date, 'yyyy-MM-dd')} ${
                                format(val.date, 'a') === 'AM' ? '오전' : '오후'
                              } ${format(val.date, 'h:mm')}`}
                        </div>
                      </div>
                    );
                  })}
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
                        sendMassge();
                      }
                    }
                  }}
                ></textarea>
                <div
                  style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={sendMassge}
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
              top: `-${window.innerHeight * 0.75 + 20}px`,
              right: '-40px',
              width: `${window.innerWidth * 0.2}px`,
              height: `${window.innerHeight * 0.75}px`,
              boxShadow: `0px 1px 5px rgba(161, 159, 159, 0.8)`,
            }
          : {
              top: `-${window.innerHeight * 0.75 + 20}px`,
              right: '-40px',
              width: '0',
              height: `${window.innerHeight * 0.75}px`,
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
        }}
      >
        Chatting
      </div>
      <div style={{ height: '7%', backgroundColor: '#fff', display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center',margin:'0px 3px' }}>
          <SearchIcon />
        </div>
        <input
          placeholder='검색'
          style={{ border: 'none', width: '100%', fontSize: '16px' }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', height: '85%', flexDirection: 'column' }}>{listView()}</div>
      {chatListView()}
    </div>
  );
};

export default Chatting;
