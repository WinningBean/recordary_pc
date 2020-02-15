import React from 'react';
import './PostAppend.css' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { styled } from '@material-ui/core/styles';
import PostMediaScheduleAppend from './PostMediaScheduleAppend';
import PostShare from './PostShare';


class ChoosePostAppend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postMediaScheduleClick : false,
            postShareClick: false,
        }
    }

    render() {
        const PostMediaScheduleWrite = () => {
            if(this.state.postMediaScheduleClick === true){
                return <PostMediaScheduleAppend onCancel={() => this.setState({ postMediaScheduleClick: false })}></PostMediaScheduleAppend>
            }
            return null;
        }

        const PostShareForm = () => {
            if(this.state.postShareClick === true){
                return <PostShare onCancel={() => this.setState({ postShareClick: false })}></PostShare>
            }
            return null;
        }

        return (
            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
                <div className="Choose-Upload-Content">
                    <div>
                        <div className="Choose-Post-select">
                            게시물 추가 또는 공유 방법
                        </div>
                        <div className="Choose-Post-All-Append">  
                            <PostAppendButton onClick={()=> this.setState({postMediaScheduleClick: true})}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    게시물(사진/일정)추가
                                </div>
                            </PostAppendButton>
                            {PostMediaScheduleWrite()}
                        </div>
                        <div className="Choose-Post-Schedule-Shared">
                            <PostAppendButton onClick={()=> this.setState({postShareClick: true})}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    일정 공유
                                </div>
                            </PostAppendButton>
                            {PostShareForm()}
                        </div>
                        <div className = "Choose-buttons">
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



export default ChoosePostAppend;
