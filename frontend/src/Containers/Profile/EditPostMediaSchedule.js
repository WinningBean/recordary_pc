import { connect } from 'react-redux';
import EditPostMediaSchedule from '../../Components/Profile/EditPostMediaSchedule';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
  };
};

export default connect(mapStateToProps)(EditPostMediaSchedule);
