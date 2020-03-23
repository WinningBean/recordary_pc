import React, { useState } from 'react';
import './header.css';
import GroupAdd from 'Containers/Group/GroupAdd';
import LongMenu from 'Components/Other/MoreMenu';
import ProfileEditor from 'Components/Profile/ProfileEditor';
import GroupSetting from 'Components/Group/GroupSetting';
import GroupInfo from 'Components/Group/GroupInfo';
import SettingMenu from 'Components/Header/SettingMenu';

import { styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const HeaderMenu = props => {
  const data = props.data;
  const [profileEditForm, setProfileEditForm] = useState(null);
  // const [editor, setEditor] = useState(null);
  const [setting, setSetting] = useState(null);
  const [open, setOpen] = useState({
    group: false,
    friend: false
  });
  const [groupAdd, setGroupAdd] = useState(null);
  const [menuDialog, setMenuDialog] = useState(null);

  const showOpen = isGroup => {
    if (isGroup) {
      setOpen({ ...open, group: !open.group });
      return;
    }
    setOpen({ ...open, friend: !open.friend });
    return;
  };

  console.log(menuDialog);

  const onGroupMenuSelect = (selectedValue, code) => {
    const value = data.userGroup.filter(value => value.group_cd === code)[0];
    // 그룹목록에서 현재 선택된 그룹 객체를 찾음
    console.log(selectedValue, code);
    switch (selectedValue) {
      case '그룹 정보':
        setMenuDialog(
          <GroupInfo
            onClose={() => setMenuDialog(null)}
            data={{
              user_id: data.currentUser.user_id,
              group: value
            }}
          />
        );
        break;
      case '그룹 관리':
        setMenuDialog(
          <GroupSetting
            onClose={() => setMenuDialog(null)}
            data={{
              user_id: data.currentUser.user_id,
              group: value
            }}
          />
        );
        break;
    }
  };

  const onFriendMenuSelect = (selectedValue, code) => {
    const value = data.userFriend.filter(value => value.user_id === code)[0];
    switch (selectedValue) {
      case '친구 관리':
        break;
    }
  };
  const showGroupAdd = () => {
    if (groupAdd === null) {
      setGroupAdd(<GroupAdd onCancel={() => setGroupAdd(null)} />);
      return;
    }
    setGroupAdd(null);
    return;
  };

  const ShowProfileEditForm = () => {
    if (profileEditForm === null) {
      setProfileEditForm(<ProfileEditor onCancel={() => setProfileEditForm(null)} />);
      return;
    }
    setProfileEditForm(null);
    return;
  };

  const GroupList = () => {
    if (open.group === true) {
      const groups = data.userGroup.map((value, index) => {
        return (
          <li key={`groups-${index}`}>
            <div className='button-wrap'>
              <GroupButton>
                <div
                  style={{
                    display: 'flex',
                    width: '250px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <img
                      alt='group-img'
                      style={{
                        marginRight: '10px',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover'
                      }}
                      src={value.group_pic}
                    />
                    {value.group_nm}
                  </div>
                </div>
              </GroupButton>
              <div className='LongMenuOpen'>
                <LongMenu
                  options={['그룹 정보', '그룹 관리']}
                  code={value.group_cd}
                  returnValue={onGroupMenuSelect}
                />
              </div>
            </div>
          </li>
        );
      });
      return (
        <div className='button-wrap'>
          <GroupButton
            style={{ backgroundColor: 'rgba(209, 204, 192,0.4)' }}
            onClick={() => showOpen(true)}
          >
            <div>
              <span style={{ fontSize: '18px', paddingTop: '5px', fontWeight: 'bold' }}>그룹</span>
            </div>
            <span style={{ marginTop: '5px' }}>
              <ArrowUp style={{ fontSize: '30px' }} />
            </span>
          </GroupButton>
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '40px'
            }}
          >
            <IconButton onClick={showGroupAdd}>
              <AddIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </div>
          <div>
            <ul>{groups}</ul>
          </div>
        </div>
      );
    }
    return (
      <div className='button-wrap'>
        <GroupButton onClick={() => showOpen(true)}>
          <div>
            <span style={{ fontSize: '18px', paddingTop: '5px', fontWeight: 'bold' }}>그룹</span>
          </div>
          <span style={{ marginTop: '5px' }}>
            <ArrowDown style={{ fontSize: '30px' }} />
          </span>
        </GroupButton>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '40px'
          }}
        >
          <IconButton onClick={showGroupAdd}>
            <AddIcon style={{ fontSize: '20px' }} />
          </IconButton>
        </div>
      </div>
    );
  };

  const friendList = () => {
    if (open.friend === true) {
      const friends = data.friendList.map((value, index) => {
        return (
          <li key={`friend-${index}`}>
            <div className='button-wrap'>
              <GroupButton>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}
                >
                  <img
                    alt='friend-img'
                    style={{
                      marginRight: '10px',
                      borderRadius: '50%'
                    }}
                    src={value.user_pic}
                  />
                  {value.user_nm}
                </div>
              </GroupButton>
              <div className='LongMenuOpen'>
                <LongMenu
                  options={['친구 관리']}
                  code={value.user_id}
                  returnValue={onFriendMenuSelect}
                />
              </div>
            </div>
          </li>
        );
      });
      return (
        <div className='gruop-field'>
          <GroupButton
            style={{ backgroundColor: 'rgba(209, 204, 192,0.4)' }}
            onClick={() => showOpen(false)}
          >
            <div>
              <span style={{ fontSize: '18px', paddingTop: '5px', fontWeight: 'bold' }}>친구</span>
            </div>
            <span style={{ marginTop: '5px' }}>
              <ArrowUp style={{ fontSize: '30px' }} />
            </span>
          </GroupButton>
          <div>
            <ul>{friends}</ul>
          </div>
        </div>
      );
    }
    return (
      <GroupButton onClick={() => showOpen(false)}>
        <div>
          <span style={{ fontSize: '18px', paddingTop: '5px', fontWeight: 'bold' }}>친구</span>
        </div>
        <span style={{ marginTop: '5px' }}>
          <ArrowDown style={{ fontSize: '30px' }} />
        </span>
      </GroupButton>
    );
  };

  const showSetting = () => {
    if (setting === null) {
      setSetting(<SettingMenu currentUser={data.currentUser} onClose={() => setSetting(null)} />);
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
              <img alt='user img' src='http://placehold.it/40x40' style={{ borderRadius: '50%' }} />
            </div>
            <span>{data.currentUser.user_id}</span>
          </div>
          <div className='profile-edit-icon'>
            <CustomIconButton onClick={ShowProfileEditForm}>
              <EditIcon style={{ color: 'white' }} />
            </CustomIconButton>
          </div>
          {profileEditForm}
        </div>
        <div className='menu-buttons'>
          {GroupList()}
          {friendList()}
        </div>
        <div className='menu-bottom'>
          <CustomIconButton onClick={showSetting}>
            <SettingsIcon />
          </CustomIconButton>
          <CustomIconButton>Logout</CustomIconButton>
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
  height: '40px'
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
  paddingLeft: '10px'
});

export default React.memo(HeaderMenu, (props, newProps) => {
  console.log(props, newProps);
  return props === newProps;
  // false 일시 랜더링
  // true 일시 비랜더링
});
