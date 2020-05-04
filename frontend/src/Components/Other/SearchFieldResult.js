import React from 'react';
import './SearchField.css';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GroupIcon from '@material-ui/icons/Group';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '../UI/Snackbar';
import store from '../../store';

import axios from 'axios';

class SearchFieldResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      userSearch: props.userSearch,
      followerIconClick: false,
      clickTab: 0,
      alertDialog: () => {},
    };
  }

  followerChange = (index, click) => {
    const array = this.state.data.searchedUser;
    array[index] = { ...array[index], isClick: click };

    this.setState({ searchedUser: array });
  };

  groupChange = (index, click) => {
    const array = this.state.data.searchedGroup;
    array[index] = { ...array[index], isClick: click };

    this.setState({ searchedGroup: array });
  };

  exfollowList = () => {
    return this.state.data.searchedUser.map((value, index) => {
      if (value.userCd !== store.getState().user.userCd) {
        return (
          <li key={value.userId} key={value.userId}>
            <div className='follower_list'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt='friend-img'
                  style={{
                    height: '40px',
                    marginRight: '10px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  src={value.userPic}
                />
                <div style={{ fontSize: '15px' }}>{value.userNm}</div>
              </div>
              <div>
                {(() => {
                  if (!value.isClick) {
                    return (
                      <FollowButton
                        key={`button-${value.userId}`}
                        onClick={async (e) => {
                          try {
                            const isSuccess = await axios.get(`/follow/${value.userId}`);
                            if (isSuccess) {
                              this.setState({
                                alertDialog: () => {
                                  return (
                                    <Snackbar
                                      severity='success'
                                      content='팔로우 하였습니다.'
                                      onClose={() => {
                                        this.setState({ alertDialog: () => {} });
                                      }}
                                    />
                                  );
                                },
                              });
                              this.followerChange(index, !value.isClick);
                              this.props.onSaveFriend(value);
                              return;
                            } else {
                              this.setState({
                                alertDialog: () => {
                                  return (
                                    <Snackbar
                                      severity='error'
                                      content='팔로우에 실패하였습니다.'
                                      onClose={() => {
                                        this.setState({ alertDialog: () => {} });
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
                                  <Snackbar
                                    severity='error'
                                    content='서버에러로 팔로우에 실패하였습니다.'
                                    onClose={() => {
                                      this.setState({ alertDialog: () => {} });
                                    }}
                                  />
                                );
                              },
                            });
                          }
                        }}
                      >
                        <AddIcon style={{ fontSize: '20px' }} />
                      </FollowButton>
                    );
                  } else {
                    return (
                      <FollowButton
                        onClick={async (e) => {
                          try {
                            const isSuccess = (await axios.delete(`/unFollow/${value.userId}`)).data;
                            if (isSuccess) {
                              this.setState({
                                alertDialog: () => {
                                  return (
                                    <Snackbar
                                      severity='success'
                                      content='팔로우를 취소하였습니다.'
                                      onClose={() => {
                                        this.setState({ alertDialog: () => {} });
                                      }}
                                    />
                                  );
                                },
                              });
                              this.followerChange(index, !value.user_click);
                              return;
                            } else {
                              this.setState({
                                alertDialog: () => {
                                  return (
                                    <Snackbar
                                      severity='error'
                                      content='팔로우 취소에 실패하였습니다.'
                                      onClose={() => {
                                        this.setState({ alertDialog: () => {} });
                                      }}
                                    />
                                  );
                                },
                              });
                              return;
                            }
                          } catch (error) {
                            console.log(error);
                            this.setState({
                              alertDialog: () => {
                                return (
                                  <Snackbar
                                    severity='error'
                                    content='서버에러로 팔로우 취소에 실패하였습니다.'
                                    onClose={() => {
                                      this.setState({ alertDialog: () => {} });
                                    }}
                                  />
                                );
                              },
                            });
                          }
                        }}
                      >
                        <HowToRegIcon style={{ fontSize: '20px' }} />
                      </FollowButton>
                    );
                  }
                })()}
              </div>
            </div>
          </li>
        );
      }
    });
  };

  exGroupList = () => {
    return this.state.data.searchedGroup.map((value, index) => {
      return (
        <li key={value.group_id}>
          <div className='follower_list'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <img
                alt='friend-img'
                style={{
                  marginRight: '10px',
                  borderRadius: '50%',
                }}
                src={value.group_pic}
              />
              {value.group_nm}
            </div>
            <div>
              {(() => {
                if (!value.group_click) {
                  return (
                    <FollowButton
                      onClick={async (e) => {
                        console.log(value);
                        e.preventDefault();
                        this.groupChange(index, !value.group_click);

                        const form = new FormData();
                        form.append('user_id', store.getState().user.currentUser.user_id);
                        form.append('group_cd', value.group_cd);
                        form.append('apply_state', 1);
                        const { data } = await axios.post('http://localhost:8080/apply', form);
                        if (data.isSuccess) {
                          console.log('완료');
                          return;
                        }
                        console.log('실패');
                      }}
                    >
                      <HowToRegIcon style={{ fontSize: '20px' }} />
                    </FollowButton>
                  );
                } else {
                  return (
                    <FollowButton
                      onClick={async (e) => {
                        console.log(value);
                        e.preventDefault();
                        this.groupChange(index, !value.group_click);

                        const form = new FormData();
                        form.append('user_id', store.getState().user.currentUser.user_id);
                        form.append('group_cd', value.group_cd);
                        const { data } = await axios.post('http://localhost:8080/apply/delete', form);
                        // .catch();
                        if (data.isDelete) {
                          console.log('완료');
                          return;
                        }
                        console.log('실패');
                      }}
                    >
                      <AddIcon style={{ fontSize: '20px' }} />
                    </FollowButton>
                  );
                }
              })()}
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => this.props.onCancel()}>
        <div className='searchField-result'>
          <div className='searchField-title' style={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon
              style={{
                fontSize: '30px',
                color: 'white',
                // marginTop: '5px',
              }}
            />
            <div style={{ marginLeft: '10px', color: 'white', fontSize: '20px' }}>
              '{this.state.userSearch}'(으)로 검색한 결과
            </div>
          </div>
          <hr />
          <div className='searchField-result-list'>
            <div className='group-follow_change'>
              <div>
                <Paper square style={{ marginBottom: '10px' }}>
                  <Tabs
                    value={this.state.clickTab}
                    indicatorColor='primary'
                    textColor='primary'
                    onChange={(e, newValue) =>
                      this.setState({
                        clickTab: newValue,
                      })
                    }
                    aria-label='disabled tabs example'
                  >
                    <Tab label='Follow' icon={<HowToRegIcon />} />
                    <Tab label='Group' icon={<GroupIcon />} />
                  </Tabs>
                </Paper>
              </div>
              <div className='follower_list'>
                <ul>{this.state.clickTab === 0 ? this.exfollowList() : this.exGroupList()}</ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.alertDialog()}
      </Dialog>
    );
  }
}

const FollowButton = styled(Button)({
  minWidth: '30px',
  height: '40px',
});

export default SearchFieldResult;
