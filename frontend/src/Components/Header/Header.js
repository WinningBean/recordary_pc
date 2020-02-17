import React from 'react';
import './header.css';
import UserEditor from './UserEditor';
import GroupAdd from '../Group/GroupAdd';
import LongMenu from '../Other/MoreMenu';
import ProfileEditor from 'Components/Profile/ProfileEditor';
import GroupSetting from 'Components/Group/GroupSetting';

import { styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchAppBar from '../Other/SearchField';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';

const defaultProps = {
    data : {
        currentUser: {
            user_ex: '',
            user_id: 'HelloWorld1234',
            user_nm: '홍길동'
        },
        userFriend: [
            {
                friend_cd: 1,
                friend_nm: '친구1',
                friend_pic: 'http://placehold.it/40x40',
            },
            {
                friend_cd: 1,
                friend_nm: '친구2',
                friend_pic: 'http://placehold.it/40x40',
            }
        ],
        userGroup: [
            {
                group_cd: 1,
                group_nm: '그룹1',
                group_pic: 'http://placehold.it/40x40',
            },
            {
                group_cd: 2,
                group_nm: '그룹2',
                group_pic: 'http://placehold.it/40x40',
            }
        ],
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClick: false,
            ProfileEditorClick : false,
            editorClick: false,
            groupOpen: false,
            groupAddClick : false,
            friendOpen: false,
            friendAddClick : false,
            data: this.props.data,
            menuDialog: null,
        }
    }

    setGroupMenuOpen = () => {
        if (this.state.groupOpen === true) {
            return this.setState({
                groupOpen: false
            });
        }
        return this.setState({
            groupOpen: true
        });
    };

    setFriendMenuOpen = () => {
        if (this.state.friendOpen === true) {
            return this.setState({
                friendOpen: false
            });
        }
        return this.setState({
            friendOpen: true
        });
    };

    onGroupMenuSelect = (selectedValue, code) => {
        switch(selectedValue){
            case '그룹 정보':
                break;
            case '그룹 관리':
                const currData = (this.state.data.userGroup.filter((value)=> value.group_cd === code ))[0];
                console.log(currData);
                this.setState({menuDialog : <GroupSetting data={currData} onClose={()=> this.setState({menuDialog : null})} />})
                break;
            case '그룹 삭제':
                break;
        }
    }

    componentDidMount(){
        this.setState({data : this.props.data});
    }
    
    render() {
        const GroupAddForm = () => {
            if(this.state.groupAddClick === true){
                return <GroupAdd onCancel={() => this.setState({ groupAddClick: false })}></GroupAdd>
            }
            return null;
        }
        const FriendAddForm = () => {
            if(this.state.friendAddClick === true){
                return <GroupAdd onCancel={() => this.setState({ friendAddClick: false })}></GroupAdd>
            }
            return null;
        }

        const ProfileEditForm = () => {
            if(this.state.ProfileEditorClick === true){
                return <ProfileEditor onCancel={() => this.setState({ ProfileEditorClick: false })}></ProfileEditor>
            }
            return null;
        }
        
        const GroupList = (() => {
            if (this.state.groupOpen === true) {
                const gruops = this.state.data.userGroup.map(
                    (value) => { return (
                        <li key={value.group_cd}>
                            <GroupButton>
                                <div style={{ display: 'flex', width:'250px', justifyContent:'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <img alt="group-img" style={{ marginRight: '10px', borderRadius: '50%' }} src={value.group_pic} />
                                        {value.group_nm}
                                    </div>
                                    <div className="LongMenuOpen">
                                        <LongMenu 
                                        options={[ '그룹 정보', '그룹 관리', '그룹 삭제']} 
                                        style={{ fontSize: '30px' }}
                                        code={value.group_cd}
                                        returnValue={this.onGroupMenuSelect} 
                                        />
                                    </div>
                                </div>
                            </GroupButton>
                        </li>)
                    }
                );
                return (
                    <div className="gruop-field">
                        <GroupButton style={{backgroundColor:'rgba(209, 204, 192,0.4)'}}>
                            <div>
                                <span style={{fontSize:'18px', paddingTop: '5px'}}>Groups</span>
                                <span>
                                    <PlusIconButton><AddIcon onClick={()=> this.setState({groupAddClick: true})} style={{fontSize:'20px;'}}/></PlusIconButton>
                                </span>
                            </div>
                            <span><IconButton><ArrowUp style={{fontSize:'30px'}}  onClick={this.setGroupMenuOpen}/></IconButton></span>
                        </GroupButton>
                        <div><ul>{gruops}</ul></div>
                        
                    </div>
                );
            }
            return <GroupButton>
                <div>
                    <span style={{fontSize:'18px', paddingTop: '5px'}}>Groups</span>
                    <span>
                        <PlusIconButton><AddIcon style={{fontSize:'20px;'}} onClick={()=> this.setState({groupAddClick: true})} /></PlusIconButton>
                    </span>
                </div>
                <span><IconButton><ArrowDown style={{ fontSize: '30px' }} onClick={this.setGroupMenuOpen}/></IconButton></span>
            </GroupButton>;
        })();
        const friendList = (() => {
            if (this.state.friendOpen === true) {
                const friends = this.state.data.userFriend.map(
                    (value) => { return (
                    <li key={value.friend_cd}>
                        <GroupButton>
                            <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                                <img alt="friend-img" style={{marginRight:'10px', borderRadius:'50%'}} src={value.friend_pic} />
                                {value.friend_nm}
                            </div>
                            <div>
                                <IconButton><MoreVertIcon/></IconButton>
                            </div>
                        </GroupButton>
                        </li>) }
                );
                return (
                    <div className="gruop-field">
                        <GroupButton style={{backgroundColor:'rgba(209, 204, 192,0.4)'}}>
                            <div>
                                <span style={{fontSize:'18px', paddingTop: '5px'}}>Friends</span>
                                <span>
                                    <PlusIconButton><AddIcon onClick={()=> this.setState({friendAddClick: true})} style={{fontSize:'20px;'}}/></PlusIconButton>
                                </span>
                                {FriendAddForm()}
                            </div>
                            <span><IconButton><ArrowUp style={{fontSize:'30px'}}  onClick={this.setFriendMenuOpen}/></IconButton></span>
                        </GroupButton>
                        <div><ul>{friends}</ul></div>
                        
                    </div>
                );
            }
            return <GroupButton>
                <div>
                    <span style={{fontSize:'18px', paddingTop: '5px'}}>Friends</span>
                    <span>
                        <PlusIconButton><AddIcon style={{fontSize:'20px;'}} onClick={()=> this.setState({friendAddClick: true})} /></PlusIconButton>
                    </span>
                    {FriendAddForm()}
                </div>
                <span><IconButton><ArrowDown style={{fontSize:'30px'}}  onClick={this.setFriendMenuOpen}/></IconButton></span>
            </GroupButton>;
        })();

        const Editor = () => {
            if (this.state.editorClick === true) {
                return <UserEditor currentUser={this.state.data.currentUser} onCancel={() => this.setState({ editorClick: false })} />;
            }
            return null;
        }

        return (
            <header>
                <div id="header-left">
                    <div className="title-menu">
                        <IconButton onClick={() => this.setState({ menuClick: true })}>
                            <MenuIcon style={{ fontSize: '30px', color: 'white'}} />
                        </IconButton>
                        <Drawer
                            open={this.state.menuClick}
                            onClose={() => this.setState({ menuClick: false })}
                            style={{backgroundColor:'rgba(241, 242, 246,0.1)'}}
                            anchor='left'>
                            <div className="menu-wrap">
                                <div className="menu-profile">
                                    <div className="menu-profile-pic-nm">
                                        <div style={{marginRight:'10px'}}>
                                            <img alt="user img" src="http://placehold.it/40x40" 
                                            style={{borderRadius:'50%'}}
                                            />
                                        </div>
                                        <span>{this.state.data.currentUser.user_id}</span>
                                    </div>
                                    <div className="profile-edit-icon">
                                        <IconButton>
                                            <EditIcon onClick={() => this.setState({ ProfileEditorClick: true })} style={{fontSize:'20px'}}/>
                                        </IconButton>
                                    </div>
                                    {ProfileEditForm()}
                                </div>
                                <div className="menu-buttons">
                                    {GroupList}
                                    {friendList}
                                </div>
                                <div className="menu-bottom">
                                    <IconButton onClick={() => this.setState({ editorClick: true })}><SettingsIcon /></IconButton>
                                    <IconButton>로그아웃</IconButton>
                                </div>
                                {Editor()}
                                {GroupAddForm()}
                                {this.state.menuDialog}
                            </div>
                        </Drawer>
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
                        <NotificationsIcon style={{fontSize : 38, color: 'white' }} ></NotificationsIcon>
                    </div>
                    <div className="profile-icon">
                        {/* <
                        <a href="profile.html">profile</a> */}
                        <AccountCircleIcon style={{fontSize : 38, color: 'white' }} onClick={(e)=>{
                            e.preventDefault();
                            this.props.onProfileShow();
                        }}>
                            Profile
                        </AccountCircleIcon>
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
const PlusIconButton = styled(Button)({
    minWidth: '30px',
    height: '40px',
});
const GroupButton = styled(Button)({
    width: '250px',
    height: '50px',
    borderBottom: '1px solid rgba(209, 204, 192,0.8)',
    borderRadius: '0',
    display:'flex', 
    justifyContent:'space-between',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
});
// export default withStyles(styles)(Header);

Header.defaultProps = defaultProps;
export default Header;