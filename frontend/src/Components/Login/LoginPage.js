import React from 'react';
import './LoginPage.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
import Register from './Register';
import AlertDialog from '../Other/AlertDialog';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    isRegister: false,
    successRegister: () => {},
    failedLogin: () => {},
    user_id: '',
    user_pw: '',
    loading: false
  };

  changeHandel = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginHandel = async e => {
    e.preventDefault();
    // if(this.state.user_id === ""){
    //     this.setState({
    //         failedLogin: () => {
    //             return (
    //                 <AlertDialog
    //                     severity="error"
    //                     content="아이디를 작성하세요."
    //                     onAlertClose={()=>{this.setState({ failedLogin: () => {} })}}
    //                     />
    //             )
    //         }
    //     })
    //     return;
    // }
    // if(this.state.user_pw === ""){
    //     this.setState({
    //         failedLogin: () => {
    //             return (
    //                 <AlertDialog
    //                     severity="error"
    //                     content="비밀번호를 작성하세요."
    //                     onAlertClose={()=>{this.setState({ failedLogin: () => {} })}}
    //                     />
    //             )
    //         }
    //     })
    //     return;
    // }
    try {
      // const Form = new FormData();
      // Form.append('user_id', this.state.user_id);
      // Form.append('user_pw', this.state.user_pw);
      // const { isLogin } = (await axios.post('/user/loginRequest', Form)).data;
      // // .catch();
      // console.log(isLogin);

      // if(isLogin === false){
      //     this.setState({
      //         failedLogin: () => {
      //             return (
      //                 <AlertDialog
      //                     severity="error"
      //                     content="로그인에 실패하였습니다."
      //                     onAlertClose={()=>{this.setState({ failedLogin: () => {} })}}
      //                     />
      //             )
      //         }
      //     })
      //     return;
      // }
      this.setState({ isLoading: true });
      // 유저에 대한 정보를 가져오고 그 결과값을 state 에 저장
      // const {data} = await axios.get("/mainPage");
      const data = {
        currentUser: {
          user_ex: null,
          user_id: 'ffff3311',
          user_nm: '홍길동'
        },
        friendList: [
          {
            friend_user_id: 1,
            friend_user_nm: '위성호',
            friend_user_pic: 'https://cdn.pixabay.com/photo/2017/11/07/14/47/character-2927150_960_720.png',
            friend_user_ex: 'hi'
          },
          {
            friend_user_id: 2,
            friend_user_nm: '홍길동',
            friend_user_pic: 'https://storage.needpix.com/rsynced_images/character-1166998_1280.jpg',
            friend_user_ex: 'hi'
          }
        ],
        userGroup: [
          {
            group_cd: 1,
            group_nm: '그룹1',
            group_pic: 'http://placehold.it/40x40',
            group_open: true
          },
          {
            group_cd: 2,
            group_nm: '그룹2',
            group_pic: 'http://placehold.it/40x40',
            group_open: true
          }
        ],
        post: [
          {
            postForm: 0,
            post_cd: 4,
            user_id: 'HwangSG',
            user_pic: 'http://placehold.it/40x40',
            group_cd: null,
            uploadDate: new Date(),
            post_pic: [
              'img/1579501322063.jpg',
              'https://cdn.pixabay.com/photo/2017/11/07/14/47/character-2927150_960_720.png',
              'https://storage.needpix.com/rsynced_images/character-1166998_1280.jpg'
            ],
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
            user_id: '두번쨰폼',
            user_pic: 'http://placehold.it/40x40',
            group_cd: null,
            uploadDate: new Date(),
            post_pic: 'img/1579501322063.jpg',
            sharedStartDay: new Date('2020-03-25'),
            sharedEndDay: new Date('2020-03-28'),
            sharedSchedual: [
              {
                cd: '01',
                start: new Date('2020-03-13'),
                end: new Date('2020-03-28'),
                ex: '발닦고 잠자기',
                pic: ['http://placehold.it/400x400'],
                color: '#c0392b'
              },
              {
                cd: '03',
                start: new Date('2020-03-25'),
                end: new Date('2020-03-25'),
                ex: 'ex3',
                pic: [
                  'https://cdn.pixabay.com/photo/2017/11/07/14/47/character-2927150_960_720.png',
                  'https://storage.needpix.com/rsynced_images/character-1166998_1280.jpg',
                  'http://placehold.it/400x400'
                ],
                color: '#f1c40f'
              }
              // {
              //   cd: '02',
              //   start: new Date('2020-03-26'),
              //   end: new Date('2020-03-27'),
              //   ex: 'ex2',
              //   color: '#e74c3c'
              // }
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
            post_cd: 5,
            user_id: 'HwangSG',
            user_pic: 'http://placehold.it/40x40',
            group_cd: null,
            uploadDate: new Date(),
            post_pic: 'img/1579501322063.jpg',
            sharedStartDay: new Date('2020-03-25'),
            sharedEndDay: new Date('2020-04-25'),
            sharedSchedual: [
              {
                cd: '01',
                start: new Date('2020-03-25'),
                end: new Date('2020-03-28'),
                ex: '발닦고 잠자기',
                color: '#c0392b'
              },
              {
                cd: '02',
                start: new Date('2020-03-27'),
                end: new Date('2020-04-06'),
                ex: '발닦고 잠자기',
                color: '#ff9ff3'
              },
              {
                cd: '03',
                start: new Date('2020-04-03'),
                end: new Date('2020-04-08'),
                ex: '발닦고 잠자기',
                color: '#feca57'
              },
              {
                cd: '04',
                start: new Date('2020-04-12'),
                end: new Date('2020-04-12'),
                ex: '발닦고 잠자기',
                color: '#5f27cd'
              },
              {
                cd: '05',
                start: new Date('2020-04-12'),
                end: new Date('2020-04-25'),
                ex: '발닦고 잠자기',
                color: '#1dd1a1'
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
      this.props.onLogin();
      this.props.onSavaUserData(data);
      this.props.history.push('/main'); //페이지 이동
    } catch (error) {
      console.error(error);
      this.setState({
        failedLogin: () => {
          return (
            <AlertDialog
              severity='error'
              content='서버 오류로인해 로그인에 실패하였습니다.'
              onAlertClose={() => {
                this.setState({ failedLogin: () => {} });
              }}
            />
          );
        }
      });
    }
  };

  render() {
    const MyButton = styled(Button)({
      backgroundColor: '#bdc3c7',
      marginRight: '10px',
      color: 'black'
    });
    const registerPage = (() => {
      if (this.state.isRegister === true) {
        return (
          <Register
            onSuccessRegister={() => {
              this.setState({
                isRegister: false,
                successRegister: () => {
                  return (
                    <AlertDialog
                      severity='success'
                      content='회원가입을 성공하였습니다.'
                      onAlertClose={() => {
                        this.setState({
                          successRegister: () => {}
                        });
                      }}
                    />
                  );
                }
              });
            }}
            onClickCancel={() => {
              this.setState({ isRegister: false });
            }}
          ></Register>
        );
      }
      return null;
    })();
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <div id='index-page'>
        {registerPage}
        <form action='go_to_main' onSubmit={this.loginHandel}>
          <div className='icon'>
            <Link to='/main'>
              {/* <img className="title-image" alt="Recordary icon" src="http://localhost:8080/Recodary.png"/> */}
              <img className='title-image' alt='Recordary icon' src='img/Recordary.png' />
            </Link>
          </div>
          {this.state.successRegister()}
          {this.state.failedLogin()}
          <div className='login-form'>
            <div className='login-text'>
              <TextField name='user_id' autoFocus label='아이디' onChange={this.changeHandel} />
              <br />
              <TextField name='user_pw' type='password' label='비밀번호' onChange={this.changeHandel} />
              <br />
            </div>
            <div className='login-button'>
              <MyButton onClick={() => this.setState({ isRegister: true })}>회원가입</MyButton>
              <MyButton type='submit'>로그인</MyButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
