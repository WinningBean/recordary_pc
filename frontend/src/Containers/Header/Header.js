import { connect } from 'react-redux';
import Header from '../../Components/Header/Header';

const mapStateToProps = (state) => {
  return state.isLogin
    ? { userId: state.user.userId, userCd: state.user.userCd, isLogin: true, noticeList: state.noticeList }
    : { userCd: null, isLogin: false };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNoticeList: (data) => {
      dispatch({ type: 'SAVE_NOTICELIST', noticeList: data });
    },
    onSaveNotice: (notice) => {
      dispatch({ type: 'SAVE_NOTICE', notice: notice });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
