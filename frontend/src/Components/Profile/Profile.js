import React from 'react';
import './ProfilePage.css';
import SearchAppBar from '../Other/SearchField';
import ScheduleTimeline1 from './ScheduleTimeline1';
import PictureTimeline from './PictureTimeline';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import ChoosePostAppend from './ChoosePostAppend';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postAppendClick : false,
            profileScheduleClick : false,
            profilePictureClick : false,
        }
    }

    setProfileScheduleOpen = () => {
        if(this.state.profileScheduleClick === true){
            return this.setState({
                profileScheduleClick : false,
                profilePictureClick : true
            });
        }
        return this.setState({
            profileScheduleClick : true,
            profilePictureClick : false
        });
    };

    setProfilePictureOpen = () => {
        if(this.state.profilePictureClick === true){
            return this.setState({
                profilePictureClick : false,
                profileScheduleClick : true
            });
        }
        return this.setState({
            profilePictureClick : true,
            profileScheduleClick : false

        });
    };


    render() {
        
        const PostAppendMenu = () => {
            if(this.state.postAppendClick === true){
                return <ChoosePostAppend onCancel={() => this.setState({ postAppendClick: false })}></ChoosePostAppend>
            }
            return null;
        }

        
        const ProfileDownTimeLine = () => {
            if(this.state.profileScheduleClick === true && this.state.profilePictureClick === false){
                return(
                    <div className="profile-ScheduleTimeLine">
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                        <ScheduleTimeline1></ScheduleTimeline1>
                    </div>
                )
            }
            if(this.state.profilePictureClick === true && this.state.profileScheduleClick === false){
                return(
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
        

        return (
            <main>
                <ScrollToTopOnMount/>
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
                        <div id="schedule-area">
                            <div className="schedule-append">
                                <IconButton>
                                    <AddCircleIcon onClick={()=> this.setState({postAppendClick: true})} style={{fontSize: '30px'}}></AddCircleIcon>
                                </IconButton>
                                {PostAppendMenu()}
                            </div>
                            <div className="calender">
                                {/* 캘린더 추가 */}
                                달력
                            </div>
                        </div>
                    </div>
                </div>
                <nav>
                    <div id="tap-1" >
                        <Button onClick={this.setProfileScheduleOpen}><span>일정</span></Button>
                    </div>
                    <div id="tap-2">
                        <Button onClick={this.setProfilePictureOpen}><span>사진</span></Button>
                    </div>
                </nav>
                {ProfileDownTimeLine()}
            </main>
        );
    }
}
const IconButton = styled(Button)({
    minWidth: '40px',
    height: '40px',
});



export default Profile;
