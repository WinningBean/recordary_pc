import React from 'react';
import 'Components/Other/SearchField.css';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

class GroupMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      userGroup: [
        {
          groupMember_id: 1,
          groupMember_nm: '그룹원1',
          groupMember_pic: 'http://placehold.it/40x40',
          groupMember_click: false
        },
        {
          groupMember_id: 2,
          groupMember_nm: '그룹원2',
          groupMember_pic: 'http://placehold.it/40x40',
          groupMember_click: false
        },
        {
          groupMember_id: 3,
          groupMember_nm: '그룹원3',
          groupMember_pic: 'http://placehold.it/40x40',
          groupMember_click: false
        }
      ]
    };
  }

  groupMemberChange = (index, click) => {
    const array = this.state.userFollower;
    array[index] = { ...array[index], groupMember_click: click };

    this.setState({ userGroup: array });
  };

  render() {
    const groupMembers = this.state.userGroup.map((value, index) => {
      return (
        <li key={value.groupMember_id}>
          <div className='follower_list'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}
            >
              <img
                alt='friend-img'
                style={{ marginRight: '10px', borderRadius: '50%' }}
                src={value.groupMember_pic}
              />
              {value.groupMember_nm}
            </div>
            <div>
              {(() => {
                if (value.groupMember_click) {
                  return (
                    <GroupMemberButton
                      onClick={() =>
                        this.groupMemberChange(index, !value.follower_click)
                      }
                    >
                      <AddIcon style={{ fontSize: '20px;' }} />
                    </GroupMemberButton>
                  );
                } else {
                  return (
                    <GroupMemberButton
                      onClick={() =>
                        this.groupMemberChange(index, !value.follower_click)
                      }
                    >
                      <HowToRegIcon style={{ fontSize: '20px;' }} />
                    </GroupMemberButton>
                  );
                }
              })()}
            </div>
          </div>
        </li>
      );
    });
    return (
      <Dialog
        open
        style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}
        onClose={() => this.props.onCancel()}
      >
        <div className='searchField-result'>
          <div className='searchField-title'>
            {/* {this.props.value}에 대한 검색 결과 */}
            그룹원들
          </div>
          <hr />
          <div className='searchField-result-list'>
            <div className='follower_list'>
              <div>
                <ul>{groupMembers}</ul>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

const GroupMemberButton = styled(Button)({
  minWidth: '30px',
  height: '40px'
});

export default GroupMember;
