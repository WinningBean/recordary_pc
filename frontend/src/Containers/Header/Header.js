import { connect } from 'react-redux';
import Header from 'Components/Header/Header';

const mapStateToProps = state => {
    return state.isLogin
        ? { user_id: state.user.currentUser.user_id, isLogin: true }
        : { user_id: null, isLogin: false };
};

export default connect(mapStateToProps)(Header);
