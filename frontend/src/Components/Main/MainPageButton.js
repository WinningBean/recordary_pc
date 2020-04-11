import React, { useState } from 'react';
import './mainPage.css';
import ChattingButton from '../Other/ChattingButton';
import SpeedDials from '../UI/SimpleSpeedDial';
import Chatting from './Chatting';

const MainPageButton = () => {
  const [isChatClick, setIsChatClick] = useState(false);
  console.log(isChatClick);
  return (
    <div>
      <div className='timeline-plus-button'>
        <SpeedDials />
      </div>
      <div className='timeline-chatting-button'>
        <Chatting isOpen={isChatClick} />
        <div onClick={() => setIsChatClick(!isChatClick)}>
          <ChattingButton />
        </div>
      </div>
    </div>
  );
};

export default MainPageButton;
