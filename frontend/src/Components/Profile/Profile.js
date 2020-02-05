import React from 'react';
import './ProfilePage.css';
import SearchAppBar from '../Other/SearchField';

class Profile extends React.Component {
    render() {
        return (
            <main>
                <div id="main-profile">
                    <div className="search-user">
                        <SearchAppBar></SearchAppBar>
                    </div>
                    <div id="main-profile-info">
                        <div id="userinfo">
                            <div id="user-image">
                                <img src="profile-image.png" />
                            </div>
                            <div id="userinfo-text">
                                <div className="info">
                                    <ul>
                                        <li><span className="name">WaterGlasses</span></li>
                                        <li><span>팔로워<span className="follower">50</span></span></li>
                                        <li><span>팔로우<span className="follow">40</span></span></li>
                                    </ul>
                                    <div className="status-content">
                                        상태메시지입니담!
                                        <br></br>
                                        배고픕니담
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div id="calender-area">
                            <div className="calender">
                                {/* 캘린더 추가 */}
                            </div>
                        </div>
                    </div>
                </div>
                <nav>
                    <div id="tap-1">
                        <a href="profile.html">일정</a>
                    </div>
                    <div id="tap-2">
                        <a href="profile.html">사진</a>
                    </div>
                </nav>
                <article>
                    <div className="media-area">
                        안녕
                    </div>
                    <div className="media-area">
                        배고프다
                    </div>
                </article>
        </main>
        );
    }
}

export default Profile;
