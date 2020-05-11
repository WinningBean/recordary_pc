import React, { useState, useEffect } from 'react';
import './header.css';
import GroupAdd from '../../Containers/Group/GroupAdd';
import LongMenu from '../Other/MoreMenu';
import ProfileEditor from '../../Containers/Profile/ProfileEditor';
import GroupSetting from '../Group/GroupSetting';
import GroupInfo from '../Group/GroupInfo';
import SettingMenu from './SettingMenu';
import FriendAdd from '../Group/GroupMemberSearch';
import FriendSetting from './FriendSetting';
import AlertDialog from '../Other/AlertDialog';

import { styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

const ColorCircularProgress = withStyles({
  root: {
    color: '#00695c',
  },
})(CircularProgress);

const HeaderMenu = (props) => {
  const [data, setData] = useState({
    ...props.data,
  });

  const [profileEditForm, setProfileEditForm] = useState(null);
  // const [editor, setEditor] = useState(null);
  const [setting, setSetting] = useState(null);
  const [isGroup, setIsGroup] = useState(true);
  const [groupAdd, setGroupAdd] = useState(null);
  const [menuDialog, setMenuDialog] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  if (isLogout) {
    return <Redirect to='/' />;
  }

  const onGroupMenuSelect = (selectedValue, code) => {
    const value = props.groupList.filter((value) => value.groupCd === code)[0];
    // 그룹목록에서 현재 선택된 그룹 객체를 찾음
    console.log(selectedValue, code);
    switch (selectedValue) {
      case '그룹 정보':
        setMenuDialog(
          <GroupInfo
            onClose={() => setMenuDialog(null)}
            data={{
              userCd: props.data.userCd,
              group: value,
            }}
          />
        );
        break;
      case '그룹 관리':
        setMenuDialog(
          <GroupSetting
            onClose={() => setMenuDialog(null)}
            data={{
              userCd: data.userCd,
              group: value,
            }}
          />
        );
        break;
    }
  };

  const onFriendMenuSelect = (selectedValue, code) => {
    const value = props.friendList.filter((value) => value.userId === code)[0];
    switch (selectedValue) {
      case '친구 관리':
        setMenuDialog(
          <FriendSetting
            onClose={() => setMenuDialog(null)}
            data={{
              user_id: data.userId,
              friend: value,
            }}
          />
        );
        break;
      case '메시지 보내기':
        break;
    }
  };
  const showGroupAdd = () => {
    if (groupAdd === null) {
      setGroupAdd(<GroupAdd data={data} onCancel={() => setGroupAdd(null)} />);
      return;
    }
    setGroupAdd(null);
    return;
  };

  const showFriendAdd = () => {
    if (groupAdd === null) {
      setGroupAdd(
        <FriendAdd
          onCancel={() => setGroupAdd(null)}
          onAdd={() => {
            console.log('친구추가 요청 보냄');
            setGroupAdd(null);
          }}
        />
      );
      return;
    }
    setGroupAdd(null);
    return;
  };

  const ShowProfileEditForm = () => {
    if (profileEditForm === null) {
      setProfileEditForm(<ProfileEditor data={data} onCancel={() => setProfileEditForm(null)} />);
      return;
    }
    setProfileEditForm(null);
    return;
  };

  const GroupList = () => {
    if (props.groupList === undefined) {
      getGroupList();
      return (
        <div style={{ width: 250, display: 'flex', justifyContent: 'center' }}>
          <ColorCircularProgress />
        </div>
      );
    } else {
      return props.groupList.map((value, index) => {
        return (
          <li key={`groups-${index}`}>
            <div className='button-wrap'>
              <Link to={`/group/${value.groupCd}`}>
                <GroupButton>
                  <div
                    style={{
                      display: 'flex',
                      // width: '232px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                      }}
                    >
                      <img
                        alt='group-img'
                        style={{
                          marginRight: '10px',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                        }}
                        src={'http://placehold.it/40x40'}
                      />
                      {value.groupNm}
                    </div>
                  </div>
                </GroupButton>
              </Link>
              <div className='LongMenuOpen'>
                <LongMenu options={['그룹 정보', '그룹 관리']} code={value.groupCd} returnValue={onGroupMenuSelect} />
              </div>
            </div>
          </li>
        );
      });
    }
  };

  const getGroupList = async () => {
    try {
      console.log(props.data.userCd);
      const { data } = await axios.get(`/group/group/${props.data.userCd}`);
      console.log(data, 'isData');
      if (data.length === 0) {
        props.onSaveGroupList([]);
      }
      props.onSaveGroupList(data);
    } catch (error) {
      console.error(error);
      setMenuDialog(() => (
        <AlertDialog
          severity='error'
          content='서버에러로 인하여 데이터를 받아오는데 실패하였습니다.'
          onAlertClose={() => setMenuDialog(null)}
        />
      ));
    }
  };

  const getFriendList = async () => {
    try {
      const { data } = await axios.get(`/friends/${props.data.userId}`);
      if (data === '') {
        props.onSaveFriendList([]);
      }
      props.onSaveFriendList(data);
    } catch (error) {
      console.error(error);
      setMenuDialog(() => (
        <AlertDialog
          severity='error'
          content='서버에러로 인하여 데이터를 받아오는데 실패하였습니다.'
          onAlertClose={() => setMenuDialog(null)}
        />
      ));
    }
  };

  const FriendList = () => {
    if (props.friendList === undefined) {
      getFriendList();
      return (
        <div style={{ width: 250, display: 'flex', justifyContent: 'center' }}>
          <ColorCircularProgress />
        </div>
      );
    } else {
      return props.friendList.map((value, index) => {
        return (
          <li key={`friend-${index}`}>
            <div className='button-wrap'>
              <GroupButton>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {/* 우선 redux에 저장하지 않음 */}
                  {value.userPic === null ? (
                    <img
                      alt='friend-img'
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        marginRight: '10px',
                        borderRadius: '50%',
                      }}
                      src={'http://placehold.it/250x250'}
                    />
                  ) : (
                    <img
                      alt='friend-img'
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        marginRight: '10px',
                        borderRadius: '50%',
                      }}
                      src={value.userPic}
                    />
                  )}
                  {value.userId}({value.userNm})
                </div>
              </GroupButton>
              <div className='LongMenuOpen'>
                <LongMenu
                  options={['친구 관리', '메시지 보내기']}
                  code={value.userId}
                  returnValue={onFriendMenuSelect}
                />
              </div>
            </div>
          </li>
        );
      });
    }
  };

  const showSetting = () => {
    if (setting === null) {
      setSetting(<SettingMenu data={data} onClose={() => setSetting(null)} />);
      return;
    }
    setSetting(null);
    return;
  };

  return (
    <Drawer
      open={props.open}
      onClose={() => props.onClose()}
      style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}
      anchor='left'
    >
      <div className='menu-wrap'>
        <div className='menu-profile'>
          <div className='menu-profile-pic-nm'>
            <div style={{ marginRight: '10px' }}>
              {data.userPic === null
                ? setData({
                    ...data,
                    userPic: 'https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/basic.png',
                  })
                : null}

              <img alt='userPic' src={data.userPic} style={{ borderRadius: '50%', width: '30px', overFit: 'cover' }} />
            </div>
            <span>
              {data.userId}({data.userNm})
            </span>
          </div>
          <div className='profile-edit-icon'>
            <CustomIconButton onClick={ShowProfileEditForm}>
              <EditIcon style={{ color: 'white' }} />
            </CustomIconButton>
          </div>
          {profileEditForm}
        </div>
        <div style={{ display: 'flex', height: '62px' }}>
          <Button
            style={{
              flex: 1,
              height: '62px',
            }}
            onClick={() => {
              if (isGroup) {
                return;
              }
              setIsGroup(true);
            }}
          >
            <div
              style={{
                height: '50px',
                textAlign: 'center',
                lineHeight: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              그룹
            </div>
          </Button>
          <Button
            style={{
              flex: 1,
              height: '62px',
            }}
            onClick={() => {
              if (!isGroup) {
                return;
              }
              setIsGroup(false);
            }}
          >
            <div
              style={{
                height: '50px',
                textAlign: 'center',
                lineHeight: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              친구
            </div>
          </Button>
        </div>
        <div
          className='transition-all'
          style={{
            width: '125px',
            height: '1px',
            backgroundColor: 'black',
            transform: isGroup ? 'translateX(0px)' : 'translateX(125px)',
          }}
        />
        <ul>{isGroup ? GroupList() : FriendList()}</ul>
        <div className='menu-bottom'>
          <CustomIconButton onClick={showSetting}>
            <SettingsIcon />
          </CustomIconButton>
          <CustomIconButton
            onClick={async () => {
              try {
                const isSuccess = await axios.get('/user/logout');
                if (isSuccess) {
                  setIsLogout(true);
                } else {
                  setMenuDialog(() => (
                    <AlertDialog
                      severity='error'
                      content='로그아웃에 실패하였습니다.'
                      onAlertClose={() => setMenuDialog(null)}
                    />
                  ));
                }
              } catch (error) {
                console.error(error);
                setMenuDialog(() => (
                  <AlertDialog
                    severity='error'
                    content='서버에러로 인해 로그아웃에 실패하였습니다.'
                    onAlertClose={() => setMenuDialog(null)}
                  />
                ));
              }
            }}
          >
            Logout
          </CustomIconButton>
        </div>
        {/* {editor} */}
        {setting}
        {groupAdd}
        {menuDialog}
      </div>
    </Drawer>
  );
};

const CustomIconButton = styled(Button)({
  minWidth: '40px',
  height: '40px',
});
const GroupButton = styled(Button)({
  width: '250px',
  height: '50px',
  borderBottom: '1px solid rgba(209, 204, 192,0.8)',
  borderRadius: '0',
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
});

export default HeaderMenu;

// export default React.memo(HeaderMenu, (props, newProps) => {
//   console.log(props, newProps);
//   return props === newProps;
//   // false 일시 랜더링
//   // true 일시 비랜더링
// });
