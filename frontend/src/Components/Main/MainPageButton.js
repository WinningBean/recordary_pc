import React, { useState } from 'react';
import './mainPage.css';
import ChattingButton from '../Other/ChattingButton';
import SpeedDials from '../UI/SimpleSpeedDial';
import Chatting from '../../Containers/Main/Chatting';

const MainPageButton = (props) => {
  const [isChatClick, setIsChatClick] = useState(false);
  return (
    <div>
      <div className='timeline-plus-button'>
        <SpeedDials data={props.data} groupList={props.groupList} />
      </div>
      <div className='timeline-chatting-button'>
        <Chatting isOpen={isChatClick} />
        <div onClick={() => setIsChatClick(!isChatClick)}>
          <ChattingButton style={{ backgroundColor: 'rgb(245, 0, 87)' }} />
        </div>
      </div>
    </div>
  );
};

export default MainPageButton;
