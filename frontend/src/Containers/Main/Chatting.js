import { connect } from 'react-redux';
import Chatting from '../../Components/Main/Chatting';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Chatting);
