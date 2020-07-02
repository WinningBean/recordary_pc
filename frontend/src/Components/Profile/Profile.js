import React from 'react';

import ScheduleSearch from './ScheduleSearch';
import './ProfilePage.css';
import '../Main/mainPage.css';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from './Follower';
import AddTab from './AddTab';
import ProfileTimeline from '../../Containers/Profile/ProfileTimeline';
import Header from '../../Containers/Header/Header';
import Calendar from '../Calendar/Calendar';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';
import Timeline from '../Timeline/Timeline';
import PostShareTimeline from '../Timeline/PostShareTimeline';
import OnlyPostExTimeline from '../Timeline/OnlyPostExTimeline';

import Loading from '../Loading/Loading';
import NotifyPopup from '../UI/NotifyPopup';
import Snackbar from '../UI/Snackbar';
import GroupSetting from '../Group/GroupSetting';
import ProfileEditor from './ProfileEditor';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import LinkElement from '@material-ui/core/Link';
import { Redirect, Link, Route } from 'react-router-dom';

import axios from 'axios';

const IconButton = styled(Button)({
  minWidth: '30px',
  minHeight: '30px',
  padding: '0 0',
  margin: '0 0',
});

const TabButton = styled(Button)({
  minWidth: '65px',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  marginBottm: '4px',
});

const extensionImage = ['bmp', 'gif', 'jpeg', 'jpg', 'png'];
const extensionVideo = ['mp4', 'webm', 'ogg'];
const extensionAudio = ['m4a', 'mp3', 'ogg', 'wav'];

const filterTagType = (value) => {
  const len = value.length;
  const lastDot = value.lastIndexOf('.');
  const extension = value.substr(lastDot + 1, len).toLowerCase();
  let filterType = null;

  extensionImage.map((value) => {
    if (extension === value) filterType = 'image';
  });
  extensionVideo.map((value) => {
    if (extension === value) filterType = 'video';
  });
  extensionAudio.map((value) => {
    if (extension === value) filterType = 'audio';
  });
  return filterType;
};

const timelineMediaType = (value, index) => {
  if (filterTagType(value) === 'image') {
    return <img alt={`${index}-media`} src={value} className='media-box' style={{ height: '100%' }} />;
  } else if (filterTagType(value) === 'video') {
    return (
      <video controls title={`${index}-media`} src={value} className='media-box' style={{ height: '100%' }}>
        지원되지 않는 형식입니다.
      </video>
    );
  } else if (filterTagType(value) === 'audio') {
    return (
      <audio controls src={value} className='media-box'>
        지원되지 않는 형식입니다.
      </audio>
    );
  } else {
    return (
      <span className='media-box' style={{ height: '100%' }}>
        지원되지 않는 형식입니다.
      </span>
    );
  }
};

