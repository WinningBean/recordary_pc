import React from 'react';
import './SearchField.css' ;
import TabSearch from 'Components/UI/TabSearch'

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GroupIcon from '@material-ui/icons/Group';
import store from 'store';


import axios from 'axios';


class SearchFieldResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
            followerIconClick : false,
            clickTab: 0,
        }
    }

    followerChange = (index, click) => {

        const array = this.state.data.searchedUser;
        array[index] = { ...array[index], user_click: click };

        this.setState({ searchedUser : array });
    };

    groupChange = (index, click) => {

        const array = this.state.data.searchedGroup;
        array[index] = { ...array[index], group_click: click };

        this.setState({ searchedGroup : array });
    };

    exfollowList = () => {
        return (this.state.data.searchedUser.map((value, index) => {
            return (
                <li key={value.user_id} >
                    <div className="follower_list">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                alt="friend-img"
                                style={{ marginRight: '10px', borderRadius: '50%' }}
                                src={value.user_pic}
                            />
                            {value.user_nm}
                        </div>
                        <div>
                            {(() => {
                                if (!value.user_click) {
                                    return (
                                        <FollowButton onClick={async (e) => {
                                            console.log(value);
                                            e.preventDefault();
                                            this.followerChange(index, !value.user_click);

                                            const { data } = await axios.get(`http://localhost:8080/${value.user_id}/follow`);
                                            // .catch();
                                            console.log(data);
                                        }}>
                                            <AddIcon style={{ fontSize: '20px;' }} />
                                        </FollowButton>)
                                } else {
                                    return (
                                        <FollowButton onClick={async (e) => {
                                            console.log(value);
                                            e.preventDefault();
                                            this.followerChange(index, !value.user_click);

                                            const { data } = await axios.get(`http://localhost:8080/${value.user_id}/unFollow`);
                                            // .catch();
                                            console.log(data);
                                        }}>
                                            <HowToRegIcon style={{ fontSize: '20px;' }} />
                                        </FollowButton>)
                                }
                            })()}
                        </div>
                    </div>
                </li>
            )
        }
        ))
    };

    exGroupList = () => {
        return (this.state.data.searchedGroup.map((value, index) => {
            return (
                <li key={value.group_id} >
                    <div className="follower_list">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                alt="friend-img"
                                style={{ marginRight: '10px', borderRadius: '50%' }}
                                src={value.group_pic}
                            />
                            {value.group_nm}
                        </div>
                        <div>
                            {(() => {
                                if (!value.group_click) {
                                    return (
                                        <FollowButton onClick={async (e) => {
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
                                        }}>
                                            <HowToRegIcon style={{ fontSize: '20px;' }} />
                                        </FollowButton>)
                                } else {
                                    return (
                                        <FollowButton onClick={async (e) => {
                                            console.log(value);
                                            e.preventDefault();
                                            this.groupChange(index, !value.group_click);

                                            const form = new FormData();
                                            form.append('user_id', store.getState().user.currentUser.user_id);
                                            form.append('group_cd', value.group_cd);
                                            const { data } = await axios.post('http://localhost:8080/apply/delete', form);
                                            // .catch();
                                            if(data.isDelete){
                                                console.log('완료');
                                                return;
                                            }
                                            console.log('실패');
                                        }}>
                                            <AddIcon style={{ fontSize: '20px;' }} />
                                        </FollowButton>)
                                }
                            })()}
                        </div>
                    </div>
                </li>
            )
        }
        ))
    };
    
    render() {
        

        return (
            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}  onClose={() => this.props.onCancel()} >
                <div className="searchField-result">
                    <div className="searchField-title">
                        <SearchIcon style={{ fontSize: '30px;', color: 'white', marginTop: '5px'}}  />
                    </div><hr/>
                    <div className="searchField-result-list">
                        <div className="group-follow_change">
                            <div>
                                <Paper square style={{ marginBottom: '10px' }}>
                                    <Tabs
                                        value={this.state.clickTab}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={(e, newValue) => this.setState({ clickTab: newValue })}
                                        aria-label="disabled tabs example"
                                    >
                                        <Tab label="Follow" icon={<HowToRegIcon />} />
                                        <Tab label="Group" icon={<GroupIcon />} />
                                    </Tabs>
                                </Paper>
                            </div>
                            <div className="follower_list">
                                <ul>
                                    {this.state.clickTab === 0 ? this.exfollowList() : this.exGroupList()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const FollowButton = styled(Button)({
    minWidth: '30px',
    height: '40px',
});


export default SearchFieldResult;