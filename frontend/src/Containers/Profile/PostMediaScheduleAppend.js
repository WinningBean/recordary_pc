import { connect } from 'react-redux';
import PostMediaScheduleAppend from '../../Components/Profile/PostMediaScheduleAppend';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
  };
};

export default connect(mapStateToProps)(PostMediaScheduleAppend);
