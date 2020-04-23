import React from 'react';
import '../Other/SearchField.css';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';

class Follower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
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
    };
  }

  getFollower = async () => {
    const { data } = await axios.get(`/follower/${this.props.userId}`);
    this.setState({ ...this.state, userFollower: data });
  };

  getFollowing = async () => {
    const { data } = await axios.get(`/following/${this.props.userId}`);
    this.setState({ ...this.state, userFollower: data });
  };

  componentDidMount() {
    this.props.isFollower === true ? this.getFollower() : this.getFollowing();
  }

  followerChange = (index, click) => {
    const array = this.state.userFollower;
    array[index] = { ...array[index], follower_click: click };

    this.setState({ userFollower: array });
  };

  render() {
    const followers = this.state.userFollower.map((value, index) => {
      return (
        <li key={value.follower_cd}>
          <div className='follower_list'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <img
                alt='friend-img'
                style={{
                  marginRight: '10px',
                  borderRadius: '50%',
                }}
                src={'http://placehold.it/40x40'}
              />
              {`${value.userId}(${value.userNm})`}
            </div>
            <div>
              {(() => {
                if (value.follower_click) {
                  return (
                    <FollowButton onClick={() => this.followerChange(index, !value.follower_click)}>
                      <AddIcon style={{ fontSize: '20px;' }} />
                    </FollowButton>
                  );
                } else {
                  return (
                    <FollowButton onClick={() => this.followerChange(index, !value.follower_click)}>
                      <HowToRegIcon style={{ fontSize: '20px;' }} />
                    </FollowButton>
                  );
                }
              })()}
            </div>
          </div>
        </li>
      );
    });
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => this.props.onCancel()}>
        <div className='searchField-result'>
          <div className='searchField-title'>
            {/* {this.props.value}에 대한 검색 결과 */}
            {this.props.isFollower ? 'Follower' : 'Following'}
          </div>
          <hr />
          <div className='searchField-result-list'>
            <div className='follower_list'>
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
