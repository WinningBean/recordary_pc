import { connect } from 'react-redux';
import App from '../Components/App';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList,
    friendList: state.friendList,
  };
};

export default connect(mapStateToProps, null)(App);
