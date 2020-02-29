import React from 'react';
import './mainPage.css';

class Aside extends React.Component {
    render() {
        return (
            <aside>
                <div className="aside-profile">
                    <div className="timeline-profile">   
                        <img alt="user-img" src="http://placehold.it/200X200"/>
                    </div>
                    <div className="aside-profile-info">
                        <div className="aside-profile-name">
                            Water_Glasses
                        </div>
                        <div className="aside-profile-statusMsg">
                            #카르페디엠 #현재를 즐겨라<br/>
                            #OMG #새벽 5시 13분ㅠㅠ
                        </div>
                        <div className="aside-profile-TodaySchedule">
                            <hr/>
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
