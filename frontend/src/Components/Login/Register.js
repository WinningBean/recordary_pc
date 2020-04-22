import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Spinner from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';

class Register extends React.Component {
  state = {
    user_nm: '',
    user_id: '',
    user_pw: '',
    user_pw_check: '',
    isSamePw: undefined,
    alert: () => {},
    alertDialog: () => {},
  };
  changeHandel = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const alertLabel = (() => {
      if (this.state.isSamePw === true) {
        return <span style={{ color: '#2ecc71' }}>비밀번호가 같습니다.</span>;
      } else if (this.state.isSamePw === false) {
        return <span style={{ color: '#e74c3c' }}>비밀번호가 다릅니다.</span>;
      }
      return null;
    })();
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
        <div className='dialog-wrap' style={{ width: '360px', height: 'auto' }}>
          <div className='dialog-header'>
            <div className='dialog-header-icon'>
              <AccountCircleIcon style={{ fontSize: '44px' }} />
            </div>
            &nbsp;
            <span>회원가입</span>
          </div>
          <form
            method='POST'
            onSubmit={async (e) => {
              e.preventDefault();
              // const nameRules = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
              // if (!nameRules.test(this.state.user_nm)) {
              //     this.setState({
              //         alertDialog: () => {
              //             return (
              //                 <AlertDialog
              //                     severity="error"
              //                     content="이름이 옳바르지않습니다 다시 작성해주세요."
              //                     onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
              //             )
              //         }
              //     })
              //     return;
              // }
              // if (this.state.user_id === "") {
              //     this.setState({
              //         alertDialog: () => {
              //             return (
              //                 <AlertDialog
              //                     severity="error"
              //                     content="아이디를 입력하세요."
              //                     onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
              //             )
              //         }
              //     })
              //     return;
              // }
              // if (this.state.user_pw === "") {
              //     this.setState({
              //         alertDialog: () => {
              //             return (
              //                 <AlertDialog
              //                     severity="error"
              //                     content="패스워드를 입력하세요."
              //                     onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
              //             )
              //         }
              //     })
              //     return;
              // }
              // if (!this.state.isSamePw) {
              //     this.setState({
              //         alertDialog: () => {
              //             return (
              //                 <AlertDialog
              //                     severity="error"
              //                     content="패스워드가 같지않습니다."
              //                     onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
              //             )
              //         }
              //     })
              //     return;
              // }
              // // const passwordRules = /^[a-zA-Z0-9]{10,15}$/;
              // const passwordRules = /^[0-9]{4,15}$/;
              // if (!passwordRules.test(this.state.user_pw)) {
              //     this.setState({
              //         alertDialog: () => {
              //             return (
              //                 <AlertDialog
              //                     severity="error"
              //                     content="패스워드는 숫자와 영문자 조합으로 10~15자리를 사용해야 합니다."
              //                     onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
              //             )
              //         }
              //     })
              //     return;
              // }
              this.setState({
                alert: () => {
                  return (
                    <Spinner
                      style={{
                        position: 'absolute',
                        top: '30px',
                        left: '100px',
                      }}
                    />
                  );
                },
              });
              try {
                const isExistId = (await axios.get(`/user/existId/${this.state.user_id}`)).data;
                console.log(isExistId);
                if (isExistId) {
                  this.setState({
                    alert: () => {
                      return (
                        <Alert severity='error'>
                          <AlertTitle>Error</AlertTitle>
                          이미 존재하는 아이디입니다.
                        </Alert>
                      );
                    },
                  });
                  return;
                }

                const isJoin = (
                  await axios.post('/user/join', {
                    userNm: this.state.user_nm,
                    userId: this.state.user_id,
                    userPw: this.state.user_pw,
                  })
                ).data;

                if (!isJoin) {
                  this.setState({
                    alert: () => {
                      return (
                        <Alert severity='error'>
                          <AlertTitle>Error</AlertTitle>
                          회원가입에 실패하였습니다.
                        </Alert>
                      );
                    },
                  });
                  return;
                }
                this.props.onSuccessRegister();
              } catch (error) {
                console.error(error);
                this.setState({
                  alert: () => {
                    return (
                      <Alert severity='error'>
                        <AlertTitle>Error</AlertTitle>
                        서버 문제로 인해 회원가입에 실패하였습니다. 다시 한번 시도해주세요.
                      </Alert>
                    );
                  },
                });
              }
            }}
          >
            <div
              className='register-text'
              style={{
                position: 'relative',
                padding: '10px 30px',
                marginTop: '10px',
              }}
            >
              <TextField
                name='user_nm'
                autoFocus
                label='이름'
                onChange={this.changeHandel}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <br />
              <TextField
                name='user_id'
                label='아이디'
                onChange={this.changeHandel}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <br />
              <TextField
                name='user_pw'
                type='password'
                label='비밀번호'
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => {
                  this.changeHandel(e);
                  if (e.target.value === '' || this.state.user_pw_check === '') {
                    this.setState({ isSamePw: undefined });
                    return;
                  }
                  if (this.state.user_pw_check === e.target.value) {
                    this.setState({ isSamePw: true });
                    return;
                  }
                  this.setState({ isSamePw: false });
                }}
              />
              <br />
              <TextField
                name='user_pw_check'
                type='password'
                style={{ width: '300px', marginBottom: '10px' }}
                label='비밀번호 확인'
                onChange={(e) => {
                  this.changeHandel(e);
                  if (e.target.value === '' || this.state.user_pw === '') {
                    this.setState({ isSamePw: undefined });
                    return;
                  }
                  if (this.state.user_pw === e.target.value) {
                    this.setState({ isSamePw: true });
                    return;
                  }
                  this.setState({ isSamePw: false });
                }}
              />
              <br />
              {this.state.alert()}
            </div>
            <DialogActions style={{ marginRight: '20px' }}>
              {alertLabel}
              <Button onClick={() => this.props.onClickCancel()}>취소</Button>
              <Button type='submit' color='primary'>
                회원가입
              </Button>
            </DialogActions>
          </form>
          {this.state.alertDialog()}
        </div>
      </Dialog>
    );
  }
}

export default Register;