class Profile extends React.Component {
  // this.state.type
  // 0 : 내 프로필
  // 1 : 남의 프로필
  // 2 : 마스터 그룹 프로필
  // 3 : 그룹원 프로필
  // 5 : 남의 그룹 프로필

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
      clickTab: undefined,
      isRemoveAllScheduleInTab: false,
      contextMenu: undefined,
      post: [],
      groupPost: [],
      isOpenAddTab: false,
      searchedSchedule: null,
    };
  }

  getUserInfo = async () => {
    var type = 1;
    const { data } = await axios.get(`/user/profile/${this.props.match.params.userId}`);
    if (data === '') {
      this.setState({ ...this.state, redirect: true });
      return;
    }
    console.log(data);
    if (this.props.isLogin && data.userInfo.userCd === this.props.user.userCd) {
      type = 0;
    }
    // await axios.post('/tab/create');
    // console.log(
    //   await axios.post('/schedule/showUserSchedule', {
    //     userCd: data.userCd,
    //     state: 0,
    //     frommDate: dateFns.startOfMonth(new Date()).getTime(),
    //     toDate: dateFns.endOfMonth(new Date()).getTime(),
    //   })
    // );
    this.setState({
      ...this.state,
      info: data,
      isLoading: false,
      type: type,
    });

    try {
      console.log(this.state.info.userInfo.userCd);
      const UserPostList = (await axios.get(`/post/user/${this.state.info.userInfo.userCd}`)).data;
      this.setState({ post: JSON.parse(JSON.stringify(UserPostList)) });
      console.log(this.state.post);
    } catch (error) {
      console.log(error);
    }
  };

  getGroupInfo = async () => {
    try {
      const groupInfo = (await axios.get('/group/', { params: { input: this.props.match.params.groupCd } })).data;
      console.log(groupInfo);
      var groupApply = null;
      var type = 5;

      console.log(this.props.user);
      if (this.props.isLogin && groupInfo.admin.userCd === this.props.user.userCd) {
        type = 2;
        groupApply = (await axios.get(`/groupApply/findUserApply/${this.props.match.params.groupCd}`)).data;
        console.log(groupApply, 'groupApply');
      }
      for (let i = 0; i < groupInfo.memberList.length; i++) {
        if (groupInfo.memberList[i].userCd === this.props.user.userCd) {
          type = 3;
          break;
        }
      }
      console.log('type = ', type);
      this.setState({
        ...this.state,
        info: {
          ...groupInfo,
          currentUserCd: this.props.user.userCd,
          member: groupInfo.memberList,
          groupApply: groupApply,
        },
        type: type,
        isLoading: false,
        isClickMember: false,
      });

      try {
        const groupPostList = (await axios.get(`/post/group/${this.props.match.params.groupCd}`)).data;
        this.setState({ groupPost: JSON.parse(JSON.stringify(groupPostList)) });
        console.log(this.state.groupPost);
      } catch (error) {
        console.log(error);
      }
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
        this.setState({
          addScheduleClick: false,
          showProfileList: false,
          followerNumClick: false,
          followingNumClick: false,
          isLoading: true,
          type: undefined,
          info: undefined,
          redirect: false,
          alert: null,
          clickTab: undefined,
          isRemoveAllScheduleInTab: false,
          contextMenu: undefined,
          post: [],
          groupPost: [],
          isOpenAddTab: false,
          searchedSchedule: null,
        });
        this.getUserInfo();
      }
    } else if (this.props.match.params.groupCd !== undefined) {
      if (this.props.match.params.groupCd !== prevProps.match.params.groupCd) {
        this.setState({
          addScheduleClick: false,
          showProfileList: false,
          followerNumClick: false,
          followingNumClick: false,
          isLoading: true,
          type: undefined,
          info: undefined,
          redirect: false,
          alert: null,
          clickTab: undefined,
          isRemoveAllScheduleInTab: false,
          contextMenu: undefined,
          post: [],
          groupPost: [],
          isOpenAddTab: false,
          searchedSchedule: null,
        });
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
            type={this.state.type}
            userCd={this.state.info.userInfo.userCd}
            isFollower={true}
            onCancel={() => this.setState({ followerNumClick: false })}
          ></Follower>
        );
      } else if (this.state.followingNumClick) {
        return (
          <Follower
            type={this.state.type}
            userCd={this.state.info.userInfo.userCd}
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
                <ScheduleSearch
                  data={this.state.info}
                  type={this.state.type}
                  onSelect={(value) => this.setState({ searchedSchedule: value })}
                />
              </div>
              <div className='main-profile-info-postIt'>
                <div className='postIt'>
                  <ul style={{ width: '40px' }}>
                    {this.state.type !== 0 ? null : (
                      <>
                        <li
                          style={{
                            transform: this.state.clickTab === undefined ? 'translateX(-23px)' : 'translateX(10px)',
                          }}
                          className='transition-all'
                        >
                          <TabButton
                            style={{
                              backgroundColor: 'rgba(255,197,0)',
                              opacity: this.state.clickTab === undefined ? '100%' : '60%',
                              fontWeight: 'bold',
                            }}
                            onClick={() => {
                              if (this.state.clickTab === undefined) {
                                return;
                              }
                              this.setState({ clickTab: undefined });
                            }}
                          >
                            ALL
                          </TabButton>
                        </li>
                        {this.state.info.scheduleTabInfo.map((value, index) => (
                          <li
                            key={`tab-${index}`}
                            style={{
                              transform: this.state.clickTab === index ? 'translateX(-23px)' : 'translateX(10px)',
                            }}
                            className='transition-all'
                          >
                            <TabButton
                              name={`${value.scheduleTabCd}-${value.scheduleTabNm}`}
                              style={{
                                backgroundColor: value.scheduleTabColor,
                                opacity: this.state.clickTab === index ? '100%' : '60%',
                              }}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                this.setState({ contextMenu: e.currentTarget });
                              }}
                              onClick={() => {
                                if (this.state.clickTab === index) {
                                  return;
                                }
                                this.setState({ clickTab: index });
                              }}
                            >
                              {value.scheduleTabNm}
                            </TabButton>
                          </li>
                        ))}
                        <li
                          style={{
                            transform: 'translateX(0px)',
                          }}
                        >
                          <TabButton
                            style={{ justifyContent: 'flex-start', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            onClick={() => {
                              if (this.state.info.scheduleTabInfo.length > 8) {
                                this.setState({
                                  alert: (
                                    <Snackbar
                                      severity='error'
                                      content='탭은 최대 8개까지 만들수있습니다.'
                                      onClose={() => this.setState({ alert: null })}
                                    />
                                  ),
                                });
                                return;
                              }
                              this.setState({ isOpenAddTab: true });
                            }}
                          >
                            <PlaylistAddIcon />
                          </TabButton>
                        </li>
                      </>
                    )}
                  </ul>
                  <Menu
                    anchorEl={this.state.contextMenu}
                    keepMounted
                    open={Boolean(this.state.contextMenu)}
                    onClose={() => this.setState({ contextMenu: undefined })}
                  >
                    <MenuItem
                      onClick={() => {
                        this.setState({
                          alert: (
                            <Dialog open>
                              <DialogTitle style={{ backgroundColor: 'rgba(20, 81, 51, 0.8)', color: 'white' }}>
                                탭 삭제
                              </DialogTitle>
                              <DialogContent>
                                <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '6px' }}>{`'${
                                  this.state.contextMenu.name.split('-')[1]
                                }' 탭을 삭제하시겠습니까?`}</div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) => this.setState({ isRemoveAllScheduleInTab: e.target.checked })}
                                      color='primary'
                                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                  }
                                  label='탭에 포함된 모든 일정도 삭제'
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() =>
                                    this.setState({
                                      alert: null,
                                      isRemoveAllScheduleInTab: false,
                                      contextMenu: undefined,
                                    })
                                  }
                                >
                                  취소
                                </Button>
                                <Button
                                  onClick={async () => {
                                    try {
                                      const cd = this.state.contextMenu.name.split('-')[0];
                                      await axios.delete(`/tab/${cd}`);
                                      const copyTabInfo = this.state.info.scheduleTabInfo.slice();
                                      for (let i = 0; i < copyTabInfo.length; i++) {
                                        if (copyTabInfo[i].scheduleTabCd == cd) {
                                          copyTabInfo.splice(i, 1);
                                          break;
                                        }
                                      }
                                      this.setState({
                                        info: { ...this.state.info, scheduleTabInfo: copyTabInfo },
                                        contextMenu: undefined,
                                        alert: (
                                          <Snackbar
                                            severity='success'
                                            content='삭제되었습니다.'
                                            onClose={() => this.setState({ alert: null })}
                                          />
                                        ),
                                      });
                                    } catch (error) {
                                      console.error(error);
                                      this.setState({
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
                                >
                                  삭제
                                </Button>
                              </DialogActions>
                            </Dialog>
                          ),
                        });
                      }}
                    >
                      탭 삭제
                    </MenuItem>
                  </Menu>
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
                          type={0}
                          data={this.state.info.groupApply}
                          onAccept={async (index) => {
                            try {
                              const { data } = await axios.post('/groupMember/create', {
                                groupCd: this.state.info.groupCd,
                                userCd: this.state.info.groupApply[index].userCd,
                              });
                              this.props.onSaveNotice({
                                type: 'SAVE_NOTICE',
                                notice: {
                                  noticeType: 'GROUP_MEMBER_ALLOW', // 이벤트 타입
                                  activeCd: this.state.info.groupCd, // 이벤트 주체
                                  targetCd: this.state.info.groupApply[index].userCd, // 이벤트 대상
                                },
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
                              this.props.onSaveNotice({
                                type: 'SAVE_NOTICE',
                                notice: {
                                  noticeType: 'GROUP_APPLY_COME_NOT', // 이벤트 타입
                                  activeCd: this.state.info.groupApply[index].userCd, // 이벤트 주체
                                  targetCd: this.state.info.groupCd, // 이벤트 대상
                                },
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
                        src={this.state.type >= 2 ? this.state.info.groupPic : this.state.info.userInfo.userPic}
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
                                            userCd: this.props.userCd,
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
                            <>
                              {`${this.state.info.userInfo.userId}(${this.state.info.userInfo.userNm})`}
                              {this.state.type !== 0 ? null : (
                                <IconButton
                                  onClick={() =>
                                    this.setState({
                                      alert: (
                                        <ProfileEditor
                                          onCancel={() => this.setState({ alert: null })}
                                          data={this.state.info.userInfo}
                                        />
                                      ),
                                    })
                                  }
                                >
                                  <SettingsIcon fontSize='small' />
                                </IconButton>
                              )}
                            </>
                          )}
                        </div>
                        {this.state.type >= 2 ? (
                          <>
                            <div style={{ textAlign: 'center' }}>
                              <span className='followerName'>그룹장</span>
                              <Link to={`/${this.state.info.admin.userId}`}>
                                <LinkElement component='button'>
                                  <span className='followerNum'>{this.state.info.admin.userNm}</span>
                                </LinkElement>
                              </Link>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <span className='followerName'>그룹 멤버</span>
                              <LinkElement
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    isClickMember: true,
                                  })
                                }
                              >
                                <span className='followerNum'>{this.state.info.member.length}</span>
                              </LinkElement>
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
                                    {this.state.info.member.length < 1 ? (
                                      <div style={{ padding: '20px', fontSize: '15px' }}>그룹 멤버가 없습니다.</div>
                                    ) : (
                                      this.state.info.member.map((value, index) => {
                                        return (
                                          <Link to={`/${value.userId}`}>
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
                                                  boxShadow: '0px 1px 3px rgba(161, 159, 159, 0.8)',
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
                                          </Link>
                                        );
                                      })
                                    )}
                                  </div>
                                </Dialog>
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ textAlign: 'center' }}>
                              <span className='followerName'>팔로워</span>
                              <LinkElement
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    followerNumClick: true,
                                  })
                                }
                              >
                                <span className='followerNum'>{this.state.info.followerCount}</span>
                              </LinkElement>
                            </div>
                            {FollowerShow()}
                            <div style={{ textAlign: 'center' }}>
                              <span className='followerName'>팔로우</span>
                              <LinkElement
                                component='button'
                                onClick={() =>
                                  this.setState({
                                    followingNumClick: true,
                                  })
                                }
                              >
                                <span className='followNum'>{this.state.info.followingCount}</span>
                              </LinkElement>
                            </div>
                          </>
                        )}
                      </div>
                      <div className='status-content'>
                        <div style={{ textAlign: 'center' }}>
                          {this.state.type === 2 || this.state.type === 3 || this.state.type === 5
                            ? this.state.info.groupEx === null
                              ? null
                              : this.state.info.groupEx.split('\n').map((line) => {
                                  return (
                                    <span>
                                      {line}
                                      <br />
                                    </span>
                                  );
                                })
                            : this.state.info.userInfo.userEx === null
                            ? null
                            : this.state.info.userInfo.userEx.split('\n').map((line) => {
                                return (
                                  <span>
                                    {line}
                                    <br />
                                  </span>
                                );
                              })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id='schedule-area'>
                    <Calendar
                      searchedSchedule={this.state.searchedSchedule}
                      type={this.state.type}
                      info={
                        this.state.type === 2 || this.state.type === 3 || this.state.type === 5
                          ? this.state.info
                          : this.state.info.userInfo
                      }
                      tabInfo={this.state.info.scheduleTabInfo}
                      clickTab={
                        this.state.clickTab === undefined
                          ? undefined
                          : this.state.info.scheduleTabInfo[this.state.clickTab].scheduleTabCd
                      }
                      onSuccessAlert={() =>
                        this.setState({
                          alert: (
                            <Snackbar
                              severity='success'
                              duration={1000}
                              content='일정등록 완료'
                              onClose={() => this.setState({ alert: null })}
                            />
                          ),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <div>
                <NavButton
                  style={{
                    backgroundColor: this.state.showProfileList ? '#eee' : '#444',
                    color: this.state.showProfileList ? 'black' : 'white',
                  }}
                  onClick={() => this.setState({ showProfileList: !this.state.showProfileList })}
                >
                  <span>일정</span>
                </NavButton>
              </div>
              <div>
                <NavButton
                  style={{
                    backgroundColor: this.state.showProfileList ? '#444' : '#eee',
                    color: this.state.showProfileList ? 'white' : 'black',
                  }}
                  onClick={async () => {
                    this.setState({ showProfileList: !this.state.showProfileList });
                  }}
                >
                  <span>미디어</span>
                </NavButton>
              </div>
            </nav>
            {this.state.type >= 2 ? (
              this.state.showProfileList ? (
                <>
                  <div className='profile-MediaTimeline'>
                    {this.state.groupPost.map((value, index) => {
                      if (value.mediaFK !== null && value.postOriginFK === null) {
                        return (
                          <Link to={`/group/${this.state.info.groupCd}/${value.postCd}`}>
                            <div
                              className='media-box-hover'
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                height: '272px',
                                width: '272px',
                                overflow: 'hidden',
                                margin: '10px',
                                lineHeight: '272px',
                              }}
                              key={`${index}- img`}
                            >
                              {timelineMediaType(value.mediaFK.mediaFirstPath)}
                              {/* <img className='media-box' alt={`${index}- img`} src={value.mediaFK.mediaFirstPath} /> */}
                            </div>
                          </Link>
                        );
                      } else return null;
                    })}
                  </div>
                </>
              ) : (
                this.state.groupPost.map((value, index) => {
                  if (value.mediaFK !== null) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <Timeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else if (value.scheduleFK !== null || value.shareScheduleList.length > 0) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <TimelineWeekSchedule
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else if (value.postOriginFK !== null) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <PostShareTimeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <OnlyPostExTimeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                })
              )
            ) : null}
            {this.state.type < 2 ? (
              this.state.showProfileList ? (
                <>
                  <div className='profile-MediaTimeline'>
                    {this.state.post.map((value, index) => {
                      if (value.mediaFK !== null && value.postOriginFK === null) {
                        return (
                          <div
                            className='media-box-hover'
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              height: '272px',
                              width: '272px',
                              overflow: 'hidden',
                              margin: '10px',
                              lineHeight: '272px',
                            }}
                            key={`${index}- img`}
                          >
                            <Link to={`/${this.state.info.userInfo.userId}/${value.postCd}`}>
                              {timelineMediaType(value.mediaFK.mediaFirstPath)}
                              {/* <img className='media-box' alt={`${index}- img`} src={value.mediaFK.mediaFirstPath} /> */}
                            </Link>
                          </div>
                        );
                      } else return null;
                    })}
                  </div>
                  {console.log(this.state.post)}
                </>
              ) : (
                this.state.post.map((value, index) => {
                  if (value.mediaFK !== null) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <Timeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else if (value.scheduleFK !== null || value.shareScheduleList.length > 0) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <TimelineWeekSchedule
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else if (value.postOriginFK !== null) {
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <PostShareTimeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                  } else
                    return (
                      <div className='profile-ScheduleTimeLine' key={`${value.postCd}-${index}`}>
                        <OnlyPostExTimeline
                          data={value}
                          user={this.props.user}
                          onPostDelete={(postCd) => {
                            var index = undefined;
                            for (let i = 0; i < this.state.post.length; i++) {
                              if (postCd === this.state.post[i].postCd) {
                                index = i;
                                break;
                              }
                            }
                            const copyTimeLine = this.state.post.slice();
                            copyTimeLine.splice(index, 1);
                            this.setState({ post: copyTimeLine });
                          }}
                        />
                      </div>
                    );
                })
              )
            ) : null}
            {this.state.alert}
            {this.state.isOpenAddTab ? (
              <AddTab
                userCd={this.state.info.userInfo.userCd}
                onClose={() => this.setState({ isOpenAddTab: false })}
                onSuccess={(tabInfo) => {
                  this.setState({
                    ...this.state,
                    info: { ...this.state.info, scheduleTabInfo: this.state.info.scheduleTabInfo.concat(tabInfo) },
                    isOpenAddTab: false,
                  });
                }}
              />
            ) : null}
          </main>
        ) : null}
        {this.props.match.params.userId !== undefined ? (
          <Route exact path='/*/:userPostCd' component={ProfileTimeline} />
        ) : (
          <Route exact path='/group/*/:groupPostCd' component={ProfileTimeline} />
        )}
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
