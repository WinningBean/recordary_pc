import React from 'react';
import produce from 'immer';
import './ProfilePage.css';
import 'Components/Main/mainPage.css';
import SearchAppBar from '../Other/SearchField';
import ScrollToTopOnMount from '../Other/ScrollToTopOnMount';
import Follower from 'Components/Profile/Follower';
import Header from 'Containers/Header/Header';
import Calendar from 'Components/Calendar/Calendar';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';
import Timeline from 'Components/Timeline/Timeline';
import { Dialog } from '@material-ui/core';

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
      postIt: [
        {
          postIt_cd: 0,
          postIt_nm: 'All',
          postItClick: false
        },
        {
          postIt_cd: 1,
          postIt_nm: '친구',
          postItClick: false
        },
        {
          postIt_cd: 2,
          postIt_nm: '학교',
          postItClick: false
        }
      ],

      post: [
        {
          postForm: 1,
          post_cd: 4,
          user_id: 'HwangSG',
          user_pic: 'http://placehold.it/40x40',
          group_cd: null,
          uploadDate: new Date(),
          post_pic: 'img/1579501322063.jpg',
          post_pic_click: false,
          post_title: '팔색조와 여행😁',
          post_ex:
            '1일차 : 천사곱창에서 1차😍 보드게임방 2차🐱‍👤\n2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻\n3일차 : 김밥천국에서 냠냠🍳🍱🍜\n4일차 : 본캠 카페!~~!~!🥛☕',
          post_str_ymd: new Date(),
          post_end_ymd: new Date('2020-03-14'),
          comment: [
            {
              user_id: 'wi_sungho',
              user_pic: 'http://placehold.it/40x40',
              user_comment: '가나다라바사',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            },
            {
              user_id: 'hsg',
              user_pic: 'http://placehold.it/40x40',
              user_comment: 'abcd',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            }
          ],
          postLikeCount: 5,
          postLikePerson: 'WiSungho'
        },
        {
          postForm: 2,
          post_cd: 5,
          post_title: '팔색조와 여행😁',
          post_ex:
            '1일차 : 천사곱창에서 1차😍 보드게임방 2차🐱‍👤\n2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻\n3일차 : 김밥천국에서 냠냠🍳🍱🍜\n4일차 : 본캠 카페!~~!~!🥛☕',

          user_id: 'HwangSG',
          user_pic: 'http://placehold.it/40x40',
          group_cd: null,
          uploadDate: new Date(),
          post_pic:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ43GwBFCC_y33Gy9HNMJcO_EmB_wX3wjrzatjoK6GdZfbH_qrr',
          post_pic_click: false,
          sharedStartDay: new Date('2020-03-25'),
          sharedEndDay: new Date('2020-03-25'),
          sharedSchedual: [
            {
              cd: '01',
              start: new Date('2020-03-18'),
              end: new Date('2020-03-20'),
              ex: '발닦고 잠자기'
            },
            {
              cd: '02',
              start: new Date('2020-03-21'),
              end: new Date('2020-03-23'),
              ex: 'ex2'
            },
            {
              cd: '03',
              start: new Date('2020-03-25'),
              end: new Date('2020-03-25'),
              ex: 'ex3'
            }
          ],
          comment: [
            {
              user_id: 'wi_sungho',
              user_pic: 'http://placehold.it/40x40',
              user_comment: '가나다라바사',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            },
            {
              user_id: 'hsg',
              user_pic: 'http://placehold.it/40x40',
              user_comment: 'abcd',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            }
          ],
          postLikeCount: 5,
          postLikePerson: 'WiSungho'
        },
        {
          postForm: 2,
          post_cd: 6,
          post_title: '팔색조와 여행😁',
          post_ex:
            '1일차 : 천사곱창에서 1차😍 보드게임방 2차🐱‍👤\n2일차 : 치치에서 1차~ 오술차에서 2차!!🍺🍻\n3일차 : 김밥천국에서 냠냠🍳🍱🍜\n4일차 : 본캠 카페!~~!~!🥛☕',

          user_id: 'HwangSG',
          user_pic: 'http://placehold.it/40x40',
          group_cd: null,
          uploadDate: new Date(),
          post_pic:
            'data:image/jpeg;base64,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',
          post_pic_click: false,
          sharedStartDay: new Date('2020-05-25'),
          sharedEndDay: new Date('2020-03-25'),
          sharedSchedual: [
            {
              cd: '01',
              start: new Date('2020-03-18'),
              end: new Date('2020-03-20'),
              ex: '발닦고 잠자기'
            },
            {
              cd: '02',
              start: new Date('2020-03-21'),
              end: new Date('2020-03-23'),
              ex: 'ex2'
            },
            {
              cd: '03',
              start: new Date('2020-03-25'),
              end: new Date('2020-03-25'),
              ex: 'ex3'
            }
          ],
          comment: [
            {
              user_id: 'wi_sungho',
              user_pic: 'http://placehold.it/40x40',
              user_comment: '가나다라바사',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            },
            {
              user_id: 'hsg',
              user_pic: 'http://placehold.it/40x40',
              user_comment: 'abcd',
              commentLike: false,
              recommentList: [
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                },
                {
                  user_id: '위승빈',
                  user_pic: 'http://placehold.it/40x40',
                  user_comment: '배고프다',
                  commentLike: false
                }
              ]
            }
          ],
          postLikeCount: 5,
          postLikePerson: 'WiSungho'
        }
      ]
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

  PictureClick = (index, click) => {
    const array = this.state.post;
    array[index] = { ...array[index], post_pic_click: click };

    this.setState({ post: array });
  };

  render() {
    const ProfileDownTimeLine = () => {
      if (
        this.state.profileScheduleClick === true &&
        this.state.profilePictureClick === false
      ) {
        return this.state.post.map(value => (
          <div className='profile-ScheduleTimeLine'>
            <TimelineWeekSchedule key={value.post_cd} data={value} />
          </div>
        ));
      }
      if (
        this.state.profilePictureClick === true &&
        this.state.profileScheduleClick === false
      ) {
        // const postPicClickState = produce(this.state, draft => {
        //   draft.post[0].post_pic_click = true;
        // });
        return (
          <>
            <div className='profile-MediaTimeline'>
              {this.state.post.map((value, index) => (
                <div
                  style={{ display: 'flex', flexWrap: 'wrap' }}
                  key={value.post_cd}
                >
                  <img
                    className='media-box'
                    alt={value.post_cd}
                    src={value.post_pic}
                    onClick={() =>
                      this.PictureClick(index, !value.post_pic_click)
                    }
                  />
                </div>
              ))}
            </div>
            {console.log(this.state.post[0].post_pic_click)}
            {console.log(this.state.post[1].post_pic_click)}
            {console.log(this.state.post[2].post_pic_click)}
            {this.state.post.map((value, index) => {
              if (value.post_pic_click === true) {
                return (
                  <Dialog
                    open
                    key={value.post_cd}
                    onClose={() =>
                      this.PictureClick(index, !value.post_pic_click)
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
      if (this.state.followerNumClick === true) {
        return (
          <Follower
            onCancel={() => this.setState({ followerNumClick: false })}
          ></Follower>
        );
      }
      return null;
    };
    console.log(this.props.match.params.userId);

    return (
      <>
        <Header />
        <main>
          <ScrollToTopOnMount />
          <div id='main-profile'>
            <div className='profile-search-schedule'>
              <SearchAppBar></SearchAppBar>
            </div>
            <div className='main-profile-info-postIt'>
              <div className='postIt'>
                <ul style={{ width: '40px' }}>
                  {this.state.postIt.map(value => (
                    <li
                      key={value.postIt_cd}
                      onClick={() => this.setState({})}
                      style={
                        value.postItClick === true
                          ? { width: '40px' }
                          : { width: '20px' }
                      }
                    />
                  ))}
                  {console.log(this.state.postIt[0])}
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
                          <span className='name'>Water_Glasses</span>
                        </li>
                        <li>
                          <span className='followerName'>팔로워</span>
                          <Link
                            component='button'
                            onClick={() =>
                              this.setState({
                                followerNumClick: true
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
                                followerNumClick: true
                              })
                            }
                          >
                            <span className='followNum'>18</span>
                          </Link>
                        </li>
                      </ul>
                      <div className='status-content'>
                        <div>
                          #카르페디엠 #현재를 즐겨라 #OMG #새벽 5시 13분
                        </div>
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
                this.state.profileScheduleClick === true &&
                this.state.profilePictureClick === false
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
                this.state.profilePictureClick === true &&
                this.state.profileScheduleClick === false
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
      </>
    );
  }
}

const NavButton = styled(Button)({
  minWidth: '420px',
  height: '60px',
  fontSize: '18px',
  fontStyle: 'bold'
});

export default Profile;
