import React from 'react';
import './PostAppend.css' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { styled } from '@material-ui/core/styles';
import SwitchLabels from '../UI/Switch';


class PostMediaScheduleAppend extends React.Component {
    render() {
        return (
            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
                <div className="Post-Schedule-Append-Form">
                    <div className="Post-Append-titleName post-Append">
                        게시물 추가
                    </div><hr/>
                    <div className="Post-Append-Schedule post-Append">
                        2020-01-30 ~ 2020-02-29 
                    </div>
                    <div className="Post-Append-title post-Append">
                        <TextField id="post_title" label="(일정 또는 게시물)제목" variant="outlined" />
                    </div>
                    <div className="Post-Append-text post-Append">
                        <TextField
                            id="post_text" label="(일정 또는 게시물)내용" multiline rows="5" variant="outlined"
                        />
                    </div>
                    <div className="Post-Append-Tag-User post-Append">
                        태그부분 @누구누구 하면 프로필 나옴
                    </div>
                    <div className="Post-AppendP-Bottom">
                        <div className="Post-Append-Open-Choose">
                            <SwitchLabels></SwitchLabels>
                        </div>
                        <div className = "Post-Upload-buttons">
                            <Button onClick={() => this.props.onCancel()}>게시</Button>
                            <Button onClick={() => this.props.onCancel()}>취소</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}
const PostAppendButton = styled(Button)({
    width: '250px',
    height: '50px',
    borderBottom: '1px solid rgba(209, 204, 192,0.8)',
    borderRadius: '0',
    display:'flex', 
    justifyContent:'space-between',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
});



export default PostMediaScheduleAppend;
