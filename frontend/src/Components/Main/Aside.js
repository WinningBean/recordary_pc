import React from 'react';
import './mainPage.css';

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    return (
      <aside>
        <div className='aside-profile'>
          <div className='timeline-profile'>
            <img alt='user-img' src={this.state.data.userPic} />
          </div>
          <div className='aside-profile-info'>
            <div className='aside-profile-name'>{this.state.data.userId}</div>
            <div className='aside-profile-statusMsg'>{this.state.data.userEx}</div>
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
  }
}

export default Aside;
