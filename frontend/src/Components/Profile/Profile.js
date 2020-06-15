import React from 'react';

import ScheduleSearch from './ScheduleSearch';
import './ProfilePage.css';
import '../Main/mainPage.css';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from './Follower';
import AddTab from './AddTab';
import Header from '../../Containers/Header/Header';
import Calendar from '../Calendar/Calendar';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';
import Timeline from '../Timeline/Timeline';
import Loading from '../Loading/Loading';
import NotifyPopup from '../UI/NotifyPopup';
import Snackbar from '../UI/Snackbar';
import GroupSetting from '../Group/GroupSetting';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import RouterLink from 'react-router-dom/Link';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

import * as dateFns from 'date-fns';

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
      isOpenAddTab: false,
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

      if (this.props.isLogin && groupInfo.admin.userCd === this.props.user.userCd) {
        type = 2;
        groupApply = (await axios.get(`/groupApply/findUserApply/${this.props.match.params.groupCd}`)).data;
        console.log(groupApply, 'groupApply');
      }
      for (let i = 0; groupInfo.memberList.length; i++) {
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
            userId={this.state.info.userInfo.userId}
            isFollower={true}
            onCancel={() => this.setState({ followerNumClick: false })}
          ></Follower>
        );
      } else if (this.state.followingNumClick) {
        return (
          <Follower
            userId={this.state.info.userInfo.userId}
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
                    {this.state.type !== 0 ? null : (
                      <>
                        <li
                          style={{
                            transform: this.state.clickTab === undefined ? 'translateX(15px)' : 'translateX(30px)',
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
                              transform: this.state.clickTab === index ? 'translateX(15px)' : 'translateX(30px)',
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
                            />
                          </li>
                        ))}
                        <li
                          style={{
                            transform: 'translateX(30px)',
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
                              // await axios.post('/groupApply/delete', {
                              //   groupCd: this.state.info.groupCd,
                              //   userCd: this.state.info.groupApply[index].userCd,
                              // });
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
                            `${this.state.info.userInfo.userId}(${this.state.info.userInfo.userNm})`
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
                              <RouterLink to={`/profile/${this.state.info.admin.userCd}`}>
                                <Link component='button'>
                                  <span
                                    className='followerNum'
                                    onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
                                    onMouseOut={() => this.setState({ ...this.state, isHover: false })}
                                  >
                                    {this.state.info.admin.userNm}
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
                                <span className='followerNum'>{this.state.info.followerCount}</span>
                              </Link>
                            </div>
                            {FollowerShow()}
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
                                <span className='followNum'>{this.state.info.followingCount}</span>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                      <div className='status-content'>
                        <div>{this.state.type >= 2 ? this.state.info.groupEx : this.state.info.userInfo.userEx}</div>
                      </div>
                    </div>
                  </div>
                  <div id='schedule-area'>
                    <Calendar
                      type={this.state.type}
                      info={
                        this.state.type === 2 || this.state.type === 3 || this.state.type === 5
                          ? this.state.info
                          : this.state.info.userInfo
                      }
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
              <div style={this.state.showProfileList ? null : { backgroundColor: 'rgba(161, 159, 159, .2)' }}>
                <NavButton onClick={() => this.setState({ showProfileList: !this.state.showProfileList })}>
                  <span>일정</span>
                </NavButton>
              </div>
              <div style={this.state.showProfileList ? { backgroundColor: 'rgba(161, 159, 159, .2)' } : null}>
                <NavButton
                  onClick={async () => {
                    this.setState({ showProfileList: !this.state.showProfileList });
                  }}
                >
                  <span>사진</span>
                </NavButton>
              </div>
            </nav>
            {this.state.showProfileList ? (
              <>
                <div className='profile-MediaTimeline'>
                  {this.state.post.map((value, index) => {
                    if (value.mediaFK !== null) {
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
                          }}
                          key={`${index}- img`}
                        >
                          <img
                            className='media-box'
                            alt={`${index}- img`}
                            src={value.mediaFK.mediaFirstPath}
                            onClick={() => {
                              this.state.post.map(async (val, i) => {
                                try {
                                  if (val.postCd === value.postCd) {
                                    this.setState({ val: (this.state.post[i] = { ...val, postImgClick: true }) });
                                  } else return null;
                                } catch (error) {
                                  console.log(error);
                                }
                              });
                            }}
                          />
                        </div>
                      );
                    } else return null;
                  })}
                </div>
                {this.state.post.map((value, index) => {
                  if (value.postImgClick === true) {
                    return (
                      <Dialog
                        open
                        key={value.postCd}
                        onClose={() => {
                          this.setState({ value: (this.state.post[index] = { ...value, postImgClick: false }) });
                        }}
                      >
                        <Timeline data={value} user={this.props.user} />
                      </Dialog>
                    );
                  }
                })}
                {console.log(this.state.post)}
              </>
            ) : (
              this.state.post.map((value) => {
                if (value.mediaFK === null) {
                  return (
                    <div className='profile-ScheduleTimeLine' style={{ marginBottom: '50px' }}>
                      <TimelineWeekSchedule key={value.postCd} data={value} user={this.props.user} />
                    </div>
                  );
                } else return null;
              })
            )}
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
