import { connect } from 'react-redux';
import PostMediaScheduleAppend from '../../Components/Profile/PostMediaScheduleAppend';

const mapDispatchToProps = (dispatch) => {
  return {
    onPostAdd: (data) => {
      dispatch({ type: 'ADD_POST', postAddData: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(PostMediaScheduleAppend);
