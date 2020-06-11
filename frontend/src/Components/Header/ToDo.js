import React, { useState, useEffect } from 'react';

import { ChromePicker } from 'react-color';
import axios from 'axios';
import { TextField } from '@material-ui/core';

const ToDo = ({ open }) => {
  useEffect(() => {
    // axios.post('/toDo', {
    //   userCd : 15,
    //   toDoContent: new Date(),
    //   toDoEndDate: new Date(),
    //   toDoCol : '#444'
    // });
    const today = new Date().getHours();
    console.log(today);
    if (today >= 21) {
      setBgImage('https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844231_1280.png');
    } else if (today >= 18) {
      setBgImage('https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844231_1280.png');
    } else if (today >= 8) {
      setBgImage('https://github.com/CodeExplainedRepo/To-Do-List/blob/master/img/bg.jpg?raw=true');
    } else {
      setBgImage('https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844231_1280.png');
    }

    // const { data } = axios.get(`/toDo/15`);
  }, []);
  const [list, setList] = useState([
    { ex: 'Hello World', isPass: false },
    { ex: '일어나서 씻고 자기 공부하기', isPass: false },
    { ex: 'Hello World my name is react', isPass: true },
    { ex: '경기도 부천시 원미구 부천로 7번길 대표 송데이비드호섭', isPass: false },
  ]);
  const [bgImage, setBgImage] = useState(null);
  const [inputText, setInputText] = useState('');
  const [color, setColor] = useState(
    `#${parseInt(Math.random() * 255, 16)}${parseInt(Math.random() * 255, 16)}${parseInt(Math.random() * 255, 16)}`
  );
  const [isClickColor, setIsClickColor] = useState(false);
  return (
    <div
      className='todo-animation'
      style={{
        position: 'absolute',
        top: '50px',
        right: 0,
        height: '550px',
        width: '300px',
        boxShadow: '0px 0px 1px #0001',
        borderTopLeftRadius: '4%',
        borderTopRightRadius: '4%',
        display: 'flex',
        zIndex: '999',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1.15,
          paddingLeft: '10px',
          borderRadius: '15px 15px 0 0',
          backgroundColor: 'white',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          Wednesday, Mar 13
        </div>
      </div>
      <div style={{ flex: 3, backgroundColor: 'white' }}>
        {list.map((value, index) => {
          const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value.ex);
          var fontSize = undefined;
          if (isKorean) {
            const textLength = value.ex.length;
            if (textLength > 16) fontSize = 10;
            else if (textLength > 13) fontSize = 12;
            else if (textLength > 10) fontSize = 14;
            else if (textLength > 8) fontSize = 16;
          } else {
            const textLength = value.ex.length;
            if (textLength > 20) fontSize = 12;
            else if (textLength > 16) fontSize = 15;
            else if (textLength > 13) fontSize = 18;
            else if (textLength > 10) fontSize = 21;
            else if (textLength > 8) fontSize = 24;
          }
          return (
            <div
              key={`todo-${index}`}
              style={{
                height: '46px',
                borderBottom: '1px solid #eee',
                paddingLeft: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {value.isPass ? (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'limegreen',
                    }}
                  />
                ) : (
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid black' }} />
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  fontWeight: 'bold',
                  fontSize: `${fontSize}px`,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                }}
              >
                {value.ex}
              </div>
              <div style={{ width: '46px' }} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          height: '50px',
          width: '100%',
          borderTop: '1px solid #eee',
          display: 'flex',
        }}
      >
        <div style={{ width: '50px', padding: '4px 6px' }}>
          <div
            onClick={() => {
              setIsClickColor(!isClickColor);
            }}
            style={{
              backgroundColor: color,
              width: '100%',
              height: '100%',
              borderRadius: '5%',
              // boxShadow: '0px 0px 1px rgba(0,0,0,1)',
            }}
          />
          {isClickColor ? <ChromePicker color={color} onChange={(color) => setColor(color.hex)} /> : null}
        </div>
        <input
          placeholder='Add a To-do'
          style={{ paddingLeft: '6px', border: 'none', width: '100%', fontSize: '18px', fontWeight: 'bold' }}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setInputText('');
            }
          }}
        />
      </div>
    </div>
  );
};

export default ToDo;
