import { connect } from 'react-redux';
import App from '../Components/App';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
    notice: state.notice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectSession: (userInfo) => {
      dispatch({ type: 'CONNECT_SESSION', userData: userInfo });
    },
    onSaveNoticeList: (data) => {
      dispatch({ type: 'SAVE_NOTICELIST', noticeList: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
