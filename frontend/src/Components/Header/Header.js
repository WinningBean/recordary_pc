import React from 'react';
import './header.css';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';

import SearchAppBar from '../Other/SearchField';
import HeaderMenu from '../../Containers/Header/HeaderMenu';
import NotifyPopup from '../UI/NotifyPopup';
import ToDo from './ToDo';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      isOpenToDo: false,
    };
  }

  getNotifyInfo = async () => {
    const { data } = await axios.get(`/notice/accept/${this.props.userCd}`);
    this.props.onSaveNoticeList(data);
  };

  componentDidMount() {
    this.getNotifyInfo();
  }

  render() {
    if (!this.props.isLogin) {
      return (
        <header>
          <div id='header-left'>
            <div className='title-menu'>
              <IconButton onClick={() => this.setState({ openMenu: true })}>
                <MenuIcon style={{ fontSize: '30px', color: 'white' }} />
              </IconButton>
              <HeaderMenu
                open={this.state.openMenu}
                isLogin={this.props.isLogin}
                onClose={() => this.setState({ openMenu: false })}
              />
            </div>
            <a href='http://localhost:3000/main'>
              <img
                className='title-image'
                alt='Recordary icon'
                src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                style={{ height: '30px', marginTop: '8px' }}
              />
            </a>
          </div>
          <div id='header-right'>
            <div className='search-user'>
              <SearchAppBar userCd={this.props.userCd}></SearchAppBar>
            </div>
            <Link to='/'>
              <Button style={{ color: '#ffffff' }}>로그인</Button>
            </Link>
          </div>
        </header>
      );
    }
    return (
      <header>
        <div id='header-left'>
          <div className='title-menu'>
            <IconButton onClick={() => this.setState({ openMenu: true })}>
              <MenuIcon style={{ fontSize: '30px', color: 'white' }} />
            </IconButton>
            <HeaderMenu open={this.state.openMenu} onClose={() => this.setState({ openMenu: false })} />
          </div>
          <Link to='/main'>
            <img
              className='title-image'
              alt='Recordary icon'
              src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
              style={{ height: '30px', marginTop: '8px' }}
            />
          </Link>
        </div>
        <div id='header-right'>
          <div className='search-user' style={{ marginRight: '10px' }}>
            <SearchAppBar userCd={this.props.userCd} />
          </div>
          <div>
            <NotifyPopup
              type={1}
              data={this.props.noticeList}
              onAccept={async (index, isGroupApply) => {
                console.log(this.props.noticeList, index, isGroupApply);
                try {
                  if (isGroupApply) {
                    console.log({
                      groupCd: this.props.noticeList[index].groupCd,
                      userCd: this.props.userCd,
                    });
                    const { data } = await axios.post('/groupMember/create', {
                      groupCd: this.props.noticeList[index].groupCd,
                      userCd: this.props.userCd,
                    });
                    console.log(data);
                    this.props.onSaveNotice({
                      type: 'SAVE_NOTICE',
                      notice: {
                        noticeType: 'GROUP_MEMBER_NEW', // 이벤트 타입
                        activeCd: this.props.userCd, // 이벤트 주체
                        targetCd: this.props.noticeList[index].groupCd, // 이벤트 대상
                      },
                    });
                  } else {
                    await axios.post('/scheduleMember/update', {
                      scheduleCd: this.props.noticeList[index].scheduleCd,
                      userCd: this.props.userCd,
                    });
                  }

                  const copyList = this.props.noticeList.slice();
                  copyList.splice(index, 1);
                  this.props.onSaveNoticeList(copyList);
                } catch (error) {
                  console.error(error);
                }
              }}
              onDenial={async (index, isGroupApply) => {
                try {
                  if (isGroupApply) {
                    await axios.post('/groupApply/delete', {
                      groupCd: this.props.noticeList[index].groupCd,
                      userCd: this.props.userCd,
                    });
                  } else {
                    await axios.post('/scheduleMember/delete', {
                      scheduleCd: this.props.noticeList[index].scheduleCd,
                      userCd: this.props.userCd,
                    });
                  }

                  const copyList = this.props.noticeList.slice();
                  copyList.splice(index, 1);
                  this.props.onSaveNoticeList(copyList);
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <IconButton onClick={() => this.setState({ isOpenToDo: !this.state.isOpenToDo })}>
              <AssignmentIcon style={{ fontSize: '30px', color: 'white' }} />
            </IconButton>
            {this.state.isOpenToDo ? <ToDo userCd={this.props.userCd} /> : null}
          </div>
          <div className='profile-icon'>
            <Link to={`/${this.props.userId}`}>
              {/* <Link to={`/profile/wsh`}> */}
              <AccountCircleIcon style={{ fontSize: 40, color: 'white' }}>Profile</AccountCircleIcon>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

const IconButton = styled(Button)({
  minWidth: '40px',
  height: '40px',
});

export default Header;
