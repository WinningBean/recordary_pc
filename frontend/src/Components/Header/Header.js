import React from 'react';
import './header.css';

import { styled } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';

import SearchAppBar from '../Other/SearchField';
import HeaderMenu from 'Containers/Header/HeaderMenu';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu : false,
        }
    }

    render() {
        return (
            <header>
                <div id="header-left">
                    <div className="title-menu">
                        <IconButton onClick={() => this.setState({ openMenu: true })}>
                            <MenuIcon style={{ fontSize: '30px', color: 'white'}} />
                        </IconButton>
                        <HeaderMenu open={this.state.openMenu} onClose={()=>this.setState({openMenu : false})} />
                    </div>
                    {/* <div className="title-icon">
                        <a href="profile.html"><img alt="icon" src="RIcon.png" /></a>
                    </div> */}
                    <div className="title-name">
                        <a href="http://localhost:3000/main">
                            <img className="title-image" alt="Recordary icon" src="Recordary.png" style={{height:'40px'}}/>
                        </a>
                    </div>
                </div>
                <div id="header-right">
                    <div className="search-user">
                        <SearchAppBar></SearchAppBar>
                    </div>
                    <div className="header-ring">
                        <NotificationsIcon style={{fontSize : 40, color: 'white' }} ></NotificationsIcon>
                    </div>
                    <div className="profile-icon">
                        {/* <
                        <a href="profile.html">profile</a> */}
                        <Link to="/profile">
                            <AccountCircleIcon style={{ fontSize: 40, color: 'white' }}>
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
    height: '40px',
});


export default Header;