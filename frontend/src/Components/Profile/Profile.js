import React from 'react';
import './ProfilePage.css';
import SearchAppBar from '../Other/SearchField';
import ScheduleTimeline1 from './ScheduleTimeline1';
import PictureTimeline from './PictureTimeline';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from 'Components/Profile/Follower';
import Header from 'Containers/Header/Header';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addScheduleClick: false,
            profileScheduleClick: false,
            profilePictureClick: false,
            followerNumClick: false,
        }
    }
    setProfileScheduleOpen = () => {
        if (this.state.profileScheduleClick === true) {
            return this.setState({
                profileScheduleClick: false,
                profilePictureClick: true
            });
        }
        return this.setState({
            profileScheduleClick: true,
            profilePictureClick: false
        });
    };

    setProfilePictureOpen = () => {
        if (this.state.profilePictureClick === true) {
            return this.setState({
                profilePictureClick: false,
                profileScheduleClick: true
            });
        }
        return this.setState({
            profilePictureClick: true,
            profileScheduleClick: false

        });
    };


    render() {


        const ProfileDownTimeLine = () => {
            if (this.state.profileScheduleClick === true && this.state.profilePictureClick === false) {

                return (
                    <div className="profile-ScheduleTimeLine">
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                    </div>
                )
            }
            if (this.state.profilePictureClick === true && this.state.profileScheduleClick === false) {
                return (
                    <div className="profile-MediaTimeline">
                        <PictureTimeline></PictureTimeline>
                        <PictureTimeline></PictureTimeline>
                        <PictureTimeline></PictureTimeline>
                        <PictureTimeline></PictureTimeline>
                    </div>
                )
            }
            return null;
        }

        const FollowerShow = () => {
            if (this.state.followerNumClick === true) {
                return <Follower onCancel={() => this.setState({ followerNumClick: false })}></Follower>
            }
            return null;
        }
        console.log(this.props.match.params.userId);

        return (
            <>
                <Header />
                <main>
                    <ScrollToTopOnMount />
                    <div id="main-profile">
                        <div className="search-user">
                            <SearchAppBar></SearchAppBar>
                        </div>
                        <div id="main-profile-info">
                            <div id="userinfo">
                                <div id="user-image">
                                    <img alt="profile-img" src="profile-image.png" />
                                </div>
                                <div id="userinfo-text">
                                    <div className="info">
                                        <ul>
                                            <li><span className="name">WaterGlasses</span></li>
                                            <li>
                                                <span className="followerName">팔로워</span>
                                                <Link component="button" onClick={() => this.setState({ followerNumClick: true })}>
                                                    <span className="followerNum">50</span>
                                                </Link>
                                                {FollowerShow()}
                                            </li>
                                            <li>
                                                <span className="followerName">팔로우</span>
                                                <Link component="button" onClick={() => this.setState({ followerNumClick: true })}>
                                                    <span className="followNum">50</span>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="status-content">
                                            상태메시지입니담!
                                        <br></br>
                                            배고픕니담
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div id="schedule-area">
                                <div className="calender">
                                    {/* 캘린더 추가 */}
                                    달력
                            </div>
                            </div>
                        </div>
                    </div>
                    <nav>
                        <div id="tap-1" >
                            <NavButton onClick={this.setProfileScheduleOpen}><span>일정</span></NavButton>
                        </div>
                        <div id="tap-2">
                            <NavButton onClick={this.setProfilePictureOpen}><span>사진</span></NavButton>
                        </div>
                    </nav>
                    {ProfileDownTimeLine()}
                </main>
            </>
        );
    }
}

const NavButton = styled(Button)({
    minWidth: '430px',
    height: '60px',
    fontSize: '18px',
    fontStyle: 'bold',
})

export default Profile;
