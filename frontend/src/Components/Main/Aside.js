import React from 'react';
import './mainPage.css';

class Aside extends React.Component {
    render() {
        return (
            <aside>
                <div className='aside-profile'>
                    <div className='timeline-profile'>
                        <img alt='user-img' src='http://placehold.it/200X200' />
                    </div>
                    <div className='aside-profile-info'>
                        <div className='aside-profile-name'>Water_Glasses</div>
                        <div className='aside-profile-statusMsg'>
                            상태메시지
                        </div>
                        <div className='aside-profile-TodaySchedule'>
                            오늘의일정
                            <ul>
                                <li>- 가</li>
                                <li>- 나</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default Aside;
