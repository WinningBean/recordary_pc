import React, { Component } from 'react';
import 'Components/Other/SearchField.css';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';



class Follower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : '',
            userFollower: [
                {
                    follower_cd: 1,
                    follower_nm: '팔로워1',
                    follower_pic: 'http://placehold.it/40x40',
                    follower_click: false,
                },
                {
                    follower_cd: 2,
                    follower_nm: '팔로워2',
                    follower_pic: 'http://placehold.it/40x40',
                    follower_click: false,
                },
                {
                    follower_cd: 3,
                    follower_nm: '팔로워3',
                    follower_pic: 'http://placehold.it/40x40',
                    follower_click: false,
                },
            ],
        }
    }

    followerChange = (index, click) => {
        const array = this.state.userFollower;
        array[index] = { ...array[index], follower_click: click };

        this.setState({ userFollower: array });
    };

    render() {
        const followers = this.state.userFollower.map((value, index) => { 
            return (
                <li key={value.follower_cd} >
                    <div className="follower_list">
                        <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                            <img
                                alt="friend-img" 
                                style={{marginRight:'10px', borderRadius:'50%'}} 
                                src={value.follower_pic} 
                            />
                            {value.follower_nm}
                        </div>
                        <div>
                            {(()=>{
                                if (value.follower_click) {
                                    return (<FollowButton onClick={()=>this.followerChange(index, !value.follower_click)}>
                                                <AddIcon style={{ fontSize: '20px;' }} />
                                            </FollowButton>)
                                } else {
                                    return (<FollowButton onClick={()=>this.followerChange(index, !value.follower_click)}>
                                                <HowToRegIcon style={{ fontSize: '20px;' }} />
                                            </FollowButton>)
                                }
                            })()}
                        </div>
                    </div>
                </li>
                )}
            );
        return (

            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}  onClose={() => this.props.onCancel()}>
                <div className="searchField-result">
                    <div className="searchField-title">
                        {/* {this.props.value}에 대한 검색 결과 */}
                        팔로워들
                    </div><hr/>
                    <div className="searchField-result-list">
                        <div className="follower_list">
                            <div>
                                <ul>{followers}</ul>
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


export default Follower;