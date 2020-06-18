import React, { useState } from 'react';
import './mainPage.css';

const Aside = (props) => {
  const [user, setUser] = useState({
    ...props.data,
  });

  return (
    <aside>
      <div className='aside-profile'>
        <div className='timeline-profile'>
          <img alt='user-img' src={user.userPic} />
        </div>
        <div className='aside-profile-info'>
          <div className='aside-profile-name'>
            {user.userId}({user.userNm})
          </div>
          <div className='aside-profile-statusMsg'>{user.userEx}</div>
          <div className='aside-profile-TodaySchedule'>
            <hr />
            <div>Today's schedule</div>
            <ul>
              <li>- 졸작 미팅 하러가요💚</li>
              <li>- 10시 이디야</li>
              <li>- 아메리카노 먹어야겠다 </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
