import { connect } from 'react-redux';
import LoginPage from '../../Components/Login/LoginPage';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        onSavaUserData: data => dispatch({ type: 'SET_USER', userData: data }),
        onLogin: () => dispatch({ type: 'SET_LOGIN', loginData: true })
    };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
