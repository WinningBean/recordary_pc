import { connect } from 'react-redux';
import HeaderMenu from '../../Components/Header/HeaderMenu';

const mapStateToProps = (state) => {
  return {
    data: state.user,
    friendList: state.friendList === undefined ? undefined : state.friendList,
    groupList: state.groupList === undefined ? undefined : state.groupList,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveFriendList: (data) => {
      dispatch({ type: 'SAVE_FRIENDLIST', friendList: data });
    },
    onSaveGroupList: (data) => {
      dispatch({ type: 'SAVE_GROUPLIST', groupList: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
