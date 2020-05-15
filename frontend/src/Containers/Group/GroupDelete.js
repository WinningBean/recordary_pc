import { connect } from 'react-redux';
import GroupDelete from '../../Components/Group/GroupDelete';

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteGroupList: (groupCd) => {
      dispatch({ type: 'DELETE_GROUP', groupDeleteCd: groupCd });
    },
  };
};

export default connect(null, mapDispatchToProps)(GroupDelete);
