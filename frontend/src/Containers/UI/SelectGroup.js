import { connect } from 'react-redux';
import SelectGroup from '../../Components/UI/SelectGroup';

const mapStateToProps = (state) => {
  return {
    groupList: state.groupList,
  };
};

export default connect(mapStateToProps)(SelectGroup);
