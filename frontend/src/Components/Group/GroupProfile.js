import React from 'react';
import 'Components/Profile/ProfilePage.css';
import 'Components/Group/group.css';
import 'Components/Main/mainPage.css';

import SearchAppBar from 'Components/Other/SearchField';
import ScheduleTimeline1 from 'Components/Profile/ScheduleTimeline1';
import PictureTimeline from 'Components/Profile/PictureTimeline';
import ScrollToTopOnMount from 'Components/Other/ScrollToTopOnMount';
import GroupMember from 'Components/Group/GroupMember';
import Header from 'Containers/Header/Header';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

class GroupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addScheduleClick: false,
      profileScheduleClick: false,
      profilePictureClick: false,
      GroupMemberNumClick: false
    };
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
          <div className='profile-ScheduleTimeLine'>
            <ScheduleTimeline1></ScheduleTimeline1>
            <ScheduleTimeline1></ScheduleTimeline1>
            <ScheduleTimeline1></ScheduleTimeline1>
            <ScheduleTimeline1></ScheduleTimeline1>
          </div>
        );
      }
      if (this.state.profilePictureClick === true && this.state.profileScheduleClick === false) {
        return (
          <div className='profile-MediaTimeline'>
            <PictureTimeline></PictureTimeline>
            <PictureTimeline></PictureTimeline>
            <PictureTimeline></PictureTimeline>
            <PictureTimeline></PictureTimeline>
          </div>
        );
      }
      return null;
    };

    const GroupMemberShow = () => {
      if (this.state.GroupMemberNumClick === true) {
        return (
          <GroupMember onCancel={() => this.setState({ GroupMemberNumClick: false })}></GroupMember>
        );
      }
      return null;
    };
    console.log(this.props.match.params.group_cd);

    return (
      <>
        <Header />
        <main>
          <ScrollToTopOnMount />
          <div id='main-profile'>
            <div className='profile-search-schedule'>
              <SearchAppBar></SearchAppBar>
            </div>
            <div>
              <div id='main-profile-info'>
                <div id='userinfo'>
                  <div id='user-image'>
                    <img
                      alt='profile-img'
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7qoQDLmju9spmaThXLUCgNgeSShNPU6U_76FFfAQ-XkbUTs8r'
                    />
                  </div>
                  <div id='userinfo-text'>
                    <div className='info'>
                      <ul>
                        <li>
                          <span className='name'>Group_Title</span>
                        </li>
                        <li>
                          <span className='followerName'>황수경</span>
                        </li>
                        <li>
                          <span className='followerName'>멤버 수</span>
                          <Link
                            component='button'
                            onClick={() =>
                              this.setState({
                                GroupMemberNumClick: true
                              })
                            }
                          >
                            <span className='followerNum'>20</span>
                          </Link>
                          {GroupMemberShow()}
                        </li>
                      </ul>
                      <div className='status-content'>
                        <div>#카르페디엠 #현재를 즐겨라 #OMG #새벽 5시 13분</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='schedule-area'>
                  <div className='calender'>
                    {/* 캘린더 추가 */}
                    달력
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav>
            <div id='tap-1'>
              <NavButton onClick={() => this.setProfileScheduleOpen()}>
                <span>일정</span>
              </NavButton>
            </div>
            <div id='tap-2'>
              <NavButton onClick={() => this.setProfilePictureOpen()}>
                <span>사진</span>
              </NavButton>
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
  fontStyle: 'bold'
});

export default GroupProfile;
