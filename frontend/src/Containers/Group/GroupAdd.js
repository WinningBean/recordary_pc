import { connect } from 'react-redux';
import GroupAdd from 'Components/Group/GroupAdd';

const mapDispatchToProps = (dispatch)=>{
    return {
        onAdd : (data)=>{
            dispatch({type:'ADD_GROUP', groupData : data});
        }
    }
}

export default connect(null, mapDispatchToProps)(GroupAdd);