import { connect } from 'react-redux';
import PostShare from '../../Components/Profile/PostShare';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
  };
};

export default connect(mapStateToProps)(PostShare);
