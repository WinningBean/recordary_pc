import React from 'react';
import produce from 'immer';

import ScheduleSearch from './ScheduleSearch';
import './ProfilePage.css';
import '../Main/mainPage.css';
import MainPageButton from '../Main/MainPageButton';
import PostMediaScheduleAppend from './PostMediaScheduleAppend';

import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from './Follower';
import AddSchedule from './AddSchedule';
import Header from '../../Containers/Header/Header';
import Calendar from '../Calendar/Calendar';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';
import Timeline from '../Timeline/Timeline';
import Loading from '../Loading/Loading';
import NotifyPopup from '../UI/NotifyPopup';
import Snackbar from '../UI/Snackbar';
import GroupSetting from '../Group/GroupSetting';
import { Dialog, DialogActions } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import RouterLink from 'react-router-dom/Link';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

const IconButton = styled(Button)({
  minWidth: '30px',
  minHeight: '30px',
  padding: '0 0',
  margin: '0 0',
});

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
      showProfileList: false,
      followerNumClick: false,
      followingNumClick: false,
      isLoading: true,
      type: undefined,
      info: undefined,
      redirect: false,
      alert: null,
      post: [],
      mediaPathArr: [],
      isOpenAddSc: false,
    };
  }

  getUserInfo = async () => {
    var type = 1;
    const { data } = await axios.get(`/user/${this.props.match.params.userId}`);
    if (data === '') {
      this.setState({ ...this.state, redirect: true });
      return;
    }
    if (this.props.isLogin && data.userCd === this.props.user.userCd) {
      type = 0;
    }
    this.setState({
      ...this.state,
      info: data,
      isLoading: false,
      type: type,
    });
  };

  getGroupInfo = async () => {
    try {
      const groupInfo = (await axios.get(`/group/${this.props.match.params.groupCd}`)).data;

      const groupMember = (await axios.get(`/group/member/${this.props.match.params.groupCd}`)).data;

      var groupApply = null;
      var type = 3;

      if (this.props.isLogin && groupInfo.userCd === this.props.user.userCd) {
        type = 2;
        groupApply = (await axios.get(`/groupApply/findUserApply/${this.props.match.params.groupCd}`)).data;
        console.log(groupApply, 'groupApply');
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
        isHover: false,
        isClickMember: false,
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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== undefined) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
        this.setState({ ...this.state, isLoading: true });
        this.getUserInfo();
      }
    } else if (this.props.match.params.groupCd !== undefined) {
      if (this.props.match.params.groupCd !== prevProps.match.params.groupCd) {
        this.setState({ ...this.state, isLoading: true });
        this.getGroupInfo();
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }

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
                <div
                  id='main-profile-info'
                  style={
                    this.state.type >= 2
                      ? { borderTop: '4px solid tomato' }
                      : { borderTop: '4px solid rgba(20, 81, 51, 0.8)' }
                  }
                >
                  <div id='userinfo'>
                    {this.state.type !== 2 ? null : (
                      <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <NotifyPopup
                          data={this.state.info.groupApply}
                          onAccept={async (index) => {
                            try {
                              const { data } = await axios.post('/groupMember/create', {
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
                              await axios.post('/groupApply/delete', {
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
                          {this.state.type >= 2 ? (
                            <>
                              {this.state.info.groupNm}
                              {this.state.type !== 2 ? null : (
                                <IconButton
                                  onClick={() =>
                                    this.setState({
                                      alert: (
                                        <GroupSetting
                                          onClose={() => this.setState({ alert: null })}
                                          data={{
                                            userCd: this.props.user.userCd,
                                            group: this.state.info,
                                          }}
                                        />
                                      ),
                                    })
                                  }
                                >
                                  <SettingsIcon fontSize='small' />
                                </IconButton>
                              )}
                            </>
                          ) : (
                            `${this.state.info.userId}(${this.state.info.userNm})`
                          )}
                        </div>
                        {this.state.type >= 2 ? (
                          <>
                            <div>
                              <span className='followerName'>그룹 멤버</span>
                              <Link
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    isClickMember: true,
                                  })
                                }
                              >
                                <span className='followerNum'>{this.state.info.member.length}</span>
                              </Link>
                              {this.state.isClickMember ? (
                                <Dialog
                                  open
                                  onClose={() =>
                                    this.setState({
                                      isClickMember: false,
                                    })
                                  }
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      padding: '6px 8px',
                                      maxHeight: '600px',
                                    }}
                                  >
                                    {this.state.info.member.map((value, index) => {
                                      return (
                                        <div
                                          style={{
                                            height: '60px',
                                            padding: '0px 2px',
                                            display: 'flex',
                                            borderBottom: '1px solid #eee',
                                            padding: '5px 0',
                                          }}
                                        >
                                          <img
                                            style={{
                                              height: '50px',
                                              width: '50px',
                                              objectFit: 'cover',
                                              borderRadius: '50%',
                                            }}
                                            src={value.userPic}
                                            alt='user img'
                                          />
                                          <div
                                            style={{
                                              flex: 1,
                                              paddingLeft: '18px',
                                              lineHeight: '50px',
                                              fontWeight: 'bold',
                                            }}
                                          >{`${value.userId}(${value.userNm})`}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </Dialog>
                              ) : null}
                            </div>
                            <div style={{ position: 'relative' }}>
                              <span className='followerName'>그룹장</span>
                              <RouterLink to={`/profile/${this.state.info.userCd}`}>
                                <Link component='button'>
                                  <span
                                    className='followerNum'
                                    onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
                                    onMouseOut={() => this.setState({ ...this.state, isHover: false })}
                                  >
                                    {this.state.info.userNm}
                                  </span>
                                </Link>
                              </RouterLink>
                              <div
                                className='transition-all'
                                style={{
                                  position: 'absolute',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  bottom: '-100px',
                                  left: 0,
                                  // padding: '6px 8px',
                                  height: '100px',
                                  width: '160px',
                                  border: '1px solid gray',
                                  // backgroundColor: '#eee',
                                  zIndex: this.state.isHover ? 6 : -6,
                                  opacity: this.state.isHover ? 100 : 0,
                                  transform: this.state.isHover ? 'translateY(18px)' : 'translateX(0px)',
                                }}
                              >
                                <div style={{ height: '60px', display: 'flex' }}>
                                  <img
                                    style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '50%' }}
                                    alt='admin img'
                                    src='https://i.pinimg.com/originals/0d/e8/86/0de8869350e89fd300edaeef3b659674.jpg'
                                  />
                                  <div
                                    style={{
                                      flex: 1,
                                      textAlign: 'center',
                                      lineHeight: '60px',
                                      fontSize: '18px',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {this.state.info.userNm}
                                  </div>
                                </div>
                                <div style={{ flex: 1, backgroundColor: 'tomato' }}>hello world</div>
                              </div>
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
                    <Calendar
                      type={this.state.type}
                      onAddSc={() => {
                        this.setState({
                          isOpenAddSc: true,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <div style={this.state.showProfileList ? null : { backgroundColor: 'rgba(161, 159, 159, .2)' }}>
                <NavButton onClick={() => this.setState({ showProfileList: !this.state.showProfileList })}>
                  <span>일정</span>
                </NavButton>
              </div>
              <div style={this.state.showProfileList ? { backgroundColor: 'rgba(161, 159, 159, .2)' } : null}>
                <NavButton
                  onClick={async () => {
                    this.setState({ showProfileList: !this.state.showProfileList });
                    this.setState({ mediaPathArr: [] });
                    try {
                      if (this.props.isLogin) {
                        const UserPostList = (await axios.get(`/post/user/${this.state.info.userCd}`)).data;
                        this.setState({ post: JSON.parse(JSON.stringify(UserPostList)) });
                        console.log(this.state.post);

                        this.state.post.map(async (value, index) => {
                          // console.log(value);
                          if (value.mediaFK !== null) {
                            const mediaPath = (await axios.get(`/media/${value.mediaFK.mediaCd}`)).data;
                            console.log(mediaPath);
                            // console.log(mediaPath[0]);
                            this.setState({ mediaPathArr: this.state.mediaPathArr.concat(mediaPath[1]) });
                            console.log(this.state.mediaPathArr);
                          } else return null;
                        });
                      }
                    } catch (error) {
                      console.log(error + 'getUserPostListError');
                    }
                  }}
                >
                  <span>사진</span>
                </NavButton>
              </div>
            </nav>
            {this.state.showProfileList ? (
              <>
                <div className='profile-MediaTimeline'>
                  {this.state.mediaPathArr.map((value, index) => (
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
                      key={`${index}- img`}
                    >
                      <img
                        className='media-box'
                        alt={`${index}- img`}
                        src={value}
                        onClick={() => this.setState({ isTimelineOpen: !this.state.isTimelineOpen })}
                      />
                    </div>
                  ))}
                </div>
                {/* {!isTimelineOpen ? null : async () => {

                } }
                {console.log(this.state.mediaPathArr)} */}
              </>
            ) : (
              this.state.post.map((value) => (
                <div className='profile-ScheduleTimeLine'>
                  <TimelineWeekSchedule key={value.post_cd} data={value} />
                </div>
              ))
            )}

            {this.state.alert}
            {this.state.isOpenAddSc ? <AddSchedule userCd={this.state.info.userCd} /> : null}
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
