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
                content='로그인에 실패하였습니다.'
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
        },
      });
    }
  };

  render() {
    const MyButton = styled(Button)({
      backgroundColor: '#bdc3c7',
      marginRight: '10px',
      color: 'black',
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
