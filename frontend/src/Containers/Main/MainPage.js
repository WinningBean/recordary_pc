import { connect } from 'react-redux';
import MainPage from 'Components/Main/MainPage';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    };
};

export default withRouter(connect(mapStateToProps)(MainPage));
