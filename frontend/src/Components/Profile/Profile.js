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
import NotifyPopup from '../UI/NotifyPopup';
import Snackbar from '../UI/Snackbar';
import { Dialog } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Profile extends React.Component {
  // this.state.type
  // 0 : 내 프로필
  // 1 : 남의 프로필
  // 2 : 마스터 그룹 프로필
  // 3 : 일반 그룹 프로필

  constructor(props) {
    super(props);
    this.state = {
      addScheduleClick: false,
      profileScheduleClick: false,
      profilePictureClick: false,
      followerNumClick: false,
      followingNumClick: false,
      isLoading: true,
      type: undefined,
      info: undefined,
      redirect: false,
      alert: null,
    };
  }
  getUserInfo = async () => {
    const { data } = await axios.get(`/user/${this.props.match.params.userId}`);
    if (data === '') {
      this.setState({ ...this.state, redirect: true });
      return;
    }
    this.setState({
      ...this.state,
      info: data,
      isLoading: false,
    });
  };

  getGroupInfo = async () => {
    try {
      const groupInfo = (await axios.get(`/group/${this.props.match.params.groupCd}`)).data;

      const groupMember = (await axios.get(`/group/member/${this.props.match.params.groupCd}`)).data;

      console.log(groupApply, 'groupApply');

      var groupApply = null;
      var type = 3;

      if (this.props.isLogin && groupInfo.userCd === this.props.user.userCd) {
        type = 2;
        groupApply = (await axios.get(`/groupApply/findUserApply/${this.props.match.params.groupCd}`)).data;
      }
      console.log('type = ', type);
      this.setState({
        ...this.state,
        info: {
          ...groupInfo,
          member: groupMember,
          groupApply: groupApply,
        },
        type: type,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ ...this.state, redirect: true });
    }
  };

  componentDidMount() {
    if (this.props.match.params.userId !== undefined) {
      console.log('user');
      this.getUserInfo();
    } else if (this.props.match.params.groupCd !== undefined) {
      console.log('group');
      this.getGroupInfo();
    }
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
                <div id='main-profile-info' style={this.state.type >= 2 ? { borderTop: '4px solid tomato' } : null}>
                  <div id='userinfo'>
                    {this.state.type !== 2 ? null : (
                      <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <NotifyPopup
                          data={this.state.info.groupApply}
                          onAccept={async (index) => {
                            try {
                              const { data } = await axios.post('/groupApply/create', {
                                groupCd: this.state.info.groupCd,
                                userCd: this.state.info.groupApply[index].userCd,
                                applyState: 1,
                              });
                              const copyList = this.state.info.groupApply.slice();
                              copyList.splice(index, 1);
                              this.setState({
                                ...this.state,
                                info: { ...this.state.info, groupApply: copyList },
                                alert: (
                                  <Snackbar
                                    severity={data ? 'sucess' : 'error'}
                                    content={
                                      data
                                        ? `${this.state.info.groupApply[index].userNm}님의 신청을 수락하였습니다.`
                                        : '이미 신청을 수락하였습니다.'
                                    }
                                    onClose={() => this.setState({ alert: null })}
                                  />
                                ),
                              });
                            } catch (error) {
                              this.setState({
                                ...this.state,
                                alert: (
                                  <Snackbar
                                    severity='error'
                                    content='서버에러로 인해 거절에 실패하였습니다.'
                                    onClose={() => this.setState({ alert: null })}
                                  />
                                ),
                              });
                            }
                          }}
                          onDenial={async (index) => {
                            try {
                              console.log({
                                groupCd: this.state.info.groupCd,
                                userCd: this.state.info.groupApply[index].userCd,
                              });
                              await axios.delete('/groupApply/', {
                                groupCd: this.state.info.groupCd,
                                userCd: this.state.info.groupApply[index].userCd,
                              });
                              const copyList = this.state.info.groupApply.slice();
                              copyList.splice(index, 1);
                              this.setState({
                                ...this.state,
                                info: { ...this.state.info, groupApply: copyList },
                                alert: (
                                  <Snackbar
                                    severity='sucess'
                                    content={`${this.state.info.groupApply[index].userNm}님의 신청을 거절하였습니다.`}
                                    onClose={() => this.setState({ alert: null })}
                                  />
                                ),
                              });
                            } catch (error) {
                              this.setState({
                                ...this.state,
                                alert: (
                                  <Snackbar
                                    severity='error'
                                    content='서버에러로 인해 거절에 실패하였습니다.'
                                    onClose={() => this.setState({ alert: null })}
                                  />
                                ),
                              });
                            }
                          }}
                        />
                      </div>
                    )}
                    <div id='user-image'>
                      <img
                        alt='profile-img'
                        src='https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg'
                      />
                    </div>
                    <div id='userinfo-text'>
                      <div style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <div className='name' style={{ textAlign: 'center', paddingBottom: '16px' }}>
                          {this.state.type >= 2
                            ? this.state.info.groupNm
                            : `${this.state.info.userId}(${this.state.info.userNm})`}
                        </div>
                        {this.state.type >= 2 ? (
                          <>
                            <div>
                              <span className='followerName'>그룹 멤버</span>
                              <Link
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    followerNumClick: true,
                                  })
                                }
                              >
                                <span className='followerNum'>{this.state.info.member.length}</span>
                              </Link>
                            </div>
                            <div>
                              <span className='followerName'>그룹장</span>
                              <Link
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    followerNumClick: true,
                                  })
                                }
                              >
                                <span className='followerNum'>{this.state.info.userNm}</span>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
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
                            </div>
                            {/* {FollowerShow()} */}
                            <div>
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
                            </div>
                          </>
                        )}
                      </div>
                      <div className='status-content'>
                        <div>{this.state.type >= 2 ? this.state.info.groupEx : this.state.info.userEx}</div>
                      </div>
                    </div>
                  </div>
                  <div id='schedule-area'>
                    <Calendar type={this.state.type === 0 ? 0 : this.state.type === 2 ? 1 : 2} />
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
            {this.state.alert}
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
