import { connect } from 'react-redux';
import SearchFieldResult from '../../Components/Other/SearchFieldResult';

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveFriend: (data) => {
      dispatch({ type: 'SAVE_FRIEND', friend: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchFieldResult);
