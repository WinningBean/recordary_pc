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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      isOpenToDo: false,
    };
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
            {/* <div className="title-icon">
                        <a href="profile.html"><img alt="icon" src="RIcon.png" /></a>
                    </div> */}
            <div className='title-name'>
              <a href='http://localhost:3000/main'>
                <img
                  className='title-image'
                  alt='Recordary icon'
                  src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                  style={{ height: '40px' }}
                />
              </a>
            </div>
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
          <div className='title-name'>
            <Link to='/main'>
              <img
                className='title-image'
                alt='Recordary icon'
                src='https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/static/logo.png'
                style={{ height: '40px' }}
              />
            </Link>
          </div>
        </div>
        <div id='header-right'>
          <div className='search-user' style={{ marginRight: '10px' }}>
            <SearchAppBar userCd={this.props.userCd} />
          </div>
          <div className='header-ring'>
            <NotifyPopup style={{ fontSize: 40, color: 'white' }}></NotifyPopup>
          </div>
          <div className='header-ring' style={{ position: 'relative' }}>
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
