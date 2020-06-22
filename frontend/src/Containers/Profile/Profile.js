import { connect } from 'react-redux';
import Profile from '../../Components/Profile/Profile';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNotice: (notice) => {
      dispatch({ type: 'SAVE_NOTICE', notice: notice });
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
