import React from 'react';
import './header.css';

import { styled } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import SearchAppBar from 'Components/Other/SearchField';
import HeaderMenu from 'Containers/Header/HeaderMenu';
import NotifyPopup from 'Components/UI/NotifyPopup';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        };
    }

    render() {
        console.log(this.props);
        if (!this.props.isLogin) {
            return (
                <header>
                    <div id='header-left'>
                        <div className='title-menu'>
                            <IconButton
                                onClick={() =>
                                    this.setState({ openMenu: true })
                                }
                            >
                                <MenuIcon
                                    style={{ fontSize: '30px', color: 'white' }}
                                />
                            </IconButton>
                            {/* <HeaderMenu open={this.state.openMenu} onClose={()=>this.setState({openMenu : false})} /> */}
                        </div>
                        <div className='title-name'>
                            <a href='http://localhost:3000/main'>
                                <img
                                    className='title-image'
                                    alt='Recordary icon'
                                    src="img/Recordary.png"
                                    style={{ height: '40px' }}
                                />
                            </a>
                        </div>
                    </div>
                    <div id='header-right'>
                        <div className='search-user'>
                            <SearchAppBar></SearchAppBar>
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
                        <IconButton
                            onClick={() => this.setState({ openMenu: true })}
                        >
                            <MenuIcon
                                style={{ fontSize: '30px', color: 'white' }}
                            />
                        </IconButton>
                        <HeaderMenu
                            open={this.state.openMenu}
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
                                src='Recordary.png'
                                style={{ height: '40px' }}
                            />
                        </a>
                    </div>
                </div>
                <div id='header-right'>
                    <div className='search-user'>
                        <SearchAppBar></SearchAppBar>
                    </div>
                    <div className='header-ring'>
                        <NotifyPopup
                            style={{ fontSize: 40, color: 'white' }}
                        ></NotifyPopup>
                    </div>
                    <div className='profile-icon'>
                        <Link to={`/${this.props.user_id}`}>
                            <AccountCircleIcon
                                style={{ fontSize: 40, color: 'white' }}
                            >
                                Profile
                            </AccountCircleIcon>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

const IconButton = styled(Button)({
    minWidth: '40px',
    height: '40px'
});

export default Header;
