import React from 'react';
import './UserEditor.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core';
import axios from 'axios';
import AlertDialog from '../Other/AlertDialog';
import { Redirect } from 'react-router-dom';

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_nm: '',
      user_id: props.data.userId,
      user_pw: '',
      user_change_pw: '',
      user_change_pw_check: '',
      isSamePw: undefined,
      alertDialog: () => {},
    };
  }

  changeHandel = (e) => {
    this.setState({
      ...this.state,
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
    console.log(this.state);
    return (
      <div className='dialog-wrap'>
        <div className='user-editor'>
          <div className='editor-info-text'>
            <UserEditTextField
              name='user_nm'
              autoFocus
              label='이름'
              defaultValue={this.props.data.userNm}
              onChange={this.changeHandel}
            />
            <UserEditTextField name='user_id' disabled label='아이디' defaultValue={this.props.data.userId} />
            <UserEditTextField
              name='user_pw'
              type='password'
              required
              label='현재 패스워드'
              onChange={this.changeHandel}
            />
            <UserEditTextField
              name='user_change_pw'
              type='password'
              label='바꿀 패스워드'
              onChange={(e) => {
                this.changeHandel(e);
                if (e.target.value === '' || this.state.user_change_pw_check === '') {
                  this.setState({ isSamePw: undefined });
                  return;
                }
                if (this.state.user_change_pw_check === e.target.value) {
                  this.setState({ isSamePw: true });
                  return;
                }
                this.setState({ isSamePw: false });
              }}
            />
            <UserEditTextField
              name='user_change_pw_check'
              type='password'
              label='패스워드 확인'
              onChange={(e) => {
                this.changeHandel(e);
                if (e.target.value === '' || this.state.user_change_pw === '') {
                  this.setState({ isSamePw: undefined });
                  return;
                }
                if (this.state.user_change_pw === e.target.value) {
                  this.setState({ isSamePw: true });
                  return;
                }
                this.setState({ isSamePw: false });
              }}
            />
            <br />
            {alertLabel}
          </div>

          <div className='editor-info-buttons'>
            <EditorButton
              color='secondary'
              onClick={async () => {
                try {
                  const checkPw = (
                    await axios.post('/user/checkPw', {
                      userId: this.state.user_id,
                      userPw: this.state.user_pw,
                    })
                  ).data;
                  console.log(checkPw);

                  if (!checkPw) {
                    this.setState({
                      alertDialog: () => {
                        return (
                          <AlertDialog
                            severity='error'
                            content='비밀번호가 옳바르지 않습니다.'
                            onAlertClose={() => {
                              this.setState({
                                alertDialog: () => {},
                              });
                            }}
                          />
                        );
                      },
                    });
                    return;
                  }

                  const isDelete = window.confirm('정말 탈퇴 하시겠습니까???');
                  if (!isDelete) {
                    return;
                  }

                  const userId = (await axios.delete(`/user/${this.state.user_id}`)).data;
                  if (userId === this.state.user_id) {
                    this.setState({
                      alertDialog: () => {
                        return (
                          <AlertDialog
                            severity='success'
                            content='정상적으로 탈퇴 되었습니다.'
                            onAlertClose={() => {
                              this.setState({
                                alertDialog: () => {
                                  return <Redirect to='/' />;
                                },
                              });
                            }}
                          />
                        );
                      },
                    });

                    return;
                  }
                } catch (error) {
                  console.error(error);
                  this.setState({
                    alertDialog: () => {
                      return (
                        <AlertDialog
                          severity='error'
                          content='서버 오류로 인해 회원정보 수정에 실패하였습니다.'
                          onAlertClose={() => {
                            this.setState({
                              alertDialog: () => {},
                            });
                          }}
                        />
                      );
                    },
                  });
                }
              }}
            >
              회원정보 삭제
            </EditorButton>
            <EditorButton
              onClick={async () => {
                // const nameRules = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
                // if (!nameRules.test(this.state.user_nm)) {
                //   this.setState({
                //     alertDialog: () => {
                //       return (
                //         <AlertDialog
                //           severity='error'
                //           content='이름이 옳바르지않습니다 다시 작성해주세요.'
                //           onAlertClose={() => {
                //             this.setState({
                //               alertDialog: () => {},
                //             });
                //           }}
                //         />
                //       );
                //     },
                //   });
                //   return;
                // }
                // if (this.state.user_pw === '') {
                //   this.setState({
                //     alertDialog: () => {
                //       return (
                //         <AlertDialog
                //           severity='error'
                //           content='패스워드를 입력하세요.'
                //           onAlertClose={() => {
                //             this.setState({
                //               alertDialog: () => {},
                //             });
                //           }}
                //         />
                //       );
                //     },
                //   });
                //   return;
                // }
                // if (this.state.user_change_pw !== '' || this.state.user_change_pw_check !== '') {
                //   if (!this.state.isSamePw) {
                //     this.setState({
                //       alertDialog: () => {
                //         return (
                //           <AlertDialog
                //             severity='error'
                //             content='바꿀 패스워드가 같지않습니다.'
                //             onAlertClose={() => {
                //               this.setState({
                //                 alertDialog: () => {},
                //               });
                //             }}
                //           />
                //         );
                //       },
                //     });
                //     return;
                //   }
                //   const passwordRules = /^[a-zA-Z0-9]{10,15}$/;
                //   if (!passwordRules.test(this.state.user_change_pw)) {
                //     this.setState({
                //       alertDialog: () => {
                //         return (
                //           <AlertDialog
                //             severity='error'
                //             content='패스워드는 숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.'
                //             onAlertClose={() => {
                //               this.setState({
                //                 alertDialog: () => {},
                //               });
                //             }}
                //           />
                //         );
                //       },
                //     });
                //     return;
                //   }
                // }
                try {
                  const checkPw = (
                    await axios.post('/user/checkPw', {
                      userId: this.state.user_id,
                      userPw: this.state.user_pw,
                    })
                  ).data;
                  console.log(checkPw);

                  if (!checkPw) {
                    this.setState({
                      alertDialog: () => {
                        return (
                          <AlertDialog
                            severity='error'
                            content='비밀번호가 옳바르지 않습니다.'
                            onAlertClose={() => {
                              this.setState({
                                alertDialog: () => {},
                              });
                            }}
                          />
                        );
                      },
                    });
                    return;
                  }

                  const { data } = await axios.put(`user/${this.state.user_id}`, {
                    userPw: this.state.user_change_pw,
                    userNm: this.state.user_nm,
                  });
                  if (data === this.state.user_id) {
                    this.setState({
                      alertDialog: () => {
                        return (
                          <AlertDialog
                            severity='success'
                            content='회원정보가 수정되었습니다.'
                            onAlertClose={() => {
                              this.setState({
                                alertDialog: () => {},
                              });
                            }}
                          />
                        );
                      },
                    });
                    return;
                  }
                  return;
                } catch (error) {
                  console.error(error);
                  this.setState({
                    alertDialog: () => {
                      return (
                        <AlertDialog
                          severity='error'
                          content='서버 오류로 인해 회원정보 수정에 실패하였습니다.'
                          onAlertClose={() => {
                            this.setState({
                              alertDialog: () => {},
                            });
                          }}
                        />
                      );
                    },
                  });
                }
              }}
            >
              수정
            </EditorButton>
          </div>
        </div>
        {this.state.alertDialog()}
      </div>
    );
  }
}

const EditorButton = styled(Button)({
  height: '50px',
  fontSize: '15px',
});

const UserEditTextField = styled(TextField)({
  width: '400px',
  height: '60px',
  fontSize: '15px',
});

export default UserEditor;
