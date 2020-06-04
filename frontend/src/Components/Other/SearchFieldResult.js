import React, { useState, useEffect } from 'react';
import './SearchField.css';

import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
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
import Snackbar from '../UI/Snackbar';

import axios from 'axios';

const SearchFieldResult = (props) => {
  const [userList, setUserList] = useState(props.data);
  const [groupList, setGroupList] = useState(undefined);
  const [followerIconClick, setFollowerIconClick] = useState(false);
  const [clickTab, setClickTab] = useState(0);
  const [alertDialog, setAlertDialog] = useState(null);

  const followerChange = (index, click) => {
    const array = userList.slice();
    array[index] = { ...array[index], isClick: click };
    setUserList(array);
  };

  const groupChange = (index, click) => {
    var array = groupList.slice();
    array[index] = { ...array[index], isClick: click };
    setGroupList(array);
  };

  const getGroupList = async () => {
    const { data } = await axios.get(`/group/findGroup/${props.searchText}`);
    const groupData = data.map((value) => {
      return {
        ...value,
        isClick: false,
      };
    });
    console.log(groupData);
    setGroupList(groupData);
  };

  useEffect(() => {
    if (clickTab === 1 && groupList === undefined) {
      getGroupList();
    }
  }, [clickTab]);

  const exfollowList = () => {
    return userList.map((value, index) => {
      return (
        <li key={value.userId} key={value.userId}>
          <div className='follower_list'>
            <Link to={`/profile/${value.userId}`}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt={`${value.userNm} img`}
                  style={{
                    marginRight: '10px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                  }}
                  src={value.userPic}
                />
                {value.userId}({value.userNm})
              </div>
            </Link>
            <div>
              {(() => {
                if (!value.isClick) {
                  return (
                    <FollowButton
                      key={`button-${value.userId}`}
                      onClick={async (e) => {
                        try {
                          const isSuccess = await axios.get(`/follow/${value.userCd}`);
                          if (isSuccess) {
                            setAlertDialog(
                              <Snackbar
                                severity='success'
                                content='팔로우 하였습니다.'
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                            followerChange(index, !value.isClick);
                            props.onSaveFriend(value);
                            return;
                          } else {
                            setAlertDialog(
                              <Snackbar
                                severity='error'
                                content='팔로우에 실패하였습니다.'
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                          }
                        } catch (error) {
                          console.error(error);
                          setAlertDialog(
                            <Snackbar
                              severity='error'
                              content='서버에러로 팔로우에 실패하였습니다.'
                              onClose={() => {
                                setAlertDialog(null);
                              }}
                            />
                          );
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
                          const isSuccess = (await axios.delete(`/unFollow/${value.userCd}`)).data;
                          if (isSuccess) {
                            setAlertDialog(
                              <Snackbar
                                severity='success'
                                content='팔로우를 취소하였습니다.'
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                            followerChange(index, !value.user_click);
                            return;
                          } else {
                            setAlertDialog(
                              <Snackbar
                                severity='error'
                                content='팔로우 취소에 실패하였습니다.'
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                            return;
                          }
                        } catch (error) {
                          console.log(error);
                          setAlertDialog(
                            <Snackbar
                              severity='error'
                              content='서버에러로 팔로우 취소에 실패하였습니다.'
                              onClose={() => {
                                setAlertDialog(null);
                              }}
                            />
                          );
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
    });
  };

  const exGroupList = () => {
    if (groupList === undefined) {
      return (
        <div style={{ height: '200px', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
      );
    } else {
      return groupList.map((value, index) => {
        return (
          <li key={value.groupCd}>
            <div className='follower_list'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt={`${value.groupNm} img`}
                  style={{
                    marginRight: '10px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                  }}
                  src={value.groupPic}
                />
                {value.groupNm}
              </div>
              <div>
                {(() => {
                  if (!value.isClick) {
                    return (
                      <FollowButton
                        onClick={async (e) => {
                          try {
                            const { data } = await axios.post('/groupApply/create', {
                              groupCd: value.groupCd,
                              userCd: props.userCd,
                              applyState: 2,
                            });
                            console.log(data);
                            if (data) {
                              setAlertDialog(
                                <Snackbar
                                  severity='success'
                                  content='그룹 신청을 보냈습니다.'
                                  onClose={() => {
                                    setAlertDialog(null);
                                  }}
                                />
                              );
                            } else {
                              setAlertDialog(
                                <Snackbar
                                  severity='error'
                                  content='이미 신청을 보냈습니다.'
                                  onClose={() => {
                                    setAlertDialog(null);
                                  }}
                                />
                              );
                            }
                            groupChange(index, !value.isClick);
                          } catch (error) {
                            setAlertDialog(
                              <Snackbar
                                severity='error'
                                content={`${error}`}
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                          }
                          return;
                        }}
                      >
                        <HowToRegIcon style={{ fontSize: '20px' }} />
                      </FollowButton>
                    );
                  } else {
                    return (
                      <FollowButton
                        onClick={async (e) => {
                          try {
                            console.log({ groupCd: value.groupCd, userCd: props.userCd });
                            const { data } = await axios.post('/groupApply/delete', {
                              groupCd: value.groupCd,
                              userCd: props.userCd,
                            });
                            console.log(data);

                            if (data) {
                              setAlertDialog(
                                <Snackbar
                                  severity='success'
                                  content='그룹 신청을 취소하였습니다.'
                                  onClose={() => {
                                    setAlertDialog(null);
                                  }}
                                />
                              );
                              groupChange(index, !value.isClick);
                              return;
                            }
                            setAlertDialog(
                              <Snackbar
                                severity='error'
                                content='그룹 신청에 실패하였습니다.'
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                          } catch (error) {
                            setAlertDialog(
                              <Snackbar
                                severity='error'
                                content={`${error}`}
                                onClose={() => {
                                  setAlertDialog(null);
                                }}
                              />
                            );
                          }
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
    }
  };

  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => props.onCancel()}>
      <div className='searchField-result'>
        <div className='searchField-title' style={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon
            style={{
              fontSize: '30px',
              color: 'white',
            }}
          />
          <div style={{ marginLeft: '10px', color: 'white', fontSize: '20px' }}>
            '{props.searchText}'(으)로 검색한 결과
          </div>
        </div>
        <hr />
        <div className='searchField-result-list'>
          <div className='group-follow_change'>
            <div>
              <Paper square style={{ marginBottom: '10px' }}>
                <Tabs
                  value={clickTab}
                  indicatorColor='primary'
                  textColor='primary'
                  onChange={(e, newValue) => setClickTab(newValue)}
                  aria-label='disabled tabs example'
                >
                  <Tab label='Follow' icon={<HowToRegIcon />} />
                  <Tab label='Group' icon={<GroupIcon />} />
                </Tabs>
              </Paper>
            </div>
            <div className='follower_list'>
              <ul>{clickTab === 0 ? exfollowList() : exGroupList()}</ul>
            </div>
          </div>
        </div>
      </div>
      {alertDialog}
    </Dialog>
  );
};

const FollowButton = styled(Button)({
  minWidth: '30px',
  height: '40px',
});

export default SearchFieldResult;
