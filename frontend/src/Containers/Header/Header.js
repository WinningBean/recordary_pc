import { connect } from 'react-redux';
import Header from '../../Components/Header/Header';

const mapStateToProps = (state) => {
  return state.isLogin
    ? { userId: state.user.userId, userCd: state.user.userCd, isLogin: true }
    : { userCd: null, isLogin: false };
};

export default connect(mapStateToProps)(Header);
