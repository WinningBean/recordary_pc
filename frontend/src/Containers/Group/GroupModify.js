import { connect } from 'react-redux';
import GroupModify from '../../Components/Group/GroupModify';

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (data) => {
      dispatch({ type: 'MODIFY_GROUP', groupModifyData: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(GroupModify);
