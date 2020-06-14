import { connect } from 'react-redux';
import EditPostMediaScheduleAppend from '../../Components/Profile/EditPostMediaScheduleAppend';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
  };
};

export default connect(mapStateToProps)(EditPostMediaScheduleAppend);
