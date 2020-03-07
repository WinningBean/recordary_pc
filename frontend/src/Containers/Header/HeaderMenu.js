import { connect } from 'react-redux';
import HeaderMenu from 'Components/Header/HeaderMenu';

const mapStateToProps = state => {
    return {
        data: state.user,
        isLogin: state.isLogin
    };
};

export default connect(mapStateToProps)(HeaderMenu);
