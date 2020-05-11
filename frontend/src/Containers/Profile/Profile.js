import { connect } from 'react-redux';
import Profile from '../../Components/Profile/Profile';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(Profile));
