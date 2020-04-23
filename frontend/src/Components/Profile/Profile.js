import React from 'react';
import produce from 'immer';
import './ProfilePage.css';
import '../Main/mainPage.css';
import SearchAppBar from '../Other/SearchField';
import ScheduleSearch from './ScheduleSearch';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from './Follower';
import Header from '../../Containers/Header/Header';
import Calendar from '../Calendar/Calendar';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';
import Timeline from '../Timeline/Timeline';
import Loading from '../Loading/Loading';
import { Dialog } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { Redirect } from 'react-router-dom';

import axois from 'axios';

class Profile extends React.Component {
  // 0 : 내 프로필
  // 1 : 내 그룹 프로필
  // 2 : 남의 프로필 (그룹도 포함)
  constructor(props) {
    super(props);
    this.state = {
      addScheduleClick: false,
      profileScheduleClick: false,
      profilePictureClick: false,
      followerNumClick: false,
      followingNumClick: false,
      isLoading: true,
      userInfo: undefined,
      redirect: false,
    };
  }
  getUserInfo = async () => {
    const { data } = await axois.get(`/user/${this.props.match.params.userId}`);
    if (data === '') {
      this.setState({ ...this.state, redirect: true });
      return;
    }
    this.setState({ ...this.state, userInfo: data, isLoading: false });
  };
  componentDidMount() {
    this.getUserInfo();
  }
  setProfileScheduleOpen = () => {
    if (this.state.profileScheduleClick === true) {
      return this.setState({
        profileScheduleClick: false,
        profilePictureClick: true,
      });
    }
    return this.setState({
      profileScheduleClick: true,
      profilePictureClick: false,
    });
  };

  setProfilePictureOpen = () => {
    if (this.state.profilePictureClick === true) {
      return this.setState({
        profilePictureClick: false,
        profileScheduleClick: true,
      });
    }
    return this.setState({
      profilePictureClick: true,
      profileScheduleClick: false,
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    const ProfileDownTimeLine = () => {
      if (this.state.profileScheduleClick === true && this.state.profilePictureClick === false) {
        return this.state.post.map((value) => (
          <div className='profile-ScheduleTimeLine'>
            <TimelineWeekSchedule key={value.post_cd} data={value} />
          </div>
        ));
      }
      if (this.state.profilePictureClick === true && this.state.profileScheduleClick === false) {
        return (
          <>
            <div className='profile-MediaTimeline'>
              {this.state.post.map((value, index) => (
                <div
                  className='media-box-hover'
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: '272px',
                    width: '272px',
                    overflow: 'hidden',
                    margin: '10px',
                  }}
                  key={value.post_cd}
                >
                  <img
                    className='media-box'
                    alt={value.post_cd}
                    src={value.post_pic}
                    onClick={() =>
                      this.setState({
                        value: (this.state.post[index] = {
                          ...value,
                          post_pic_click: true,
                        }),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            {this.state.post.map((value, index) => {
              if (value.post_pic_click === true) {
                return (
                  <Dialog
                    open
                    key={value.post_cd}
                    onClose={() =>
                      this.setState({
                        value: (this.state.post[index] = {
                          ...value,
                          post_pic_click: false,
                        }),
                      })
                    }
                  >
                    <Timeline data={value} />
                  </Dialog>
                );
              }
            })}
          </>
        );
      }
      return null;
    };

    const FollowerShow = () => {
      if (this.state.followerNumClick) {
        return (
          <Follower
            userId={this.state.userInfo.userId}
            isFollower={true}
            onCancel={() => this.setState({ followerNumClick: false })}
          ></Follower>
        );
      } else if (this.state.followingNumClick) {
        return (
          <Follower
            userId={this.state.userInfo.userId}
            isFollower={false}
            onCancel={() => this.setState({ followingNumClick: false })}
          ></Follower>
        );
      }
      return null;
    };
    console.log(this.props.location.state);
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <>
        <Header />
        {this.props.location.state === undefined ? (
          <main>
            <ScrollToTopOnMount />
            <div id='main-profile'>
              <div className='profile-search-schedule'>
                <ScheduleSearch data={this.state.userDate}></ScheduleSearch>
              </div>
              <div className='main-profile-info-postIt'>
                <div className='postIt'>
                  <ul style={{ width: '40px' }}>
                    {/* {this.state.postIt.map((value, index) => (
                      <li
                        key={value.postIt_cd}
                        onClick={() => {
                          this.setState({
                            postIt: this.state.postIt.map((val, _index) => {
                              if (_index === index) {
                                return {
                                  ...val,
                                  postIt_click: !val.postIt_click,
                                };
                              }
                              return {
                                ...val,
                                postIt_click: false,
                              };
                            }),
                          });
                        }}
                        style={
                          value.postIt_click === true
                            ? {
                                width: '40px',
                                backgroundColor: `${value.postIt_color}77`,
                              }
                            : {
                                width: '20px',
                                backgroundColor: `${value.postIt_color}77`,
                              }
                        }
                      />
                    ))}
                    {console.log(this.state.postIt)} */}
                  </ul>
                </div>
                <div id='main-profile-info'>
                  <div id='userinfo'>
                    <div id='user-image'>
                      <img
                        alt='profile-img'
                        src='https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg'
                      />
                    </div>
                    <div id='userinfo-text'>
                      <div className='info'>
                        <ul>
                          <li>
                            <span className='name'>{`${this.state.userInfo.userId}(${this.state.userInfo.userNm})`}</span>
                          </li>
                          <li>
                            <span className='followerName'>팔로워</span>
                            <Link
                              component='button'
                              onClick={() =>
                                this.setState({
                                  followerNumClick: true,
                                })
                              }
                            >
                              <span className='followerNum'>50</span>
                            </Link>
                            {FollowerShow()}
                          </li>
                          <li>
                            <span className='followerName'>팔로우</span>
                            <Link
                              component='button'
                              onClick={() =>
                                this.setState({
                                  followingNumClick: true,
                                })
                              }
                            >
                              <span className='followNum'>18</span>
                            </Link>
                          </li>
                        </ul>
                        <div className='status-content'>
                          <div>{this.state.userInfo.userEx}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id='schedule-area'>
                    <Calendar type={0} />
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <div
                id='tap-1'
                style={
                  this.state.profileScheduleClick === true && this.state.profilePictureClick === false
                    ? { backgroundColor: 'rgba(161, 159, 159, .2)' }
                    : null
                }
              >
                <NavButton onClick={this.setProfileScheduleOpen}>
                  <span>일정</span>
                </NavButton>
              </div>
              <div
                id='tap-2'
                style={
                  this.state.profilePictureClick === true && this.state.profileScheduleClick === false
                    ? { backgroundColor: 'rgba(161, 159, 159, 0.2)' }
                    : null
                }
              >
                <NavButton onClick={this.setProfilePictureOpen}>
                  <span>사진</span>
                </NavButton>
              </div>
            </nav>
            {ProfileDownTimeLine()}
          </main>
        ) : null}
      </>
    );
  }
}

const NavButton = styled(Button)({
  minWidth: '420px',
  height: '60px',
  fontSize: '18px',
  fontStyle: 'bold',
});

export default Profile;
