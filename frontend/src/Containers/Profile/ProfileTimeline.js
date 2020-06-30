import { connect } from 'react-redux';
import ProfileTimeline from '../../Components/Profile/ProfileTimeline';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(ProfileTimeline));
