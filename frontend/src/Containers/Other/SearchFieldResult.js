import { connect } from 'react-redux';
import SearchFieldResult from '../../Components/Other/SearchFieldResult';

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveFriend: (data) => {
      dispatch({ type: 'SAVE_FRIEND', friend: data });
    },
    onSaveNotice: (notice) => {
      dispatch({ type: 'SAVE_NOTICE', notice: notice });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchFieldResult);
