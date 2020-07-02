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
import Input from '@material-ui/core/Input';
import SearchAppBar from '../Other/SearchField';

class Login extends React.Component {
  state = {
    isRegister: false,
    successRegister: () => {},
    failedLogin: () => {},
    user_id: '',
    user_pw: '',
    loading: false,
  };

  changeHandel = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandel = async (e) => {
    e.preventDefault();
    if (this.state.user_id === '') {
      this.setState({
        failedLogin: () => {
          return (
            <AlertDialog
              severity='error'
              content='아이디를 작성하세요.'
              onAlertClose={() => {
                this.setState({ failedLogin: () => {} });
              }}
            />
          );
        },
      });
      return;
    }
    if (this.state.user_pw === '') {
      this.setState({
        failedLogin: () => {
          return (
            <AlertDialog
              severity='error'
              content='비밀번호를 작성하세요.'
              onAlertClose={() => {
                this.setState({ failedLogin: () => {} });
              }}
            />
          );
        },
      });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const isExistId = (await axios.get(`/user/existId/${this.state.user_id}`)).data;
      console.log(isExistId);
      if (!isExistId) {
        this.setState({
          failedLogin: () => {
            return (
              <AlertDialog
                severity='error'
                content='존재하지 않는 아이디입니다.'
                onAlertClose={() => {
                  this.setState({ failedLogin: () => {} });
                }}
              />
            );
          },
        });
        return;
      }

      const { data } = await axios.post('/user/login', {
        userId: this.state.user_id,
        userPw: this.state.user_pw,
      });
      console.log(data, 'is data');

      if (data === '') {
        this.setState({
          failedLogin: () => {
            return (
              <AlertDialog
                severity='error'
                content={`로그인에 실패하였습니다.아이디/비밀번호를 확인해주세요.`}
                onAlertClose={() => {
                  this.setState({ failedLogin: () => {} });
                }}
              />
            );
          },
        });
        return;
      }

      this.props.onSavaUserData(data);
      this.props.onLogin();
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
        },
      });
    }
  };

  render() {
    const MyButton = styled(Button)({
      width: '200px',
      backgroundColor: 'rgba(20, 81, 51, 0.8)',
      marginBottom: '10px',
      color: 'white',
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
                          successRegister: () => {},
                        });
                      }}
                    />
                  );
                },
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
        <div className='page_info'>
          <div>
            <Link to='/main'>
              <video autoplay='autoplay'
                muted='muted'
                width='675px'
                height='200px'
                src="https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.webm"
                poster="https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png"/>
              {/* <img
                  className='title-image'
                  alt='Recordary icon'
                  src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                /> */}
            </Link>
            <div className='Recordary-infoMsg'>Record + Diary = 일정을 기록하며 일기처럼 기억하다.</div>
            <div className='search-user'>
              <SearchAppBar userCd={this.props.userCd} isLogin={false} />
            </div>
          </div>
          <form action='go_to_main' onSubmit={this.loginHandel}>
            {this.state.successRegister()}
            {this.state.failedLogin()}
            <div className='login-form'>
              <div className='login-text'>
                <TextField name='user_id' label='아이디' onChange={this.changeHandel} />
                <br />
                <TextField name='user_pw' type='password' label='비밀번호' onChange={this.changeHandel} />
                <br />
              </div>
              <div className='login-button'>
                <MyButton type='submit'>로그인</MyButton>
                <div onClick={() => this.setState({ isRegister: true })}>회원가입하시겠습니까?</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
