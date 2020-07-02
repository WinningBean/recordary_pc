import React from 'react';
import '../Other/SearchField.css';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Follower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      userFollower: null,
    };
  }

  getFollower = async () => {
    const { data } = await axios.get(`/follower/${this.props.userCd}`);
    this.setState({ ...this.state, userFollower: data });
  };

  getFollowing = async () => {
    const { data } = await axios.get(`/following/${this.props.userCd}`);
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
    console.log(this.state.userFollower);

    var followers = undefined;
    if (this.state.userFollower === null) {
      var loadingList = [];
      for (let i = 0; i < 8; i++) {
        loadingList.push(
          <li map={i}>
            <div className='follower_list'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    marginRight: '10px',
                    borderRadius: '50%',
                    height: '40px',
                    width: '40px',
                    backgroundColor: 'lightgray',
                  }}
                />
                <span style={{ backgroundColor: 'lightgray', color: 'transparent' }}>This is Loading</span>
              </div>
              <div style={{ height: '40px', width: '40px', padding: '6px 8px', backgroundColor: 'lightgray' }} />
            </div>
          </li>
        );
      }
      followers = loadingList;
    } else {
      followers = this.state.userFollower.map((value, index) => {
        return (
          <li key={value.follower_cd}>
            <div className='follower_list'>
              <Link to={`/${value.userId}`}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt='friend-img'
                    style={{
                      marginRight: '10px',
                      borderRadius: '50%',
                      height: '40px',
                      width: '40px',
                    }}
                    src={value.userPic}
                  />
                  {`${value.userId}(${value.userNm})`}
                </div>
              </Link>
              {this.props.type === 0 ? (
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
              ) : null}
            </div>
          </li>
        );
      });
    }
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={() => this.props.onCancel()}>
        <div className='searchField-result'>
          <div className='searchField-title'>
            {/* {this.props.value}에 대한 검색 결과 */}
            {this.props.isFollower ? 'Follower' : 'Follow'}
          </div>
          <hr />
          <div className='searchField-result-list'>
            <ul>{followers}</ul>
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
