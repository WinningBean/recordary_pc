import { connect } from 'react-redux';
import ProfileEditor from '../../Components/Profile/ProfileEditor';

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (updateUserPic, UpdateUserEx) => {
      dispatch({ type: 'UPDATE_USER', userData: { userPic: updateUserPic, userEx: UpdateUserEx } });
    },
  };
};

export default connect(null, mapDispatchToProps)(ProfileEditor);
