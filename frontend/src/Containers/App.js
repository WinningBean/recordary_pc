import { connect } from 'react-redux';
import App from '../Components/App';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
    friendList: state.friendList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectSession: (userInfo) => {
      dispatch({ type: 'CONNECT_SESSION', userData: userInfo });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
