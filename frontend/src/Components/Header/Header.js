import React from 'react';
import './header.css';
import UserEditor from './UserEditor';
import { styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Build';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

//App Bar with search field
//https://material-ui.com/components/app-bar/
// const styles = theme => ({
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 7),
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             width: 120,
//             '&:focus': {
//                 width: 200,
//             },
//         },
//     },
// });


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClick: false,
            editorClick: false,
            groupOpen: false,
            friendOpen: false,
            data: {},
            // userComponents: {
            //     userId: 'abcd',
            //     userName: '위성호',
            //     userImage: 'http://placehold.it/30x30'
            // },
            // menuComponents: {
            //     
            //     groupList: [
            //         {
            //             gruopCode: '100249',
            //             groupImage: 'http://placehold.it/30x30',
            //             groupName: '참조',
            //         },
            //         {
            //             gruopCode: '100250',
            //             groupImage: 'http://placehold.it/30x30',
            //             groupName: '팔색조',
            //         },
            //         {
            //             gruopCode: '100251',
            //             groupImage: 'http://placehold.it/30x30',
            //             groupName: '조조',
            //         },
            //     ],
            //     friendList: [
            //         {
            //             friendCode: '100001',
            //             friendImage: 'http://placehold.it/30x30',
            //             friendName: "위승빈"
            //         }
            //     ],
            // }
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

    componentDidMount(){
        this.setState({data : this.props.data});
    }

    render() {
        const GroupList = (() => {
            if (this.state.groupOpen === true) {
                const gruops = this.state.data.userGroup.map(
                    (value) => { return (
                    <li key={value.groupCd}>
                        <GroupButton>
                            <img src={value.groupPic} />
                            {value.groupNm}
                        </GroupButton>
                        </li>) }
                );
                return (
                    <div className="gruop-field">
                        <GroupButton onClick={this.setGroupMenuOpen}>그룹▲</GroupButton>
                        <div><ul>{gruops}</ul></div>
                    </div>
                );
            }
            return <GroupButton onClick={this.setGroupMenuOpen}>그룹▼</GroupButton>;
        })();
        const friendList = (() => {
            if (this.state.friendOpen === true) {
                const friends = this.state.data.userFriend.map(
                    (value) => { return (
                    <li key={value.friendCd}>
                        <GroupButton>
                            <img src={value.friendPic} />
                            {value.friendNm}
                        </GroupButton>
                        </li>) }
                );
                return (
                    <div className="gruop-field">
                        <GroupButton onClick={this.setFriendMenuOpen}>친구▲</GroupButton>
                        <div><ul>{friends}</ul></div>
                    </div>
                );
            }
            return <GroupButton onClick={this.setFriendMenuOpen}>친구▼</GroupButton>;
        })();
        const Editor = () => {
            if (this.state.editorClick === true) {
                return <UserEditor onCancel={() => this.setState({ editorClick: false })} />;
            }
            return null;
        }
        const { classes } = this.props;
        return (
            <header>
                <div id="header-left">
                    <div className="title-menu">
                        <IconButton onClick={() => this.setState({ menuClick: true })}><MenuIcon style={{ fontSize: '26px' }} /></IconButton>
                        <Drawer
                            open={this.state.menuClick}
                            onClose={() => this.setState({ menuClick: false })}
                            anchor='left'>
                            <div className="menu-wrap">
                                <div className="menu-profile"
                                    onClick={() => console.log('click')}>
                                        <img alt="user img" src={this.state.userComponents.userImage} />
                                    <span>{this.state.userComponents.userName}</span>
                                    <IconButton onClick={() => this.setState({ editorClick: true })}><EditIcon /></IconButton>
                                    {Editor()}
                                </div>
                                <div className="menu-buttons">
                                    {GroupList}
                                    {friendList}
                                </div>
                            </div>
                        </Drawer>
                    </div>
                    <div className="title-icon">
                        <a href="profile.html"><img alt="icon" src="http://placehold.it/30x30" /></a>
                    </div>
                    <div className="title-name">
                        <a href="profile.html"><img alt="title" src="http://placehold.it/30x30" /></a>
                    </div>
                </div>
                <div id="header-right">
                    <div className="search-user">
                        <InputBase
                            placeholder="Search…"
                            // className={classes.inputInput}
                            // inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className="profile-icon">
                        <a href="profile.html">profile</a>
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

const GroupButton = styled(Button)({
    width: '300px',
    height: '80px',
    border: '1px solid gray',
});

// export default withStyles(styles)(Header);

export default Header;