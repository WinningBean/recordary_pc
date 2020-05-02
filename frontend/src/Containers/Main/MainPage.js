import { connect } from 'react-redux';
import MainPage from '../../Components/Main/MainPage';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    data: state.user,
    post: state.postList,
  };
};

export default withRouter(connect(mapStateToProps)(MainPage));
