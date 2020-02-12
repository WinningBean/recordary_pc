import React from 'react';
import { styled } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ImagePicker  } from 'react-file-picker';
import './ProfileEditor.css';

class ProfileEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_ex : '',
            user_pic: 'http://placehold.it/250x250'
        }
    }

    changeHandel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
                <div className="profile-edit-title">
                    프로필 수정
                </div>
                <div className="profile-editor">
                    <div className='profile-editor-image'>
                        <ImagePicker
                            extensions={['jpg', 'jpeg', 'png']}
                            dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                            onChange={base64 => this.setState({user_pic:base64})}
                            onError={(e)=>{console.log(e)}}
                        >
                            <img alt="profile-img" src={this.state.user_pic} />
                        </ImagePicker>
                    </div>
                    <div className="profile-editor-info">
                        <TextField name="user_nm" autoFocus label="이름" style={{width:'250px',fontSize:'30px', marginBottom:'10px'}} defaultValue="Water_Glasses"  onChange={this.changeHandel}/>
                        <TextField name="user_ex" autoFocus label="상태메세지" style={{width:'250px',fontSize:'30px', marginBottom:'75px'}} defaultValue={this.state.user_ex} onChange={this.changeHandel} />
                        <div className="profile-editor-info-buttons">
                            <EditorButton color="secondary">수정</EditorButton>
                            <EditorButton onClick={() => this.props.onCancel()}>취소</EditorButton>
                        </div>
                    </div>
                    {/* <div>
                        
                    </div> */}
                </div>
            </Dialog>
        );
    }
}

const EditorButton = styled(Button)({
    width: '250px',
    height: '50px',
    fontSize: '16px'
});

export default ProfileEditor;
